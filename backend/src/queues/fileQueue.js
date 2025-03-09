const { Queue } = require("bullmq");
const Redis = require("ioredis");

const connection = new Redis({
  host: process.env.Redis_Host_Cloud,
  port: process.env.Redis_Port_Cloud,
  password: process.env.REDIS_PASSWORD,
  // tls: {
  //   rejectUnauthorized: true,
  //   minVersion: "TLSv1.3",
  // },
  maxRetriesPerRequest: null,
});

connection.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

connection.on("connect", () => {
  console.log("✅ Connected to Redis Cloud Successfully 🚀 in fileworkker");
});

// ✅ BullMQ Queue Using Redis Client
const fileQueue = new Queue("log-processing-queue", {
  connection,
  defaultJobOptions: {
    attempts: 3, // ✅ Maximum retry attempts
    backoff: {
      type: "exponential",
      delay: 1000, // ✅ Delay of 1 second between retries
    },
  },
  limiter: {
    max: 4, // ✅ Process max 4 files concurrently
    duration: 1000, // ✅ Every 1 second
  },
});

module.exports = fileQueue;
