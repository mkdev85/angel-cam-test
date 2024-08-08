from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('cameras/', CameraListView.as_view(), name='camera-list'),
    path('cameras/<str:camera_id>/', CameraDetailView.as_view(), name='camera-detail'),
    path('info/', UserInfoView.as_view(), name='user-info'),
    path('shared-cameras/<str:camera_id>/recording/', AllRecordingsView.as_view(), name='all_recordings'),
    path('shared-cameras/<str:camera_id>/recording/timeline/', RecordingTimelineView.as_view(),
         name='recording_timeline'),
    path('shared-cameras/<str:camera_id>/recording/stream/', RecordingStreamView.as_view(), name='recording_stream'),
]
