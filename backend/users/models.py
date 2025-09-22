from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class CustomUser(AbstractUser):
    """
    Кастомная модель пользователя.
    Логин происходит по username. Email должен быть уникальным.
    """

    class Role(models.TextChoices):
        STUDENT = 'STUDENT', _('Студент')
        TUTOR = 'TUTOR', _('Тьютор')
        STAFF = 'STAFF', _('Сотрудник')  # Используем STAFF вместо COMPANY, т.к. "company" может быть зарезервировано
        COMPANY = 'COMPANY', _('Представитель компании')

    class Gender(models.TextChoices):
        MALE = 'MALE', _('Мужской')
        FEMALE = 'FEMALE', _('Женский')

    # Убираем стандартные first_name и last_name, используем одно поле
    first_name = None
    last_name = None

    email = models.EmailField(_('email address'), unique=True)
    full_name = models.CharField(_('ФИО'), max_length=255)
    role = models.CharField(_('Роль'), max_length=50, choices=Role.choices, default=Role.STUDENT)
    gender = models.CharField(_('Пол'), max_length=10, choices=Gender.choices)

    # USERNAME_FIELD остается 'username', т.к. Django требует его.
    # Логику входа по email мы реализуем отдельно.
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'full_name']

    def __str__(self):
        return self.username
