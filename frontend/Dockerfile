# base image
FROM node:gallium-alpine

WORKDIR /app

COPY ./frontend /app

RUN yarn add global @vue/cli
RUN yarn

EXPOSE 8080

CMD ["yarn", "serve"]
