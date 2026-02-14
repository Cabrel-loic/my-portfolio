"""Custom QuerySets and managers for Project domain."""

from django.db import models

from .constants import ProjectStatus


class ProjectQuerySet(models.QuerySet):
    def with_list_prefetch(self):
        return self.prefetch_related("technologies", "images")

    def with_detail_prefetch(self):
        return self.prefetch_related("technologies", "images")

    def by_status(self, values):
        if not values:
            return self
        allowed = {v for v in values if v in ProjectStatus.VALUES}
        if not allowed:
            return self.none()
        return self.filter(status__in=allowed)

    def by_technologies(self, slugs):
        if not slugs:
            return self
        return self.filter(technologies__slug__in=slugs).distinct()

    def ordered_by_newest(self):
        return self.order_by("-created_at")

    def ordered_by_display(self):
        return self.order_by("display_order", "-created_at")


class ProjectManager(models.Manager):
    def get_queryset(self):
        return ProjectQuerySet(self.model, using=self._db)

    def for_list(self):
        return self.get_queryset().with_list_prefetch().ordered_by_display()

    def for_detail(self):
        return self.get_queryset().with_detail_prefetch()
