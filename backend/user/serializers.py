from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # List all fields explicitly except 'angel_cam_token'
        fields = [
            'id', 'angel_cam_id', 'email', 'first_name', 'last_name', 'phone',
            'my_cameras_count', 'shared_cameras_count', 'total_cameras_count',
            'cameras_with_guests_count', 'root_site', 'require_qualification',
            'available_features'
        ]
