"""Validators for Project domain."""

import re
from django.core.exceptions import ValidationError
from urllib.parse import urlparse


def validate_optional_https_url(value):
    if not value:
        return
    parsed = urlparse(value)
    if parsed.scheme and parsed.scheme not in ("http", "https"):
        raise ValidationError("URL must use HTTP or HTTPS.")
    if parsed.netloc and not re.match(
        r"^[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}$",
        parsed.netloc.replace("www.", ""),
    ):
        if parsed.netloc != "localhost" and not re.match(r"^[\w.-]+$", parsed.netloc):
            raise ValidationError("URL has an invalid host.")


def validate_string_list(value, field_name="field"):
    if not value:
        return
    if not isinstance(value, list):
        raise ValidationError(f"{field_name} must be a list.")
    for i, item in enumerate(value):
        if not isinstance(item, str):
            raise ValidationError(f"{field_name}[{i}] must be a string.")


def validate_challenges_solutions(value):
    if not value:
        return
    if not isinstance(value, list):
        raise ValidationError(
            "technical_challenges_solutions must be a list. "
            'Example: [{"challenge": "Describe the problem", "solution": "Describe the solution"}]'
        )
    for i, item in enumerate(value):
        if not isinstance(item, dict):
            raise ValidationError(
                f"Item {i} must be an object with 'challenge' and 'solution' keys. "
                'Example: {"challenge": "text", "solution": "text"}'
            )
        if "challenge" not in item or "solution" not in item:
            raise ValidationError(
                f"Item {i} must have 'challenge' and 'solution' keys. "
                'Example: {"challenge": "text", "solution": "text"}'
            )
        if not isinstance(item["challenge"], str) or not isinstance(item["solution"], str):
            raise ValidationError(
                f"Item {i}: 'challenge' and 'solution' must be strings."
            )


def validate_architecture_structure(value):
    if not value or not isinstance(value, dict):
        return
    allowed = {"frontend", "backend", "database", "deployment", "stages", "overview"}
    extra = set(value.keys()) - allowed
    if extra:
        raise ValidationError(f"Invalid keys in architectural_overview: {sorted(extra)}. Allowed: {sorted(allowed)}.")
    for k, v in value.items():
        if isinstance(v, str):
            continue
        if k == "stages" and isinstance(v, list):
            for item in v:
                if not isinstance(item, dict) or "name" not in item or "description" not in item:
                    raise ValidationError("Each stage must have 'name' and 'description'.")
        elif not isinstance(v, str):
            raise ValidationError("architectural_overview values must be strings, or 'stages' a list of {name, description}.")
