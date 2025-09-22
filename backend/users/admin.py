from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    # Поля, которые будут отображаться в списке пользователей
    list_display = ('username', 'email', 'full_name', 'role', 'is_staff')
    # Поля, по которым можно будет фильтровать
    list_filter = ('role', 'is_staff', 'is_active', 'groups')

    # Редактируем форму создания/редактирования пользователя
    fieldsets = UserAdmin.fieldsets + (
        ('Дополнительная информация', {'fields': ('full_name', 'role', 'gender')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Дополнительная информация', {'fields': ('full_name', 'role', 'gender', 'email')}),
    )
