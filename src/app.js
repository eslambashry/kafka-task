import express from 'express'
import { dbConnection } from './DB/connection.js'
import dotenv from 'dotenv';
import { Kafka } from 'kafkajs';
import logRoutes from './modules/log/log.routes.js';

dotenv.config();
const app = express()
app.use(express.json())

const port = process.env.PORT
dbConnection()

// ! kafka
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();

await producer.connect();

await producer.send({
  topic: 'user-activities',
  messages: [
    { 
      key: 'user-123', 
      value: JSON.stringify({
        userId: 'user-123',
        action: 'login',
        timestamp: new Date().toISOString()
      }) 
    },
  ],
});

await producer.disconnect();
const consumer = kafka.consumer({ groupId: 'processing-group' });

await consumer.connect();

await consumer.subscribe({ topic: 'user-activities', fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const data = JSON.parse(message.value.toString());
    console.log({
      topic,
      partition,
      key: message.key.toString(),
      value: data,
      timestamp: message.timestamp
    });
  },
});


// ! routes
app.use('/api/v1/log', logRoutes)

app.get('/', (req, res) => res.send('Hello World!'))  
app.listen(port, () => console.log(`Example app listening on port ${port} 👍`))