from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import StudentProfileSerializer


class MyProfileView(generics.RetrieveUpdateAPIView):
    """
    Получение и обновление профиля ТЕКУЩЕГО пользователя.
    """
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.studentprofile
