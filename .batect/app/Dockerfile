FROM node:21.0.0

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install --frozen

COPY index.js* /app/

CMD ["node", "/app/index.js"]
