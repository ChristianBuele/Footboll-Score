FROM node:19.2-alpine

#app
WORKDIR /app

#los archivos importantes
COPY package*.json ./
#Dependencias
RUN npm install
COPY ./dist ./dist

#comando para correr la aplicacion
CMD [ "node","./dist/app.js" ]

