from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import hello_api, ContactViewSet

router = DefaultRouter()
router.register(r'contacts', ContactViewSet, basename='contact')

urlpatterns = [
    path("api/hello/", hello_api),
    path("api/", include(router.urls)),
]