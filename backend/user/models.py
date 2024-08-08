from django.utils import timezone
from django.conf import settings
import jwt
from django.db import models


class User(models.Model):
    angel_cam_id = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, null=True, blank=True)
    my_cameras_count = models.IntegerField(default=0)
    shared_cameras_count = models.IntegerField(default=0)
    total_cameras_count = models.IntegerField(default=0)
    cameras_with_guests_count = models.IntegerField(default=0)
    root_site = models.IntegerField()
    require_qualification = models.BooleanField(default=False)
    available_features = models.JSONField(default=dict)  # Use JSONField if using PostgreSQL or default dict otherwise
    angel_cam_token = models.TextField()  # Store AngelCam token securely

    def generate_token(self):
        """
        Generate a secure token for the user.
        """
        payload = {
            'user_id': self.id,
            'exp': timezone.now() + timezone.timedelta(hours=1),  # Token expiry time
            'iat': timezone.now(),
        }
        return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

    def __str__(self):
        return self.email
