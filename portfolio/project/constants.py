"""Domain constants for the Project app."""

class ProjectStatus:
    COMPLETED = "completed"
    IN_PROGRESS = "in_progress"
    PLANNED = "planned"

    CHOICES = [
        (COMPLETED, "Completed"),
        (IN_PROGRESS, "In Progress"),
        (PLANNED, "Planned"),
    ]

    VALUES = {c[0] for c in CHOICES}


class TechnologyCategory:
    FRONTEND = "frontend"
    BACKEND = "backend"
    DATABASE = "database"
    TOOL = "tool"
    OTHER = "other"

    CHOICES = [
        (FRONTEND, "Frontend"),
        (BACKEND, "Backend"),
        (DATABASE, "Database"),
        (TOOL, "Tool"),
        (OTHER, "Other"),
    ]
