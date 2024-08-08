import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from .utils import get_user_from_token, call_angelcam_api


class UserInfoView(APIView):
    """
    View to get user information.
    """

    def get(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({'error': 'Authorization header missing'}, status=status.HTTP_400_BAD_REQUEST)

        token = auth_header.split(' ')[1]
        user = get_user_from_token(token)
        if not user:
            return Response({'error': 'Invalid or expired token'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LoginView(APIView):
    """
    View to handle user login and token verification.
    """

    def post(self, request):
        token = request.data.get('token')

        if not token:
            return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            angelcam_user = call_angelcam_api('me', token)
        except requests.exceptions.RequestException as e:
            return Response({'error': 'Failed to verify token: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)

        user, created = User.objects.get_or_create(
            angel_cam_id=angelcam_user['id'],
            defaults={
                'email': angelcam_user['email'],
                'first_name': angelcam_user['first_name'],
                'last_name': angelcam_user['last_name'],
                'phone': angelcam_user.get('phone'),
                'my_cameras_count': angelcam_user.get('my_cameras_count', 0),
                'shared_cameras_count': angelcam_user.get('shared_cameras_count', 0),
                'total_cameras_count': angelcam_user.get('total_cameras_count', 0),
                'cameras_with_guests_count': angelcam_user.get('cameras_with_guests_count', 0),
                'root_site': angelcam_user.get('root_site'),
                'require_qualification': angelcam_user.get('require_qualification', False),
                'available_features': angelcam_user.get('available_features', {}),
                'angel_cam_token': token
            }
        )
        # Regenerate token
        user.token = user.generate_token()
        user.save()

        return Response({'accessToken': user.token}, status=status.HTTP_200_OK)


class CameraListView(APIView):
    def get(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({'error': 'Authorization header missing'}, status=status.HTTP_400_BAD_REQUEST)
        token = auth_header.split(' ')[1]
        user = get_user_from_token(token)
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            cameras = call_angelcam_api('shared-cameras', user.angel_cam_token)
        except requests.exceptions.RequestException as e:
            return Response({'error': 'Failed to retrieve cameras: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(cameras, status=status.HTTP_200_OK)


class CameraDetailView(APIView):

    def get(self, request, camera_id):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({'error': 'Authorization header missing'}, status=status.HTTP_400_BAD_REQUEST)
        token = auth_header.split(' ')[1]
        user = get_user_from_token(token)
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            camera_details = call_angelcam_api(f'shared-cameras/{camera_id}', user.angel_cam_token)
        except requests.exceptions.RequestException as e:
            return Response({'error': 'Failed to retrieve camera details: ' + str(e)},
                            status=status.HTTP_400_BAD_REQUEST)

        return Response(camera_details, status=status.HTTP_200_OK)


class RecordingTimelineView(APIView):
    def get(self, request, camera_id):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({'error': 'Authorization header missing'}, status=status.HTTP_400_BAD_REQUEST)

        token = auth_header.split(' ')[1]
        user = get_user_from_token(token)
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        start = request.query_params.get('start')
        end = request.query_params.get('end')
        if not start or not end:
            return Response({'error': 'Missing required parameters'}, status=status.HTTP_400_BAD_REQUEST)

        endpoint = f'shared-cameras/{camera_id}/recording/timeline/'
        params = {
            'start': start,
            'end': end
        }

        try:
            recordings = call_angelcam_api(endpoint, user.angel_cam_token, method='GET', params=params)
            return Response(recordings, status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response({'error': f'Failed to retrieve recording timeline: {str(e)}'},
                            status=status.HTTP_400_BAD_REQUEST)


class AllRecordingsView(APIView):
    def get(self, request, camera_id):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({'error': 'Authorization header missing'}, status=status.HTTP_400_BAD_REQUEST)

        token = auth_header.split(' ')[1]
        user = get_user_from_token(token)
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        endpoint = f"shared-cameras/{camera_id}/recording"
        try:
            response = call_angelcam_api(endpoint, user.angel_cam_token, method='GET')
            return Response(response, status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response({'error': f'Failed to retrieve recording timeline: {str(e)}'},
                            status=status.HTTP_400_BAD_REQUEST)


class RecordingStreamView(APIView):
    def get(self, request, camera_id):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({'error': 'Authorization header missing'}, status=status.HTTP_400_BAD_REQUEST)

        token = auth_header.split(' ')[1]
        user = get_user_from_token(token)
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        start = request.query_params.get('start')
        end = request.query_params.get('end')
        if not start or not end:
            return Response({'error': 'Missing required parameters'}, status=status.HTTP_400_BAD_REQUEST)

        endpoint = f"shared-cameras/{camera_id}/recording/stream"
        params = {'start': start, 'end': end}

        try:
            response = call_angelcam_api(endpoint, user.angel_cam_token, method='GET', params=params)
            return Response(response, status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response({'error': f'Failed to retrieve recording stream: {str(e)}'},
                            status=status.HTTP_400_BAD_REQUEST)
