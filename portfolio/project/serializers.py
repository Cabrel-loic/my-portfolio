"""Serializers for Project API."""

from rest_framework import serializers

from .models import Project, ProjectImage, Technology
from .constants import ProjectStatus


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ["slug", "name", "category"]


class ProjectImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProjectImage
        fields = ["id", "url", "caption", "order"]

    def get_url(self, obj):
        request = self.context.get("request")
        if request and obj.image:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url if obj.image else None


class ProjectListSerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer(many=True, read_only=True)
    thumbnail = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "slug",
            "title",
            "short_description",
            "status",
            "technologies",
            "thumbnail",
            "live_demo_url",
            "source_code_url",
            "created_at",
        ]

    def get_thumbnail(self, obj):
        first = obj.images.first()
        if not first or not first.image:
            return None
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(first.image.url)
        return first.image.url

    def get_short_description(self, obj):
        max_len = 200
        if len(obj.description) <= max_len:
            return obj.description
        return obj.description[: max_len - 3].rsplit(" ", 1)[0] + "..."


class ProjectDetailSerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer(many=True, read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "slug",
            "title",
            "description",
            "problem_statement",
            "key_features",
            "my_role",
            "technical_challenges_solutions",
            "architectural_overview",
            "future_enhancements",
            "live_demo_url",
            "source_code_url",
            "status",
            "technologies",
            "images",
            "created_at",
            "updated_at",
        ]
        read_only_fields = fields
