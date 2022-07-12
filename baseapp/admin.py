from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import Message, Person, Chat

User = get_user_model()

admin.site.register(Message)
admin.site.register(Chat)


@admin.register(Person)
class PersonModelAdmin(UserAdmin):
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                    "contacts",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    filter_horizontal = 'groups', 'user_permissions', 'contacts'

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "contacts":
            kwargs["queryset"] = User.objects.exclude(username=request.user.username)
        return super().formfield_for_manytomany(db_field, request, **kwargs)
