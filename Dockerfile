FROM node:20-alpine

RUN apk add --no-cache openssl

USER node

WORKDIR /home/node/

COPY --chown=node:node shopper-node-technical-test .

COPY --chown=node:node .env .

RUN npm install -y && \ 
    npm run setup && \ 
    npm run prisma:generate && \ 
    npm run migration:run && \ 
    npm run build && \ 
    npm cache clean --force

EXPOSE 8080

CMD ["npm", "run", "start"]