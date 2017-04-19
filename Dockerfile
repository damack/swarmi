FROM node:6-alpine

RUN apk update && \
    apk upgrade && \
    apk add git
RUN mkdir -p /usr/app
COPY ./ /usr/app
WORKDIR /usr/app

RUN npm install -g bower grunt-cli
RUN npm install
RUN bower install --allow-root
RUN grunt bower
RUN grunt build
RUN mv _build ../

WORKDIR /usr
RUN rm -rf app/
RUN mkdir app

WORKDIR /usr/_build
RUN cp -vr * /usr/app

WORKDIR /usr
RUN rm -rf _build

WORKDIR /usr/app
RUN mkdir db
RUN npm install --production

ENV PORT 9000
EXPOSE $PORT

CMD ["npm", "start"]