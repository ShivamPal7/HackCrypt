# Institution Attendance API Documentation

## Global Rules

*   **Base URL**: `/api`
*   **Authentication**: All protected routes require `Authorization: Bearer <ACCESS_TOKEN>` header.
*   **Content-Type**: `application/json` required for all POST/PUT/PATCH requests.
*   **Institution Scope**: `institutionId` is strictly derived from the authenticated user token. It is never accepted as a request parameter.
*   **Role Enforcement**: Access is strictly controlled by `ADMIN`, `TEACHER`, `STUDENT` roles.

---

## 1. Authentication

### 🔹 Register User
**Method**: `POST`
**URL**: `/auth/register`
**Allowed Roles**: PUBLIC
**Request Body**:
```json
{
  "email": "string (email)",
  "password": "string (min 6 chars)",
  "name": "string",
  "role": "TEACHER | STUDENT",
  "age": "number (optional)"
}
```
**Response (201 Created)**:
```json
{
  "user": { "id": "uuid", "email": "...", "role": "..." },
  "tokens": { "access": "...", "refresh": "..." }
}
```

### 🔹 Login
**Method**: `POST`
**URL**: `/auth/login`
**Allowed Roles**: PUBLIC
**Request Body**:
```json
{
  "email": "string (email)",
  "password": "string"
}
```
**Response (200 OK)**:
```json
{
  "user": { "id": "uuid", "role": "..." },
  "tokens": { "access": "...", "refresh": "..." }
}
```

### 🔹 Refresh Token
**Method**: `POST`
**URL**: `/auth/refresh`
**Allowed Roles**: PUBLIC
**Request Body**:
```json
{
  "refreshToken": "string"
}
```
**Response (200 OK)**:
```json
{
  "access": "..."
}
```

### 🔹 Get Current User
**Method**: `GET`
**URL**: `/auth/me`
**Allowed Roles**: ALL
**Headers**: `Authorization: Bearer {{ACCESS_TOKEN}}`
**Response (200 OK)**:
```json
{
  "id": "uuid",
  "email": "...",
  "role": "...",
  "institutionId": "uuid"
}
```

---

## 2. Institution

### 🔹 Create Institution (Admin Register)
**Method**: `POST`
**URL**: `/institutions`
**Allowed Roles**: PUBLIC
**Request Body**:
```json
{
  "institution": {
    "name": "string",
    "description": "string (optional)",
    "logoUrl": "string (url, optional)",
    "email": "string (email, optional)",
    "website": "string (url, optional)",
    "phone": "string (optional)"
  },
  "user": {
    "email": "string (email)",
    "password": "string",
    "name": "string",
    "age": "number (optional)"
  }
}
```
**Response (201 Created)**:
```json
{
  "institution": { "id": "uuid", "joinCode": "..." },
  "admin": { "id": "uuid", "role": "ADMIN" }
}
```

### 🔹 Join Institution Request
**Method**: `POST`
**URL**: `/institutions/join-request`
**Allowed Roles**: ALL (Authenticated)
**Request Body**:
```json
{
  "joinCode": "string"
}
```
**Response (201 Created)**:
```json
{
  "status": "PENDING"
}
```

### 🔹 View Join Requests
**Method**: `GET`
**URL**: `/institutions/join-requests`
**Allowed Roles**: ADMIN
**Response (200 OK)**:
```json
[
  { "id": "uuid", "user": { "name": "..." }, "status": "PENDING" }
]
```

### 🔹 Approve Join Request
**Method**: `POST`
**URL**: `/institutions/join-requests/:id/approve`
**Allowed Roles**: ADMIN
**Path Params**: [id](file:///c:/Hackcrypt/HackCrypt/backend/api/src/middlewares/validate.middleware.ts#5-21) (Request UUID)
**Response (200 OK)**:
```json
{ "message": "Request approved" }
```

### 🔹 Reject Join Request
**Method**: `POST`
**URL**: `/institutions/join-requests/:id/reject`
**Allowed Roles**: ADMIN
**Path Params**: [id](file:///c:/Hackcrypt/HackCrypt/backend/api/src/middlewares/validate.middleware.ts#5-21) (Request UUID)
**Response (200 OK)**:
```json
{ "message": "Request rejected" }
```

### 🔹 Get Institution Profile
**Method**: `GET`
**URL**: `/institutions/me`
**Allowed Roles**: ADMIN, TEACHER, STUDENT
**Response (200 OK)**:
```json
{
  "id": "uuid",
  "name": "...",
  "joinCode": "..."
}
```

### 🔹 Update Institution
**Method**: `PUT`
**URL**: `/institutions/me`
**Allowed Roles**: ADMIN
**Request Body**:
```json
{
  "name": "string (optional)"
}
```
**Response (200 OK)**:
```json
{ "id": "uuid", "name": "..." }
```

### 🔹 Delete Institution
**Method**: `DELETE`
**URL**: `/institutions/me`
**Allowed Roles**: ADMIN
**Response (200 OK)**:
```json
{ "message": "Institution deleted" }
```

---

## 3. Users

### 🔹 Get Self
**Method**: `GET`
**URL**: `/users/me`
**Allowed Roles**: ALL
**Response (200 OK)**:
```json
{
  "id": "uuid",
  "name": "...",
  "profile": { ... }
}
```

### 🔹 Update Self Profile
**Method**: `PUT`
**URL**: `/users/me/profile`
**Allowed Roles**: ALL
**Request Body**:
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "avatarUrl": "string (url, optional)",
  "phoneNumber": "string (optional)",
  "bio": "string (optional)"
}
```
**Response (200 OK)**:
```json
{ "id": "uuid", "avatarUrl": "..." }
```

### 🔹 List Users
**Method**: `GET`
**URL**: `/users`
**Allowed Roles**: ADMIN
**Response (200 OK)**:
```json
[
  { "id": "uuid", "name": "...", "role": "...", "isActive": true }
]
```

### 🔹 Create User (Admin)
**Method**: `POST`
**URL**: `/users`
**Allowed Roles**: ADMIN
**Request Body**: Same as `/auth/register` body.
**Response (201 Created)**: User object.

### 🔹 Update User Status
**Method**: `PATCH`
**URL**: `/users/:id/status`
**Allowed Roles**: ADMIN
**Path Params**: `id` (User UUID)
**Request Body**:
```json
{
  "isActive": "boolean"
}
```
**Response (200 OK)**:
```json
{ "id": "uuid", "isActive": true }
```

### 🔹 Get User Details
**Method**: `GET`
**URL**: `/users/:id`
**Allowed Roles**: ADMIN
**Response (200 OK)**: User object.

### 🔹 Delete User
**Method**: `DELETE`
**URL**: `/users/:id`
**Allowed Roles**: ADMIN
**Response (200 OK)**:
```json
{ "message": "User deleted" }
```

---

## 4. Departments

### 🔹 Create Department
**Method**: `POST`
**URL**: `/departments`
**Allowed Roles**: ADMIN
**Request Body**:
```json
{
  "name": "string",
  "description": "string (optional)",
  "colorCode": "string (hex, optional)",
  "iconKey": "string (optional)"
}
```
**Response (201 Created)**: Department object.

### 🔹 Get Department
**Method**: `GET`
**URL**: `/departments/:id`
**Allowed Roles**: ADMIN, TEACHER
**Response (200 OK)**: Department object.

### 🔹 Update Department
**Method**: `PUT`
**URL**: `/departments/:id`
**Allowed Roles**: ADMIN
**Request Body**: Same options as Create.
**Response (200 OK)**: Updated attributes.

### 🔹 Delete Department
**Method**: `DELETE`
**URL**: `/departments/:id`
**Allowed Roles**: ADMIN
**Response (200 OK)**: Success message.

---

## 5. Classes

### 🔹 Create Class
**Method**: `POST`
**URL**: `/classes`
**Allowed Roles**: ADMIN
**Request Body**:
```json
{
  "name": "string",
  "departmentId": "string (uuid)",
  "teacherId": "string (uuid)",
  "academicYear": "string (optional)",
  "section": "string (optional)",
  "iconKey": "string (optional)"
}
```
**Response (201 Created)**: Class object.

### 🔹 Get Class
**Method**: `GET`
**URL**: `/classes/:id`
**Allowed Roles**: ADMIN, TEACHER, STUDENT
**Response (200 OK)**: Class details.

### 🔹 Update Class
**Method**: `PUT`
**URL**: `/classes/:id`
**Allowed Roles**: ADMIN
**Request Body**: Optional fields from Create.
**Response (200 OK)**: Updated Class.

### 🔹 Delete Class
**Method**: `DELETE`
**URL**: `/classes/:id`
**Allowed Roles**: ADMIN
**Response (200 OK)**: Success message.

---

## 6. Subjects

### 🔹 Create Subject
**Method**: `POST`
**URL**: `/subjects`
**Allowed Roles**: ADMIN
**Request Body**:
```json
{
  "name": "string",
  "classId": "string (uuid)",
  "code": "string (optional)",
  "description": "string (optional)",
  "colorCode": "string (hex, optional)"
}
```
**Response (201 Created)**: Subject object.

### 🔹 List/Get Subject
**Method**: `GET`
**URL**: `/subjects/:id`
**Allowed Roles**: ADMIN, TEACHER, STUDENT
**Response (200 OK)**: Subject details.

### 🔹 Update Subject
**Method**: `PUT`
**URL**: `/subjects/:id`
**Allowed Roles**: ADMIN
**Request Body**: Same options as Create.
**Response (200 OK)**: Updated Subject.

### 🔹 Delete Subject
**Method**: `DELETE`
**URL**: `/subjects/:id`
**Allowed Roles**: ADMIN
**Response (200 OK)**: Success message.

---

## 7. Lectures & Sessions

### 🔹 Create Lecture
**Method**: `POST`
**URL**: `/lectures`
**Allowed Roles**: ADMIN
**Request Body**:
```json
{
  "subjectId": "string (uuid)",
  "classId": "string (uuid)",
  "teacherId": "string (uuid)",
  "startTime": "string (ISO datetime)",
  "endTime": "string (ISO datetime)",
  "title": "string (optional)",
  "topic": "string (optional)",
  "description": "string (optional)"
}
```
**Response (201 Created)**: Lecture object.

### 🔹 List Lectures
**Method**: `GET`
**URL**: `/lectures`
**Allowed Roles**: ALL
**Query Params**: `?fromDate=...&toDate=...`
**Response (200 OK)**: List of lectures.

### 🔹 Update Lecture
**Method**: `PUT`
**URL**: `/lectures/:id`
**Allowed Roles**: ADMIN
**Request Body**: Optional fields from Create + `cancellationReason`.
**Response (200 OK)**: Updated Lecture.

### 🔹 Start Session
**Method**: `POST`
**URL**: `/lectures/:id/sessions/start`
**Allowed Roles**: TEACHER, ADMIN
**Path Params**: `id` (Lecture UUID)
**Request Body**:
```json
{
  "remarks": "string (optional)"
}
```
**Response (201 Created)**:
```json
{ "id": "session_uuid", "status": "ACTIVE", "startTime": "..." }
```

### 🔹 Close Session
**Method**: `POST`
**URL**: `/lectures/:id/sessions/close`
**Allowed Roles**: TEACHER, ADMIN
**Path Params**: `id` (Lecture UUID)
**Response (200 OK)**:
```json
{ "id": "session_uuid", "status": "CLOSED", "endTime": "..." }
```

### 🔹 Get Session History
**Method**: `GET`
**URL**: `/lectures/:id/sessions`
**Allowed Roles**: TEACHER, ADMIN
**Response (200 OK)**: List of sessions for this lecture.

---

## 8. Attendance

### 🔹 Mark Attendance
**Method**: `POST`
**URL**: `/attendance/mark`
**Allowed Roles**: STUDENT
**Request Body**:
```json
{
  "lectureId": "string (uuid)",
  "sessionId": "string (uuid)",
  "deviceHash": "string (optional)",
  "faceVerified": "boolean (optional)",
  "remarks": "string (optional)"
}
```
**Response (201 Created)**:
```json
{ "status": "PRESENT" }
```

### 🔹 Get My Attendance
**Method**: `GET`
**URL**: `/attendance/me`
**Allowed Roles**: STUDENT
**Response (200 OK)**: List of user's attendance records.

### 🔹 Get Lecture Attendance
**Method**: `GET`
**URL**: `/attendance/lecture/:id`
**Allowed Roles**: TEACHER, ADMIN
**Path Params**: `id` (Lecture UUID)
**Response (200 OK)**: List of all students' attendance for the lecture.

### 🔹 Override Attendance
**Method**: `POST`
**URL**: `/attendance/:id/override`
**Allowed Roles**: ADMIN
**Path Params**: `id` (Attendance UUID)
**Request Body**:
```json
{
  "status": "PRESENT | ABSENT | LATE | EXCUSED",
  "reason": "MEDICAL | ERROR | OTHER",
  "notes": "string (optional)"
}
```
**Response (200 OK)**: Updated attendance.

---

## 9. Reports

### 🔹 Class Attendance Report
**Method**: `GET`
**URL**: `/reports/attendance/class/:id`
**Allowed Roles**: ADMIN, TEACHER
**Response (200 OK)**: Aggregated class statistics.

### 🔹 Student Attendance Report
**Method**: `GET`
**URL**: `/reports/attendance/student/:id`
**Allowed Roles**: ALL
**Response (200 OK)**: Detailed student history.

### 🔹 Subject Attendance Report
**Method**: `GET`
**URL**: `/reports/attendance/subject/:id`
**Allowed Roles**: ADMIN, TEACHER
**Response (200 OK)**: Subject-wise statistics.

---

## 10. Metadata & Audit

### 🔹 Get Config/Meta
**Method**: `GET`
**URL**: `/meta/roles`, `/meta/attendance-status`
**Allowed Roles**: PUBLIC
**Response (200 OK)**: List of enum values.

### 🔹 Get Audit Logs
**Method**: `GET`
**URL**: `/audit/attendance/:id`
**Allowed Roles**: ADMIN
**Response (200 OK)**: Log details.

---

## 11. Devices

### 🔹 Register Device
**Method**: `POST`
**URL**: `/devices/register`
**Allowed Roles**: STUDENT
**Request Body**:
```json
{
  "deviceHash": "string (required)"
}
```
**Response (201 Created)**: Device object.
