from rest_framework.routers import DefaultRouter

from .views import ContactMessageViewSet, ProjectViewSet

router = DefaultRouter()
router.register("projects", ProjectViewSet, basename="project")
router.register("contact", ContactMessageViewSet, basename="contact")

urlpatterns = router.urls
