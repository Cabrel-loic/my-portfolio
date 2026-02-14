"""Tests for Project API views."""

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from project.constants import ProjectStatus
from project.models import Technology, Project


class ProjectAPIListTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.list_url = reverse("project-list")

    def test_list_empty_returns_200_and_empty_results(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("results", response.data)
        self.assertEqual(len(response.data["results"]), 0)

    def test_list_returns_projects(self):
        Project.objects.create(
            title="Test",
            description="Description",
            status=ProjectStatus.COMPLETED,
        )
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        item = response.data["results"][0]
        self.assertEqual(item["title"], "Test")
        self.assertEqual(item["status"], ProjectStatus.COMPLETED)
        self.assertIn("slug", item)
        self.assertIn("short_description", item)
        self.assertNotIn("display_order", item)

    def test_list_filter_by_status(self):
        Project.objects.create(
            title="A", description="D", status=ProjectStatus.COMPLETED
        )
        Project.objects.create(
            title="B", description="D", status=ProjectStatus.PLANNED
        )
        response = self.client.get(
            self.list_url, {"status": ProjectStatus.COMPLETED}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["title"], "A")

    def test_list_filter_by_technologies(self):
        t = Technology.objects.create(name="React", slug="react")
        p = Project.objects.create(
            title="R", description="D", status=ProjectStatus.COMPLETED
        )
        p.technologies.add(t)
        Project.objects.create(
            title="Other", description="D", status=ProjectStatus.COMPLETED
        )
        response = self.client.get(self.list_url, {"technologies": "react"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["title"], "R")

    def test_list_pagination(self):
        for i in range(15):
            Project.objects.create(
                title=f"P{i}",
                description="D",
                status=ProjectStatus.COMPLETED,
            )
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 12)
        self.assertIn("next", response.data)


class ProjectAPIDetailTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_detail_returns_full_project(self):
        p = Project.objects.create(
            title="Full",
            description="Full description",
            status=ProjectStatus.COMPLETED,
            problem_statement="Problem",
            key_features=["F1", "F2"],
        )
        url = reverse("project-detail", kwargs={"slug": p.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Full")
        self.assertEqual(response.data["description"], "Full description")
        self.assertEqual(response.data["problem_statement"], "Problem")
        self.assertEqual(response.data["key_features"], ["F1", "F2"])
        self.assertIn("images", response.data)
        self.assertIn("technologies", response.data)
        self.assertNotIn("display_order", response.data)

    def test_detail_404_for_invalid_slug(self):
        url = reverse("project-detail", kwargs={"slug": "nonexistent"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_not_allowed(self):
        response = self.client.post(
            reverse("project-list"),
            {
                "title": "X",
                "description": "Y",
                "status": "completed",
            },
        )
        self.assertEqual(
            response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def test_put_not_allowed(self):
        p = Project.objects.create(
            title="P", description="D", status=ProjectStatus.COMPLETED
        )
        url = reverse("project-detail", kwargs={"slug": p.slug})
        response = self.client.put(
            url,
            {"title": "P", "description": "D", "status": "completed"},
            format="json",
        )
        self.assertEqual(
            response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED
        )
