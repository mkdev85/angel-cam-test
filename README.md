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
    "message": "Login successful",
    "user": {
        "id": 1,
        "username": "john_doe",
        "email": "john_doe@example.com"
    }
}
401 Unauthorized: Invalid or expired token.
json
Copy code
{
    "error": "Invalid token"
}
```
**Endpoint:**  
`GET http://localhost:8000/user/info/

**Description:***
Retrieve information about the authenticated user.

**Request Headers:***
```
Key	Value
Authorization	Bearer <access_token>
Content-Type	application/json
Response:

200 OK: User information retrieved successfully.
json
Copy code
{
    "id": 1,
    "username": "john_doe",
    "email": "john_doe@example.com",
    "full_name": "John Doe",
    "joined_date": "2024-01-15"
}
401 Unauthorized: Invalid or missing token.
json
Copy code
{
    "error": "Unauthorized access"
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
Copy code
{
    "cameras": [
        {
            "id": 112859,
            "name": "Front Door",
            "status": "online"
        },
        {
            "id": 112860,
            "name": "Backyard",
            "status": "offline"
        }
    ]
}
401 Unauthorized: Invalid or missing token.
json
Copy code
{
    "error": "Unauthorized access"
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
Copy code
{
    "recordings": [
        {
            "id": 1,
            "camera_id": 112859,
            "start_time": "2024-08-05T10:00:00Z",
            "end_time": "2024-08-05T11:00:00Z",
            "url": "http://example.com/recording1.mp4"
        },
        {
            "id": 2,
            "camera_id": 112859,
            "start_time": "2024-08-05T12:00:00Z",
            "end_time": "2024-08-05T13:00:00Z",
            "url": "http://example.com/recording2.mp4"
        }
    ]
}
401 Unauthorized: Invalid or missing token.
json
{
    "error": "Unauthorized access"
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
    "timeline": [
        {
            "start": "2024-08-05T01:00:00Z",
            "end": "2024-08-05T01:30:00Z",
            "type": "motion"
        },
        {
            "start": "2024-08-05T02:00:00Z",
            "end": "2024-08-05T02:45:00Z",
            "type": "continuous"
        }
    ]
}
401 Unauthorized: Invalid or missing token.
json: {
    "error": "Unauthorized access"
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
    "stream_url": "http://example.com/stream.m3u8"
}
401 Unauthorized: Invalid or missing token.
json
{
    "error": "Unauthorized access"
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
    "camera": {
        "id": 112860,
        "name": "Backyard",
        "status": "offline",
        "resolution": "1080p",
        "location": "Backyard - North Corner",
        "last_online": "2024-08-01T12:30:00Z"
    }
}
401 Unauthorized: Invalid or missing token.
json:
{
    "error": "Unauthorized access"
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
