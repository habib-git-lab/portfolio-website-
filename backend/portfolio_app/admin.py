from django.contrib import admin

from .models import ContactMessage, Project, UserProfile


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "is_featured", "created_by", "created_at")
    search_fields = ("title", "description", "technologies")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at", "is_read")
    search_fields = ("name", "email", "subject")
    list_filter = ("is_read",)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "website", "location")
    search_fields = ("user__email", "user__username", "location")
