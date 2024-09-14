- [Shopper Node Technical Test](#shopper-node-technical-test)
  - [Getting Started](#getting-started)
    - [Dependencies](#dependencies)
    - [Docker](#docker)
    - [Node](#node)
      - [API](#api)
      - [Web](#web)
  - [Tests](#tests)
- [Documentation](#documentation)

[Português Brasil](./README-pt_br.md)

# Shopper Node Technical Test

Technical test for the Junior Full-Stack Web Developer position.

[Also check out the version made in NestJS](https://github.com/JoaoEmanuell/shopper-nestjs-technical-test)

## Getting Started

Create a `.env` file at the root of the repository.

Fill the file with a [Gemini API key](https://ai.google.dev/gemini-api/docs/api-key).

```
GEMINI_API_KEY= api key for gemini
```

### Dependencies

```
node >= 20.17.0
docker => 24.0.7
Docker Compose => 2.24.6
```

### Docker

Build the project using `docker compose`

```
docker compose build
```

Start the project (You can also run just this step and the project will be live)

```
docker compose up
```

The web interface will be available on localhost, and the API will be accessible through port 3000.

### Node

#### API

Go to the `shopper-node-technical-test` directory.

```
cd shopper-node-technical-test
```

Copy the .env from the repository root to the current directory.

```
cp ../.env .
```

Install the dependencies.

```
npm install -y
```

Run the setup.

```
node setup.mjs
```

Run prisma generate.

```
npm run prisma:generate
```

Run the migrations.

```
npm run migration:run
```

Build the project.

```
npm run build
```

Run the project.

```
npm run start
```

The application will be available on **port 3000**.

#### Web

Go to the `shopper-front-end-technical-test` directory.

```
cd shopper-front-end-technical-test
```

Install the dependencies.

```
npm install -y
```

Build the application.

```
npm run build
```

Run the application.

```
npm run start
```

The application will be available on **port 8080**.

## Tests

Go to the `shopper-node-technical-test` directory.

Run the tests.

```
npm run test
```

# Documentation

To access the documentation, see the [openapi specification](./docs/openapi.yaml).

You can copy the content of the file and use the [Swagger editor](https://editor.swagger.io/) to view it.