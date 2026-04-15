from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from .models import ContactMessage, Project

User = get_user_model()


class PortfolioApiTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="creator@example.com",
            username="creator",
            password="strongpass123",
        )

    def test_contact_message_submission(self):
        payload = {
            "name": "Visitor",
            "email": "visitor@example.com",
            "subject": "Hello",
            "message": "Portfolio inquiry",
        }
        response = self.client.post("/api/portfolio/contact/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_project_create_requires_authentication(self):
        response = self.client.post(
            "/api/portfolio/projects/",
            {"title": "New", "description": "Desc"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_project_create_with_authentication(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            "/api/portfolio/projects/",
            {
                "title": "New",
                "description": "Desc",
                "technologies": "Django, DRF",
                "project_url": "https://example.com",
                "github_url": "https://github.com/example/repo",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 1)
        self.assertEqual(Project.objects.first().created_by, self.user)
