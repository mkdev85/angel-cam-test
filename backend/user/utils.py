import requests
from decouple import config
import jwt
from user.models import User
from django.conf import settings


def get_user_from_token(token):
    try:
        decoded_payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = decoded_payload.get('user_id')
        user = User.objects.get(id=user_id)
        return user
    except (jwt.ExpiredSignatureError, jwt.DecodeError, User.DoesNotExist):
        return None


def call_angelcam_api(endpoint, token, method='GET', data=None, params=None):
    api_base_url = config('ANGELCAM_API_BASE_URL', default='https://api.angelcam.com/v1')
    headers = {'Authorization': f'PersonalAccessToken {token}'}

    response = requests.request(method, f'{api_base_url}/{endpoint}', headers=headers, json=data, params=params)

    if response.status_code != 200:
        response.raise_for_status()

    return response.json()
