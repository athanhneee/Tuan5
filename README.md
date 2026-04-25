# Xây dựng server + form đăng ký người dùng

## Chạy project

```bash
npm install
npm start
```

Server chạy tại:

```text
http://localhost:3000
```

## API

### GET /api/info

Query:

```text
name=An&age=20
```

Ví dụ:

```text
http://localhost:3000/api/info?name=An&age=20
```

### POST /api/register

Body JSON:

```json
{
  "name": "An",
  "age": 20,
  "email": "an@example.com"
}
```

## Cấu trúc project

```text
index.js
public/index.html
.env
.gitignore
```

File `index.js` là phần backend chính: Express server, middleware pipeline và 2 route API.

Phần `public/index.html` có 2 form gọi API bằng `fetch()` và hiển thị kết quả ngay trên trang, không reload.
"# Tuan5" 
