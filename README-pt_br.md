- [Shopper Node Technical Test](#shopper-node-technical-test)
  - [Começando](#começando)
    - [Dependências](#dependências)
    - [Docker](#docker)
    - [Node](#node)
      - [API](#api)
      - [Web](#web)
  - [Testes](#testes)
- [Documentação](#documentação)


# Shopper Node Technical Test

Teste técnico para a vaga de Desenvolvedor Web Full-Stack Júnior.

[Acesse também a versão feita em nest.JS](https://github.com/JoaoEmanuell/shopper-nestjs-technical-test)

## Começando

Crie um arquivo `.env` na raiz do repositório

Preencha o arquivo com uma [chave de api do Gemini](https://ai.google.dev/gemini-api/docs/api-key).

```
GEMINI_API_KEY= api key for gemini
```

### Dependências

```
node >= 20.17.0
docker => 24.0.7
Docker Compose => 2.24.6
```

### Docker

Faça a build do projeto por meio do `docker compose`

```
docker compose build
```

Suba o projeto (Você também pode executar apenas essa etapa e o projeto já estará no ar)

```
docker compose up
```

A interface web estará disponível no localhost já a api estará acessível por meio da porta 3000.

### Node

#### API

Acesse o diretório `shopper-node-technical-test`

```
cd shopper-node-technical-test
```

Copie o .env na raiz do repositório para o diretório atual

```
cp ../.env .
```

Faça a instalação das dependências.

```
npm install -y
```

Execute o setup

```
node setup.mjs
```

Execute o prisma generate

```
npm run prisma:generate
```

Execute as migrations

```
npm run migration:run
```

Faça a build

```
npm run build
```

Execute o projeto

```
npm run start
```

A aplicação estará disponível na porta **3000**

#### Web

Acesse o diretório `shopper-front-end-technical-test`

```
cd shopper-front-end-technical-test
```

Faça a instalação das dependências.

```
npm install -y
```

Faça a build da aplicação

```
npm run build
```

Execute a aplicação

```
npm run start
```

A aplicação estará disponível na porta **8080**

## Testes

Acesse o diretório `shopper-node-technical-test`

Execute os testes

```
npm run test
```

# Documentação

Para acessar a documentação, veja a especificação da [openapi](./docs/openapi.yaml).

Você pode copiar o conteúdo do arquivo e usar o [swagger editor](https://editor.swagger.io/) para visualizá-lo.