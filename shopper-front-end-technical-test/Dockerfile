FROM node:20-alpine

USER node

WORKDIR /home/node/

COPY --chown=node:node . .

RUN npm install -y && \ 
    npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]