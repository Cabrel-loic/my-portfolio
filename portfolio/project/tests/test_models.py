"""Tests for Project domain models and validation."""

from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from project.constants import ProjectStatus, TechnologyCategory
from project.models import Technology, Project, ProjectImage


class TechnologyModelTests(TestCase):
    def test_slug_auto_generated_from_name(self):
        tech = Technology(name="React", category=TechnologyCategory.FRONTEND)
        tech.save()
        self.assertEqual(tech.slug, "react")

    def test_unique_name(self):
        Technology.objects.create(name="Django", slug="django")
        with self.assertRaises(Exception):
            Technology.objects.create(name="Django", slug="django-2")


class ProjectModelTests(TestCase):
    def test_slug_auto_generated(self):
        p = Project.objects.create(
            title="My App", description="Desc", status=ProjectStatus.COMPLETED
        )
        self.assertTrue(p.slug.startswith("my-app"))

    def test_invalid_live_demo_url_rejected(self):
        p = Project(
            title="X",
            description="Y",
            status=ProjectStatus.COMPLETED,
            live_demo_url="ftp://evil.com",
        )
        with self.assertRaises(ValidationError):
            p.full_clean()

    def test_valid_https_url_accepted(self):
        p = Project(
            title="X",
            description="Y",
            status=ProjectStatus.COMPLETED,
            live_demo_url="https://example.com/demo",
        )
        p.full_clean()

    def test_architectural_overview_valid_keys(self):
        p = Project(
            title="X",
            description="Y",
            status=ProjectStatus.COMPLETED,
            architectural_overview={
                "frontend": "React",
                "backend": "Django",
                "database": "Postgres",
            },
        )
        p.full_clean()

    def test_architectural_overview_invalid_key_raises(self):
        p = Project(
            title="X",
            description="Y",
            status=ProjectStatus.COMPLETED,
            architectural_overview={"invalid_key": "value"},
        )
        with self.assertRaises(ValidationError):
            p.save()

    def test_status_choices_enforced(self):
        p = Project.objects.create(
            title="X", description="Y", status=ProjectStatus.IN_PROGRESS
        )
        p.refresh_from_db()
        self.assertEqual(p.status, ProjectStatus.IN_PROGRESS)

    def test_key_features_must_be_list_of_strings(self):
        p = Project(
            title="X",
            description="Y",
            status=ProjectStatus.COMPLETED,
            key_features=["A", "B"],
        )
        p.full_clean()
        p.key_features = [1, 2]
        with self.assertRaises(ValidationError):
            p.save()

    def test_future_enhancements_must_be_list_of_strings(self):
        p = Project(
            title="X",
            description="Y",
            status=ProjectStatus.COMPLETED,
            future_enhancements={"not": "a list"},
        )
        with self.assertRaises(ValidationError):
            p.save()

    def test_technical_challenges_solutions_structure(self):
        p = Project(
            title="X",
            description="Y",
            status=ProjectStatus.COMPLETED,
            technical_challenges_solutions=[
                {"challenge": "Perf", "solution": "Caching"},
            ],
        )
        p.full_clean()
        p.technical_challenges_solutions = [{"wrong": "keys"}]
        with self.assertRaises(ValidationError):
            p.save()


class ProjectImageModelTests(TestCase):
    def setUp(self):
        self.project = Project.objects.create(
            title="Proj", description="Desc", status=ProjectStatus.COMPLETED
        )

    def test_ordering_by_order_then_id(self):
        img1 = SimpleUploadedFile("a.png", b"a", content_type="image/png")
        img2 = SimpleUploadedFile("b.png", b"b", content_type="image/png")
        ProjectImage.objects.create(project=self.project, image=img2, order=2)
        ProjectImage.objects.create(project=self.project, image=img1, order=1)
        orders = list(ProjectImage.objects.values_list("order", flat=True))
        self.assertEqual(orders, [1, 2])
