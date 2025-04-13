const winston = require('winston');
const { Kafka } = require('kafkajs');
const { Transform } = require('stream');

// 1. Kafka Configuration
const kafka = new Kafka({
  clientId: 'log-producer',
  brokers: ['localhost:9092']
});

// 2. Topic Management
const requiredTopics = ['error-logs', 'warn-logs', 'general-logs'];
const admin = kafka.admin();

async function ensureTopicsExist() {
  await admin.connect();
  const existingTopics = await admin.listTopics();
  
  const topicsToCreate = requiredTopics.filter(t => !existingTopics.includes(t));
  if (topicsToCreate.length > 0) {
    await admin.createTopics({
      topics: topicsToCreate.map(topic => ({
        topic,
        numPartitions: 1,
        replicationFactor: 1
      }))
    });
  }
  await admin.disconnect();
}

// 3. Create a proper stream transform
class KafkaStreamTransport extends winston.Transport {
  constructor(opts) {
    super(opts);
    this.producer = kafka.producer();
    this.ready = this.producer.connect();
  }

  log(info, callback) {
    this.ready.then(() => {
      let topic;
      switch(info.level) {
        case 'error': topic = 'error-logs'; break;
        case 'warn': topic = 'warn-logs'; break;
        default: topic = 'general-logs';
      }

      return this.producer.send({
        topic,
        messages: [{
          value: JSON.stringify(info)
        }]
      });
    })
    .then(() => callback())
    .catch(err => {
      console.error('Kafka transport error:', err);
      callback(err);
    });
  }
}

// 4. Initialize topics and logger
ensureTopicsExist().then(() => {
  console.log('Kafka topics verified');
}).catch(console.error);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new KafkaStreamTransport() // Using our custom transport
  ]
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await admin.disconnect();
  const transports = logger.transports.filter(t => t.close);
  await Promise.all(transports.map(t => t.close()));
});

module.exports = logger;