from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class AuthApiTests(APITestCase):
    def test_register_returns_tokens(self):
        payload = {
            "email": "user@example.com",
            "username": "user1",
            "password": "strongpass123",
            "first_name": "First",
            "last_name": "Last",
        }
        response = self.client.post("/api/accounts/register/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertEqual(User.objects.count(), 1)

    def test_login_with_email_returns_jwt(self):
        User.objects.create_user(email="test@example.com", username="testuser", password="strongpass123")

        response = self.client.post(
            "/api/accounts/login/",
            {"email": "test@example.com", "password": "strongpass123"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
