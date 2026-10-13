from rest_framework.routers import DefaultRouter
from .views import FormSchemaViewSet

router = DefaultRouter()
router.register(r'forms', FormSchemaViewSet, basename='form')

urlpatterns = router.urls
