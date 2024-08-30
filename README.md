- [Shopper Node Technical Test](#shopper-node-technical-test)
  - [Getting Started](#getting-started)
    - [Dependencies](#dependencies)
    - [Docker](#docker)
    - [Node](#node)
  - [Tests](#tests)
- [Documentation](#documentation)

[Português Brasil](./README-pt_br.md)

# Shopper Node Technical Test

Technical test for the Junior Full-Stack Web Developer position.

[Also access the version made in nest.JS](https://github.com/JoaoEmanuell/shopper-nestjs-technical-test)

## Getting Started

Create a `.env` file at the root of the repository

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

Start the project (You can also run only this step and the project will be up and running)

```
docker compose up
```

It will be available on port **8080**

### Node

Go to the `shopper-node-technical-test` directory

```
cd shopper-node-technical-test
```

Copy the .env in root repository to current directory

```
cp ../.env .
```

Install the dependencies.

```
npm install -y
```

Run the setup

```
node setup.mjs
```

Run the prisma generate

```
npm run prisma:generate
```

Run the migrations

```
npm run migration:run
```

Build the project

```
npm run build
```

Start the project

```
npm run start
```

## Tests

Go to the `shopper-node-technical-test` directory

Run the tests

```
npm run test
```

# Documentation

To access the documentation, see the [openapi](./docs/openapi.yaml) specification

You can copy the contents of the file and use the [swagger editor](https://editor.swagger.io/) to view it.