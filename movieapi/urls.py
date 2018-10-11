from django.contrib import admin
from django.urls import path, re_path, include

from django.conf import settings
from django.conf.urls.static import static

from rest_framework import routers
import core.views

router = routers.DefaultRouter()
router.register(r"movies", core.views.MovieViewSet)
router.register(r"persons", core.views.PersonViewSet)
router.register(r"jobs", core.views.JobViewSet)
router.register(r"genres", core.views.GenreViewSet)
router.register(r"images", core.views.ImageViewSet)

urlpatterns = (
    [
        path("api/", include(router.urls)),
        path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
        path("rest-auth/", include("rest_auth.urls")),
        path("admin/", admin.site.urls),
    ]
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
)

urlpatterns += [re_path(r"^.*", core.views.HomeTemplateView.as_view(), name="home")]
