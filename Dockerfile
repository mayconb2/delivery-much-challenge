FROM node:latest

RUN mkdir -p /usr/app

WORKDIR /app/src

COPY package.json /usr/app/

ENV RECIPE_PUPPY_URL=http://www.recipepuppy.com/api/?i=
ENV GIPHY_URL=http://api.giphy.com/v1/gifs/search?api_key=
ENV GIPHY_TOKEN=7BwyiYfJ2KBrLcZhXBaQcsv6CVSp2vwy
ENV LIMIT=3root@e1529bf44856:/app
ENV INTER_PORT=3000

COPY . /app

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]