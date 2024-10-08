# API Server
Đây là Server cung cấp ba API để đẩy dữ liệu mới hoàn toàn, đẩy thêm nhiều dòng vào data cũ và đọc toàn bộ data. Tất cả các API đều yêu cầu xác thực bằng Authorization trong header của mỗi request

### API Endpoints
#### Authorization
Tất cả các request API đều yêu cầu Authorization header:

```
Authorization: MI0GxEaeEWmdjvS2S8XFHb
```

#### POST /api/v1/update
API cập nhật toàn bộ nội dung data bằng data mới được cung cấp trong body.

- URL: http://203.171.21.129:5003/api/v1/update
- Method: POST
- Headers:
    - Authorization: MI0GxEaeEWmdjvS2S8XFHb
- Body: Raw text (cho phép nhiều dòng)
##### Example Request:

```
curl -X POST http://203.171.21.129:5003/api/v1/update \
-H "Authorization: MI0GxEaeEWmdjvS2S8XFHb" \
-H "Content-Type: text/plain" \
--data "This is the new content of the file."
```
##### Response:
```
{
  "message": "Updated successfully"
}
```


#### POST /api/v1/push
API đẩy thêm data được cung cấp trong body của request vào cuối data đang có.

- URL: http://203.171.21.129:5003/api/v1/push
- Method: POST
- Headers:
    - Authorization: MI0GxEaeEWmdjvS2S8XFHb
- Body: Raw text (cho phép nhiều dòng)

##### Example Request:

```
curl -X POST http://203.171.21.129:5003/api/v1/push \
-H "Authorization: MI0GxEaeEWmdjvS2S8XFHb" \
-H "Content-Type: text/plain" \
--data "This text will be appended to the file."
```
##### Response:

```
{
  "message": "Appended successfully"
}
```

#### GET /api/v1/read
API đọc và trả về toàn bộ data đang có.

- URL: http://203.171.21.129:5003/api/v1/read
- Method: GET
- Headers:
    - Authorization: MI0GxEaeEWmdjvS2S8XFHb

##### Example Request:

```
curl -X GET http://203.171.21.129:5003/api/v1/read \
-H "Authorization: MI0GxEaeEWmdjvS2S8XFHb"
```

##### Response:

response sẽ là toàn bộ data đang có, ví dụ:

```
This is the new content of the file.
This text will be appended to the file.
```






