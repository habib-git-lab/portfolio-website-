from rest_framework import serializers

from .models import ContactMessage, Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "technologies",
            "project_url",
            "github_url",
            "is_featured",
            "created_by",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ("created_by", "created_at", "updated_at")


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "subject", "message", "created_at", "is_read"]
        read_only_fields = ("created_at", "is_read")
