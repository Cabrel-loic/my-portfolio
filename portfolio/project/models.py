"""Project domain models."""

from django.db import models
from django.utils.text import slugify

from .constants import ProjectStatus, TechnologyCategory
from .querysets import ProjectManager
from .validators import (
    validate_optional_https_url,
    validate_architecture_structure,
    validate_string_list,
    validate_challenges_solutions,
)


class Technology(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True)
    category = models.CharField(
        max_length=20,
        choices=TechnologyCategory.CHOICES,
        blank=True,
        default=TechnologyCategory.OTHER,
    )

    class Meta:
        ordering = ["category", "name"]
        verbose_name_plural = "Technologies"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Project(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=280, unique=True, blank=True)
    description = models.TextField()
    problem_statement = models.TextField(blank=True)
    key_features = models.JSONField(default=list, blank=True)
    my_role = models.TextField(blank=True)
    technical_challenges_solutions = models.JSONField(default=list, blank=True)
    architectural_overview = models.JSONField(default=dict, blank=True)
    future_enhancements = models.JSONField(default=list, blank=True)
    live_demo_url = models.URLField(max_length=2048, blank=True, validators=[validate_optional_https_url])
    source_code_url = models.URLField(max_length=2048, blank=True, validators=[validate_optional_https_url])
    status = models.CharField(
        max_length=20,
        choices=ProjectStatus.CHOICES,
        db_index=True,
    )
    technologies = models.ManyToManyField(Technology, related_name="projects", blank=True)
    display_order = models.PositiveIntegerField(default=0, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ProjectManager()

    class Meta:
        ordering = ["display_order", "-created_at"]
        indexes = [
            models.Index(fields=["-created_at"]),
            models.Index(fields=["status", "-created_at"]),
        ]

    def __str__(self):
        return self.title

    def _normalize_technical_challenges_solutions(self):
        if not self.technical_challenges_solutions or not isinstance(
            self.technical_challenges_solutions, list
        ):
            return
        normalized = []
        for i, item in enumerate(self.technical_challenges_solutions):
            if item is None:
                continue
            if isinstance(item, dict):
                challenge = item.get("challenge") or item.get("Challenge")
                solution = item.get("solution") or item.get("Solution")
                if challenge is not None and solution is not None:
                    normalized.append(
                        {"challenge": str(challenge), "solution": str(solution)}
                    )
                continue
            if isinstance(item, (list, tuple)) and len(item) == 2:
                normalized.append(
                    {"challenge": str(item[0]), "solution": str(item[1])}
                )
                continue
        self.technical_challenges_solutions = normalized

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)
            slug = base
            n = 0
            while Project.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                n += 1
                slug = f"{base}-{n}"
            self.slug = slug
        self._normalize_technical_challenges_solutions()
        validate_string_list(self.key_features, "key_features")
        validate_string_list(self.future_enhancements, "future_enhancements")
        validate_challenges_solutions(self.technical_challenges_solutions)
        if self.architectural_overview:
            validate_architecture_structure(self.architectural_overview)
        self.full_clean()
        super().save(*args, **kwargs)


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="projects/%Y/%m/")
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.caption or f"Image for {self.project.title}"
