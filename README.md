# Arré Assignment Server

This is the server for the Arré assignment. It is a simple REST API that allows you to create, load whatsapp messages.

## Installation

To install the server, you need to have [Node.js](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/) and [npm](https://www.npmjs.com/) installed. Then, run the following commands:

```bash
npm install
cp .env.example .env
npm start
```

## Important

- The server starts at port 3000 by default. You can change this by setting the `PORT` environment variable.
- The server uses MongoDB as the database. You can change the database URL by setting the `MONGODB_URL` environment variable.
- You can find the required API routes and Schemas in the `./src/components` directory.

## Usage

The server exposes the following endpoints:

- `POST /api/v1/messages/create` - Creates a new message
- `GET /api/v1/messages/load/:groupId/:page/:limit` - Loads messages from a group in a paginated way

To successfully test these routes, you would need to create sameple groups and users in the database manually. Refer to the schema models for the same.

## Caveats

- The routes to create a new user or a new group are missing. Trying to create or load a message would result in an error.
- The server is not production ready. It is missing a lot of things, like authentication, rate limiting, etc.
- The server is not tested. It is missing unit tests, integration tests, etc.

## Support

If you have any questions, feel free to reach out to me at [f20190338@goa.bits-pilani.ac.in](mailto:f20190338@goa.bits-pilani.ac.in).
