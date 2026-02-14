"""Read-only API views for Project domain."""

from rest_framework import viewsets

from .models import Project
from .serializers import ProjectListSerializer, ProjectDetailSerializer
from .services import ProjectFilterService


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = "slug"
    lookup_url_kwarg = "slug"

    def get_queryset(self):
        status_param = self.request.query_params.getlist("status")
        tech_param = self.request.query_params.get("technologies", "")
        technology_slugs = (
            [s.strip() for s in tech_param.split(",") if s.strip()]
            if tech_param
            else None
        )
        ordering = self.request.query_params.get(
            "ordering", ProjectFilterService.DEFAULT_ORDERING
        )
        return ProjectFilterService.get_queryset(
            status=status_param,
            technology_slugs=technology_slugs,
            ordering=ordering,
        )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProjectDetailSerializer
        return ProjectListSerializer
