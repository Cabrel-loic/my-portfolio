"""Project domain service layer."""

from .models import Project
from .constants import ProjectStatus


class ProjectFilterService:
    """Builds filtered, ordered Project queryset from API parameters."""

    DEFAULT_ORDERING = "display"
    ORDERING_CHOICES = {"display", "newest", "oldest"}

    @classmethod
    def get_queryset(cls, status=None, technology_slugs=None, ordering=None):
        qs = Project.objects.for_list()
        if status:
            qs = qs.by_status(status)
        if technology_slugs:
            qs = qs.by_technologies(technology_slugs)
        order = (ordering or cls.DEFAULT_ORDERING).strip().lower()
        if order not in cls.ORDERING_CHOICES:
            order = cls.DEFAULT_ORDERING
        if order == "newest":
            qs = qs.ordered_by_newest()
        elif order == "oldest":
            qs = qs.order_by("created_at")
        else:
            qs = qs.ordered_by_display()
        return qs
