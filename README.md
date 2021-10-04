# uploadable

Upload media to s3 backend via API call

1. Set env variables (see .env.example)
2. Generate JWT token, to be passed as bearer auth token. (can use https://jwt.io)
3. Send POST request as below example

`curl -X POST -F "upload=@/Users/dom/Downloads/vine.mp4" -H "Authorization: Bearer REDACTED" -i http://localhost:3000/api/v1/upload`

```
HTTP/1.1 100 Continue

HTTP/1.1 200 OK
X-Request-ID: 2116be2f-4392-49f4-89f9-38840f80f26a
X-Powered-By: uploadable/0.1.0
Content-Type: application/json; charset=utf-8
Content-Length: 210
Date: Mon, 04 Oct 2021 21:06:33 GMT
Connection: keep-alive

{"data":{"endpoint":"https://REDACTED/REDACTED","path":"0fd58ae7-015a-4408-b363-19230a72c46f.mp4","uri":"https://REDACTED/REDACTED/0fd58ae7-015a-4408-b363-19230a72c46f.mp4"}}
```
