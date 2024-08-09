# ANGEL CAM TEST Application

## Setup Backend API

The first thing to do is to clone the repository:

```sh
$ git clone https://gitlab.com/grepruby/projects/internal/angel-cam-test.git
$ cd angel-cam-tes/backend
```

Create a virtual environment to install dependencies in and activate it:

```sh
$ python3 -m venv env
$ source env/bin/activate
```

Then install the dependencies:

```sh
(env)$ pip install -r requirements.txt
```

Note the `(env)` in front of the prompt. This indicates that this terminal
session operates in a virtual environment set up by `virtualenv2`.

Once `pip` has finished downloading the dependencies:

```sh
(env)$ python manage.py makemigrations
(env)$ python manage.py migrate
(env)$ python manage.py runserver
```

# Backend API Documentation

This document provides an overview of the backend API endpoints, including details about each endpoint, request methods, headers, request bodies, query parameters, and expected responses.

**Note:**  
Our application uses a SQLite database, a lightweight, file-based system suitable for many use cases.

For security reasons, we do not expose the personalAccessToken to the frontend. Instead, we use JSON Web Tokens (JWT) for authentication and authorization. The backend verifies user identity by checking the presence of the user ID in the database. If the user ID is not found, the system returns an error response. If the user ID exists, a success response is sent, ensuring secure access to resources.

## Table of Contents

- [POST LOGIN](#post-login)
- [GET USERINFO](#get-userinfo)
- [GET CAMERAS](#get-cameras)
- [GET RECORDING](#get-recording)
- [GET TIMELINE](#get-timeline)
- [GET STREAMDATA](#get-streamdata)
- [GET CAMERA DETAILS](#get-camera-details)
- [Online Resources](#online-resources)

---

## POST LOGIN

**Endpoint:**  
`POST http://localhost:8000/user/login/`

**Description:**  
Authenticate a user using an access token.

**Request Body:**

```json
{
  "token": "7e8ef344f958481e8e19094328e526da709c9266"
}
```

**Response:**

```
200 OK: Returns user details and authentication success message.
json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJg"
}
401 Unauthorized: Invalid or expired token.
json
{
    "error": "Invalid token please login again"
}
```

**Endpoint:**  
`GET http://localhost:8000/user/info/

**Description:\***
Retrieve information about the authenticated user.

**Request Headers:\***

```
Key	Value
Authorization	Bearer <access_token>
Content-Type	application/json
Response:

200 OK: User information retrieved successfully.
json
{
    "id": 1,
    "angel_cam_id": "216577",
    "email": "mkdev8585@gmail.com",
    "first_name": "Mayank",
    "last_name": "Kumar",
    "phone": null,
    "my_cameras_count": 0,
    "shared_cameras_count": 2,
    "total_cameras_count": 2,
    "cameras_with_guests_count": 0,
    "root_site": 213606,
    "require_qualification": false,
    "available_features": {
        "live_view": true,
        "connect_camera": true
    }
}
401 Unauthorized: Invalid or missing token.
json
{
    "error": "Invalid token please login again"
}
```

**GET CAMERAS**
`Endpoint:GET http://localhost:8000/user/cameras/

**Description:**
Fetch a list of cameras available to the authenticated user.

**Request Headers:**

```
Key	Value
Authorization	Bearer <access_token>
Response:

200 OK: List of cameras retrieved successfully.
json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 112860,
            "name": "Sample",
            "type": "mjpeg",
            "snapshot": {
                "url": "https://d1bkj0vwu8cp7q.cloudfront.net/snapshot/112860/20240809-130721-5a4a997f-cad1-4d4f-be46-ad8bed7fb159.jpg",
                "created_at": "2024-08-09T13:07:21Z"
            },
            "status": "online",
            "live_snapshot": "https://m4-eu8.angelcam.com/cameras/112860/snapshots/snapshot.jpg?token=eyJjYW1lcmFfaWQiOiIxMTI4NjAiLCJkZXZpY2VfaWQiOiIxMTI4NjAiLCJ0aW1lIjoxNzIzMjA5MjE0NjUyMjMxLCJ0aW1lb3V0IjoxMjB9%2E3e01d79b74d88ec877cb96346a63eac0be0b19b83164ca2c2cc24cf10a305a18",
            "streams": [
                {
                    "format": "mjpeg",
                    "url": "https://m4-eu8.angelcam.com/cameras/112860/streams/mjpeg/stream.mjpeg?token=eyJjYW1lcmFfaWQiOiIxMTI4NjAiLCJkZXZpY2VfaWQiOiIxMTI4NjAiLCJ0aW1lIjoxNzIzMjA5MjE0NjUyMzE2LCJ0aW1lb3V0IjoxMjB9%2E02ec9037bfff741a9c1c43b5eaa904b5be6aa3b2707d297187ec0033ff52253c"
                }
            ],
            "applications": [],
            "owner": {
                "email": "hiring@angelcam.com",
                "first_name": "Angelcam",
                "last_name": "Hiring"
            },
            "has_recording": false,
            "has_notifications": false,
            "audio_enabled": true,
            "low_latency_enabled": true
        },
        {
            "id": 112859,
            "name": "Street",
            "type": "h264",
            "snapshot": {
                "url": "https://d1bkj0vwu8cp7q.cloudfront.net/snapshot/112859/20240809-130721-f0c7bc61-e2c7-4f82-bdfd-5848c46f12be.jpg",
                "created_at": "2024-08-09T13:07:21Z"
            },
            "status": "online",
            "live_snapshot": "https://m3-eu8.angelcam.com/cameras/112859/snapshots/snapshot.jpg?token=eyJjYW1lcmFfaWQiOiIxMTI4NTkiLCJkZXZpY2VfaWQiOiIxMTI4NTkiLCJ0aW1lIjoxNzIzMjA5MjE0NjY3NTIwLCJ0aW1lb3V0IjoxMjB9%2E0142a448aac7936606f723caf7e87c91dd3eec5bcc9bf10cf5bc71df65da02af",
            "streams": [
                {
                    "format": "mjpeg",
                    "url": "https://m3-eu8.angelcam.com/cameras/112859/streams/mjpeg/stream.mjpeg?token=eyJjYW1lcmFfaWQiOiIxMTI4NTkiLCJkZXZpY2VfaWQiOiIxMTI4NTkiLCJ0aW1lIjoxNzIzMjA5MjE0NjY3NjI1LCJ0aW1lb3V0IjoxMjB9%2Ef721b25bf0e004c713c47c597930c08bc517c77c9b2daa7e9e0025ef4dc40b8d"
                },
            ],
            "applications": [
                {
                    "code": "CRA"
                }
            ],
            "owner": {
                "email": "hiring@angelcam.com",
                "first_name": "Angelcam",
                "last_name": "Hiring"
            },
            "has_recording": true,
            "has_notifications": false,
            "audio_enabled": true,
            "low_latency_enabled": true
        }
    ]
}
401 Unauthorized: Invalid or missing token.
json
{
    "error": "Invalid token please login again"
}
```

**GET RECORDING**
`Endpoint:GET http://localhost:8000/user/shared-cameras/112859/recording

**Description:**
Access the recordings for a specific shared camera.

Request Headers:

```
Key	Value
Authorization	Bearer <access_token>
Response:

200 OK: Recording data retrieved successfully.
json
{
    "status": "READY",
    "retention": "P3D",
    "deactivated_at": null,
    "recording_start": "2024-08-06T12:37:02Z",
    "recording_end": "2024-08-09T13:09:37Z"
}
401 Unauthorized: Invalid or missing token.
json
{
    "error": "Invalid token please login again"
}
```

**GET TIMELINE**
`Endpoint: GET http://localhost:8000/user/shared-cameras/112859/recording/timeline/?start=2024-08-05T00:00:00.000Z&end=2024-08-05T23:59:59.000Z

**Description:**
Get a timeline of recordings for a shared camera within a specified time range.

**Request Headers:**

```
Key	Value
Authorization	Bearer <access_token>
Query Parameters:

Parameter	Description	Value
start	Start time for the timeline	2024-08-05T00:00:00.000Z
end	End time for the timeline	2024-08-05T23:59:59.000Z
Response:

200 OK: Timeline data retrieved successfully.
json: {
    "start": "2024-08-06T12:37:02Z",
    "end": "2024-08-07T13:09:37Z",
    "segments": [
        {
            "start": "2024-08-06T13:37:02Z",
            "end": "2024-08-06T13:39:38Z"
        },
        {
            "start": "2024-08-06T14:07:02Z",
            "end": "2024-08-06T14:09:38Z"
        },
        {
            "start": "2024-08-06T14:37:02Z",
            "end": "2024-08-06T14:39:38Z"
        },
        {
            "start": "2024-08-06T15:07:02Z",
            "end": "2024-08-06T15:09:38Z"
        },
        {
            "start": "2024-08-06T15:37:02Z",
            "end": "2024-08-06T15:39:38Z"
        }
    ]
}
401 Unauthorized: Invalid or missing token.
json: {
    "error": "Invalid token please login again"
}
```

**GET STREAMDATA**
`Endpoint: GET http://localhost:8000/user/shared-cameras/112859/recording/stream?start=2024-08-05T00:07:37Z&end=2024-08-05T00:09:37Z

**Description:**
Stream recording data for a specific shared camera between the given timestamps.

**Request Headers:**

```
Key	Value
Authorization	Bearer <access_token>
Query Parameters:

Parameter	Description	Value
start	Start time for streaming	2024-08-05T00:07:37Z
end	End time for streaming	2024-08-05T00:09:37Z
Response:

200 OK: Streaming data retrieved successfully.
json:
{
    "format": "hls",
    "url": "https://e3-eu2.angelcam.com/recording/streams/141745b8-4f66-47ed-a4c2-7be087d04fe7/hls/playlist.m3u8",
    "stream_info": "https://api.angelcam.com/v1/recording/stream/e3-eu2.angelcam.com/141745b8-4f66-47ed-a4c2-7be087d04fe7/",
    "stream_controls": {
        "base_url": "https://e3-eu2.angelcam.com/recording/streams/141745b8-4f66-47ed-a4c2-7be087d04fe7/",
        "play": "https://e3-eu2.angelcam.com/recording/streams/141745b8-4f66-47ed-a4c2-7be087d04fe7/play/",
        "pause": "https://e3-eu2.angelcam.com/recording/streams/141745b8-4f66-47ed-a4c2-7be087d04fe7/pause/",
        "speed": "https://e3-eu2.angelcam.com/recording/streams/141745b8-4f66-47ed-a4c2-7be087d04fe7/speed/"
    }
}
401 Unauthorized: Invalid or missing token.
json
{
    "error": "Invalid token please login again"
}
```

**GET CAMERA DETAILS**
`Endpoint: GET http://localhost:8000/user/cameras/112860/

**Description:**
Retrieve details for a specific camera.

**Request Headers:**

```
Key	Value
Authorization	Bearer <access_token>
Response:

200 OK: Camera details retrieved successfully.
json:
{
    "id": 112860,
    "name": "Sample",
    "type": "mjpeg",
    "snapshot": {
        "url": "https://d1bkj0vwu8cp7q.cloudfront.net/snapshot/112860/20240809-130721-5a4a997f-cad1-4d4f-be46-ad8bed7fb159.jpg",
        "created_at": "2024-08-09T13:07:21Z"
    },
    "status": "online",
    "live_snapshot": "https://m4-eu8.angelcam.com/cameras/112860/snapshots/snapshot.jpg?token=eyJjYW1lcmFfaWQiOiIxMTI4NjAiLCJkZXZpY2VfaWQiOiIxMTI4NjAiLCJ0aW1lIjoxNzIzMjA5NTMwMDgzNTY0LCJ0aW1lb3V0IjoxMjB9%2E2b3ec9a120500e33c1df570354ee31b2823309dffeb76d2e73166e27cd158646",
    "streams": [
        {
            "format": "mjpeg",
            "url": "https://m4-eu8.angelcam.com/cameras/112860/streams/mjpeg/stream.mjpeg?token=eyJjYW1lcmFfaWQiOiIxMTI4NjAiLCJkZXZpY2VfaWQiOiIxMTI4NjAiLCJ0aW1lIjoxNzIzMjA5NTMwMDgzNjc4LCJ0aW1lb3V0IjoxMjB9%2E4e9953621d06403374a09d7a043a58dd31898146e81bb9961585db7cf7352f04"
        }
    ],
    "applications": [],
    "owner": {
        "email": "hiring@angelcam.com",
        "first_name": "Angelcam",
        "last_name": "Hiring"
    },
    "has_recording": false,
    "has_notifications": false,
    "audio_enabled": true,
    "low_latency_enabled": true
}
401 Unauthorized: Invalid or missing token.
json:
{
    "error": "Invalid token please login again"
}
```

### Explanation of Each Section:

1. **POST LOGIN**:

   - **Endpoint**: Provides the URL for the login API.
   - **Description**: Describes the purpose of the API.
   - **Request Body**: Includes a JSON example of the request payload.
   - **Response**: Details possible success and error responses with example JSON structures.

2. **GET USERINFO**:

   - **Endpoint**: URL to get user information.
   - **Request Headers**: Lists necessary headers for the request.
   - **Response**: Example responses for success and error cases.

3. **GET CAMERAS**:

   - **Endpoint**: URL for fetching the list of cameras.
   - **Request Headers**: Required headers for authorization.
   - **Response**: Shows examples of success and unauthorized access responses.

4. **GET RECORDING**:

   - **Endpoint**: URL for accessing camera recordings.
   - **Request Headers**: Required authorization headers.
   - **Response**: Example JSON response for success and error scenarios.

5. **GET TIMELINE**:

   - **Endpoint**: URL to retrieve a timeline of recordings.
   - **Request Headers**: Lists required headers.
   - **Query Parameters**: Parameters needed for the timeline query.
   - **Response**: Example response for retrieving timeline data.

6. **GET STREAMDATA**:

   - **Endpoint**: URL to stream recording data.
   - **Request Headers**: Necessary headers for authorization.
   - **Query Parameters**: Details on query parameters for streaming.
   - **Response**: Success and error responses with JSON examples.

7. **GET CAMERA DETAILS**:
   - **Endpoint**: URL to get specific camera details.
   - **Request Headers**: Required headers for the request.
   - **Response**: Shows possible responses for success and unauthorized access.

## Frontend Setup

### Steps to Set Up the Project:

1. **Install Dependencies**:

   - Run `npm i` to install all the required dependencies.

2. **Configure Environment Variables**:

   - After installing the dependencies, update the environment variables in `frontend/.env`.
   - Example: `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000`
   - **Note**: Ensure the backend server is set up as mentioned in the previous steps to provide the correct backend endpoint address.

3. **Run the Project**:
   - To run the project in the development environment, execute `npm run dev`.

### Main Libraries Used:

- **Next.js**
- **TypeScript**
- **Notistack**
- **React Query**
- **React Player**
- **Material-UI**

### Tools for Code Consistency:

- **Plop.js**: Automates the generation of components and React Query files.
- **Prettier**: Formats the code for consistent styling.
- **ESLint**: Enforces coding standards and identifies potential errors.

### Implementation Plan:

- **Login Page [`/`]**:

  - The user enters a personal access token to log in.
  - Upon successful login, the user is redirected to the Cameras page.

- **Shared Camera Page [`/shared-camera`]**:

  - Displays all shared cameras with their respective snapshots.

- **Live Video Page [`/shared-camera/:cameraId`]**:

  - Displays the live stream of the selected camera.
  - If we have recordings then we are displaying the recorded segments.
  - We have various segments as per the date range. So we have added filtering as per the date range. I'm doing the following:

  **API Integration**:

  - Calls the `/recordings` API to retrieve recording details.
  - Example response:
    ```json
    {
      "status": "RECORDING",
      "retention": "P3D",
      "deactivated_at": null,
      "recording_start": "2024-08-06T02:07:38Z",
      "recording_end": "2024-08-09T08:09:02Z"
    }
    ```
  - **Segment Handling**:
    - The overall duration between `recording_start` and `recording_end` is divided into 12-hour segments.
    - This approach minimizes API calls and optimizes rendering.
    - Date ranges are displayed in a dropdown, with segment details shown based on the selected duration.

### Frontend Improvements:

- Implement pagination on the `/shared-camera` page.
- Add pagination on the `/shared-camera/:cameraId` page to manage the display of recorded segments, reducing network bandwidth usage.
- Enhance responsive design to improve user experience across different devices.
- Implement playback speed control for video streams.
