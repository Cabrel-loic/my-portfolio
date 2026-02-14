"""Tests for Project filtering and queryset behavior."""

from django.test import TestCase

from project.constants import ProjectStatus
from project.models import Technology, Project
from project.services import ProjectFilterService


class ProjectFilterServiceTests(TestCase):
    def setUp(self):
        self.t1 = Technology.objects.create(name="React", slug="react")
        self.t2 = Technology.objects.create(name="Django", slug="django")
        self.p_completed = Project.objects.create(
            title="Done",
            description="Done project",
            status=ProjectStatus.COMPLETED,
            display_order=0,
        )
        self.p_completed.technologies.add(self.t1)
        self.p_planned = Project.objects.create(
            title="Planned",
            description="Planned project",
            status=ProjectStatus.PLANNED,
            display_order=1,
        )
        self.p_planned.technologies.add(self.t2)
        self.p_in_progress = Project.objects.create(
            title="WIP",
            description="Work in progress",
            status=ProjectStatus.IN_PROGRESS,
            display_order=2,
        )
        self.p_in_progress.technologies.add(self.t1, self.t2)

    def test_no_filter_returns_all(self):
        qs = ProjectFilterService.get_queryset()
        self.assertEqual(qs.count(), 3)

    def test_filter_by_single_status(self):
        qs = ProjectFilterService.get_queryset(status=[ProjectStatus.COMPLETED])
        self.assertEqual(qs.count(), 1)
        self.assertEqual(qs.get().title, "Done")

    def test_filter_by_multiple_status(self):
        qs = ProjectFilterService.get_queryset(
            status=[ProjectStatus.COMPLETED, ProjectStatus.PLANNED]
        )
        self.assertEqual(qs.count(), 2)

    def test_filter_by_invalid_status_returns_none(self):
        qs = ProjectFilterService.get_queryset(status=["invalid-status"])
        self.assertEqual(qs.count(), 0)

    def test_filter_by_technology_slug(self):
        qs = ProjectFilterService.get_queryset(technology_slugs=["react"])
        self.assertEqual(qs.count(), 2)
        titles = set(qs.values_list("title", flat=True))
        self.assertEqual(titles, {"Done", "WIP"})

    def test_filter_by_multiple_technologies(self):
        qs = ProjectFilterService.get_queryset(technology_slugs=["react", "django"])
        self.assertEqual(qs.count(), 3)

    def test_ordering_newest_first(self):
        qs = ProjectFilterService.get_queryset(ordering="newest")
        self.assertEqual(qs.first().title, "WIP")

    def test_ordering_oldest_first(self):
        qs = ProjectFilterService.get_queryset(ordering="oldest")
        self.assertEqual(qs.first().title, "Done")

    def test_ordering_display_default(self):
        qs = ProjectFilterService.get_queryset(ordering="display")
        ids = list(qs.values_list("id", flat=True))
        self.assertEqual(
            ids,
            [self.p_completed.id, self.p_planned.id, self.p_in_progress.id],
        )

    def test_invalid_ordering_falls_back_to_display(self):
        qs = ProjectFilterService.get_queryset(ordering="invalid_or_malicious")
        ids = list(qs.values_list("id", flat=True))
        self.assertEqual(
            ids,
            [self.p_completed.id, self.p_planned.id, self.p_in_progress.id],
        )
