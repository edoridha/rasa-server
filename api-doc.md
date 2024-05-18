# API Documentation

### 1. GET /book

Description:

- Get all book from database

_Response (200 - OK)_

```json
{
    "status": true,
    "message": "Successfully retrieved books list",
    "statusCode": "OK",
    "data": [
        {
            "id": 1,
            "title": "Percakapan Politik",
            "author": "A. Sudiarja",
            "sectionId": 2,
            "stock": 5,
            "createdAt": "2024-05-16T18:58:46.308Z",
            "updatedAt": "2024-05-18T12:42:43.472Z"
        },
        {
            "id": 2,
            "title": "Negara dan Politik Kesejahteraan",
            "author": "A. Muhaimin Iskandar",
            "sectionId": 2,
            "stock": 5,
            "createdAt": "2024-05-16T18:58:46.308Z",
            "updatedAt": "2024-05-18T12:42:43.473Z"
        },
        ...,
    ],
    "totalPage": 3
}
```

&nbsp;

### 2. post /book

Description:

- Create book

Request:

- body:

```json
form-data:

{
    "title": "string",
    "author": "string",
    "sectionId": "integer",
    "stock": "integer"
}
```

_Response (201 - Created)_

```json
{
  "status": true,
  "message": "Successfully create book",
  "statusCode": "Created"
}
```

&nbsp;

### 3. put /book/:id

Description:

- Increase stock's book by id

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "status": true,
  "message": "Successfully increase book",
  "statusCode": "Updated"
}
```

### 4. post /rent

Description:

- Create rent

Request:

- body:

```json
form-data:

{
    "studentId": "integer",
    "books": ["integer"]
}
```

_Response (201 - Created)_

```json
{
  "status": true,
  "message": "Successfully rent books",
  "statusCode": "Created"
}
```

### 5. get /rent

Description:
-Get all book from database

Request:

- headers

```json
{
  "studentid": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "status": true,
    "message": "Successfully retrieved rent list",
    "statusCode": "OK",
    "data": [
        {
            "id": 22,
            "studentId": 1,
            "rentDate": "2024-05-18T06:32:58.200Z",
            "returnDate": "2024-06-01T06:32:58.200Z",
            "status": true,
            "createdAt": "2024-05-18T06:32:58.199Z",
            "updatedAt": "2024-05-18T06:32:58.199Z",
            "RentBooks": [
                {
                    "id": 54,
                    "rentId": 22,
                    "bookId": 5,
                    "createdAt": "2024-05-18T06:32:58.202Z",
                    "updatedAt": "2024-05-18T06:32:58.202Z",
                    "Book": {
                        "id": 5,
                        "title": "Harry Potter and the Philosopher's Stone",
                        "author": "J.K Rowling",
                        "sectionId": 3,
                        "stock": 4,
                        "createdAt": "2024-05-16T18:58:46.308Z",
                        "updatedAt": "2024-05-18T08:28:47.709Z"
                    }
                },
                {
                    "id": 55,
                    "rentId": 22,
                    "bookId": 7,
                    "createdAt": "2024-05-18T06:32:58.202Z",
                    "updatedAt": "2024-05-18T06:32:58.202Z",
                    "Book": {
                        "id": 7,
                        "title": "Harry Potter and the Chamber of Secrets",
                        "author": "J.K Rowling",
                        "sectionId": 3,
                        "stock": 11,
                        "createdAt": "2024-05-16T19:06:45.762Z",
                        "updatedAt": "2024-05-18T12:57:15.258Z"
                    }
                }
            ]
        },
        ...,
    ]
}
```

### 6. put /rent/:id

Description:
-Donet book rent

Request:

- params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "status": true,
  "message": "Successfully done rent",
  "statusCode": "OK"
}
```

### 7. get /student

Description:
-Get stundet list from database

Request:

- headers

```json
{
  "status": "string (required)"
}
```

_Response (200 - OK)_

```json
{
    "status": true,
    "message": "Successfully retrieved student list",
    "statusCode": "OK",
    "data": [
        {
            "id": 1,
            "name": "Bramantya",
            "studentid": "2211334422",
            "status": true,
            "createdAt": "2024-05-16T18:58:46.305Z",
            "updatedAt": "2024-05-16T18:58:46.305Z"
        },
        {
            "id": 2,
            "name": "Ilham Anugrah",
            "studentid": "9201365427",
            "status": true,
            "createdAt": "2024-05-16T18:58:46.305Z",
            "updatedAt": "2024-05-16T18:58:46.305Z"
        },
        ...,
    ]
}
```

### 8. post /student

Description:
-Create student

Request:

- body:

```json
form-data:

{
    "name": "string",
    "studentid": "string"
}
```

_Response (201 - Created)_

```json
{
        "status": true,
        "message": "Successfully create student",
        "statusCode": "Created",
      }
     
```

### 9. put /student/:id
Description:
-Change student's status

Request:

- params

```json
{
  "id": "integer (required)"
}
```
_Response (200 - OK)_
```json
{
    "status": true,
    "message": "Successfully change status",
    "statusCode": "Updated"
}
```

### 10. get /section
Description:
-Get all section from database

_Response (200 - OK)_
```json
{
    "status": true,
    "message": "Successfully retrieved section list",
    "statusCode": "OK",
    "data": [
        {
            "id": 1,
            "name": "History",
            "createdAt": "2024-05-16T18:58:46.301Z",
            "updatedAt": "2024-05-16T18:58:46.301Z"
        },
        {
            "id": 2,
            "name": "Politic",
            "createdAt": "2024-05-16T18:58:46.301Z",
            "updatedAt": "2024-05-16T18:58:46.301Z"
        },
        ...,
    ]
}
```

### 11. post /section
Description
-Create new section/category

Request:

- body:

```json
form-data:

{
    "name": "string",
}
```

_Response (201 - Created)_

```json
      {
        "status": true,
        "message": "Successfully create section",
        "statusCode": "Created",
      }
```

### 12. get /history
Description :
-Get history rent from database

_Response (200 - OK)_

```json
{
    "status": true,
    "message": "Successfully retrieved history list",
    "statusCode": "OK",
    "data": [
        {
            "id": 1,
            "studentId": 1,
            "bookId": 1,
            "rentDate": "2024-05-16T18:59:19.355Z",
            "returnDate": "2024-05-16T20:15:06.159Z",
            "createdAt": "2024-05-16T20:15:06.160Z",
            "updatedAt": "2024-05-16T20:15:06.160Z",
            "Book": {
                "id": 1,
                "title": "Percakapan Politik",
                "author": "A. Sudiarja",
                "sectionId": 2,
                "stock": 5,
                "createdAt": "2024-05-16T18:58:46.308Z",
                "updatedAt": "2024-05-18T08:28:40.984Z"
            },
            "Student": {
                "id": 1,
                "name": "Bramantya",
                "studentid": "2211334422",
                "status": true,
                "createdAt": "2024-05-16T18:58:46.305Z",
                "updatedAt": "2024-05-16T18:58:46.305Z"
            }
        },
        {
            "id": 2,
            "studentId": 1,
            "bookId": 2,
            "rentDate": "2024-05-16T18:59:19.355Z",
            "returnDate": "2024-05-16T20:15:06.162Z",
            "createdAt": "2024-05-16T20:15:06.162Z",
            "updatedAt": "2024-05-16T20:15:06.162Z",
            "Book": {
                "id": 2,
                "title": "Negara dan Politik Kesejahteraan",
                "author": "A. Muhaimin Iskandar",
                "sectionId": 2,
                "stock": 5,
                "createdAt": "2024-05-16T18:58:46.308Z",
                "updatedAt": "2024-05-17T18:18:41.713Z"
            },
            "Student": {
                "id": 1,
                "name": "Bramantya",
                "studentid": "2211334422",
                "status": true,
                "createdAt": "2024-05-16T18:58:46.305Z",
                "updatedAt": "2024-05-16T18:58:46.305Z"
            }
        },
        ...,
        
    ]
}
```