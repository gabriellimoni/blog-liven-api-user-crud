# blog-liven-api-user-crud

## Steps to run

- Configure .env with MongoDB URI
- `npm install`
- `npm start`

## cURL commands examples

- Create user: `curl -d '{"name": "Limoni", "email": "limoni@mail.com"}' -H "Content-Type: application/json" -X POST http://localhost:3000/user`
- List users: `curl http://localhost:3000/user`
- Get user: `curl http://localhost:3000/user/:id`
- Patch user: `curl -d '{"name": "New name"}' -H "Content-Type: application/json" -X PATCH http://localhost:3000/user/:id`
