FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV MONGO_URI=mongodb+srv://eslamhussin600:9Lf4lu5lRD0Tth5S@kafka.ig6tsrh.mongodb.net/

EXPOSE 3000

CMD ["npm", "start"]

