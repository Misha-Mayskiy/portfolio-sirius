from django.urls import path
from .views import MyProfileView

urlpatterns = [
    # /api/v1/profile/me/
    path('me/', MyProfileView.as_view(), name='my_profile'),
]
