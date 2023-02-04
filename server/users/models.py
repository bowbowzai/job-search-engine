import uuid

from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _


class MyUserManager(BaseUserManager):
    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError(_("Invalid email."))

    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not first_name:
            raise ValueError(_("First name must be provided."))
        if not last_name:
            raise ValueError(_("Last name must be provided."))
        if not password:
            raise ValueError(_("Password name must be provided."))
        if not email:
            raise ValueError(_("Password name must be provided."))

        email = self.normalize_email(email)
        email = email.lower()

        self.email_validator(email)

        user = self.model(
            first_name=first_name, last_name=last_name, email=email, **extra_fields
        )

        user.set_password(password)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_active", False)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, first_name, last_name, email, username, password=None, **extra_fields
    ):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff as True"))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser as True"))
        if extra_fields.get("is_active") is not True:
            raise ValueError(_("Superuser must have is_active as True"))

        user = self.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            **extra_fields
        )
        user.save(using=self._db)
        return user


class MyUser(AbstractUser):
    pkid = models.BigAutoField(primary_key=True, unique=True, editable=False)
    id = models.UUIDField(uuid.uuid4, unique=True, editable=False)
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
        error_messages={
            "unique": "The email address is already exists.",
        },
    )
    first_name = models.CharField(max_length=150)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = MyUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email
