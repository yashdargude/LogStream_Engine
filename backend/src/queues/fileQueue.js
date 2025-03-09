const { Queue } = require("bullmq");
const Redis = require("ioredis");

const connection = new Redis({
  host: process.env.Redis_Host_Cloud,
  port: process.env.Redis_Port_Cloud,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  tls: {},
});

const fileQueue = new Queue("log-processing-queue", {
  connection,
  defaultJobOptions: {
    attempts: 3, // Set retry limit to 3 attempts
    backoff: {
      type: "exponential",
      delay: 1000, // Initial delay of 1 second
    },
  },
  limiter: {
    max: 4, // Process 4 jobs concurrently
    duration: 1000, // Per second
  },
});

module.exports = fileQueue;
