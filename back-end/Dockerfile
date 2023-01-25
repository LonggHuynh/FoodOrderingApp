FROM node:18-alpine

WORKDIR /home/app

COPY . .


RUN npm install


EXPOSE 5000

CMD [ "npm", "run", "dev" ]