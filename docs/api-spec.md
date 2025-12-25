# API Specification

## Authentication

### Register
- **Endpoint**: `POST /api/auth/register`
- **Body**:
  ```json
  {
    "username": "user123",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "token": "jwt_token_here"
  }
  ```

### Login
- **Endpoint**: `POST /api/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "token": "jwt_token_here"
  }
  ```

## Posts

### Create Post
- **Endpoint**: `POST /api/posts`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "text": "Hello World",
    "image": "https://image.url/pic.jpg"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "data": { ...post_object }
  }
  ```

### Get All Posts (Feed)
- **Endpoint**: `GET /api/posts`
- **Response** (200):
  ```json
  {
    "success": true,
    "count": 5,
    "data": [ ...array_of_posts ]
  }
  ```

### Update Post
- **Endpoint**: `PUT /api/posts/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{"text": "Updated text"}`

### Delete Post
- **Endpoint**: `DELETE /api/posts/:id`
- **Headers**: `Authorization: Bearer <token>`

## Interactions

### Like Post
- **Endpoint**: `PUT /api/posts/:id/like`
- **Headers**: `Authorization: Bearer <token>`

### Comment on Post
- **Endpoint**: `POST /api/posts/:id/comment`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{"text": "Nice post!"}`
