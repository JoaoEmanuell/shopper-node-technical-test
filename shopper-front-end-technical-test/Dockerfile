FROM node:20-alpine

USER node

WORKDIR /home/node/

COPY --chown=node:node . .

RUN npm install -y && \ 
    npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]