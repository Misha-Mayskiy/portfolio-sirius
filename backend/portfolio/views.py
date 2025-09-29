from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Document
from .serializers import StudentProfileSerializer, DocumentSerializer


class MyProfileView(generics.RetrieveUpdateAPIView):
    """
    Получение и обновление профиля ТЕКУЩЕГО пользователя.
    """
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.studentprofile


class DocumentUploadView(generics.CreateAPIView):
    """
    Эндпоинт для загрузки файлов.
    Принимает POST-запросы с multipart/form-data.
    """
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]
