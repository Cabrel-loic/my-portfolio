"""Admin configuration for Project domain."""

from django.contrib import admin
from django.utils.html import format_html

from .models import Technology, Project, ProjectImage


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "category"]
    search_fields = ["name"]
    prepopulated_fields = {"slug": ["name"]}
    list_filter = ["category"]
    list_per_page = 25


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 0
    ordering = ["order"]
    fields = ["image", "caption", "order"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "status", "display_order", "created_at", "thumbnail_preview"]
    list_filter = ["status", "technologies"]
    search_fields = ["title", "description", "problem_statement"]
    prepopulated_fields = {"slug": ["title"]}
    filter_horizontal = ["technologies"]
    ordering = ["display_order", "-created_at"]
    inlines = [ProjectImageInline]
    readonly_fields = ["created_at", "updated_at"]
    list_per_page = 20
    date_hierarchy = "created_at"

    fieldsets = (
        (None, {"fields": ("title", "slug", "description", "status", "display_order")}),
        ("Context", {"fields": ("problem_statement", "my_role", "key_features")}),
        ("Technical", {"fields": ("technical_challenges_solutions", "architectural_overview", "future_enhancements")}),
        ("Links", {"fields": ("live_demo_url", "source_code_url")}),
        ("Taxonomy", {"fields": ("technologies",)}),
        ("Meta", {"fields": ("created_at", "updated_at")}),
    )

    def thumbnail_preview(self, obj):
        first = obj.images.first()
        if not first or not first.image:
            return "—"
        return format_html('<img src="{}" width="60" height="40" style="object-fit: cover;" />', first.image.url)

    thumbnail_preview.short_description = "Thumbnail"
