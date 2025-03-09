const { Queue } = require("bullmq");
const redis = require("redis");

// ✅ Create Redis Client Using Native Redis
const client = redis.createClient({
  socket: {
    host: process.env.Redis_Host_Cloud,
    port: process.env.Redis_Port_Cloud,
    tls: {
      rejectUnauthorized: false, // ✅ Ignore self-signed certificates
      minVersion: "TLSv1.2", // ✅ Force correct TLS version
    },
  },
  password: process.env.REDIS_PASSWORD,
});

// ✅ Connect Redis Client
client.on("connect", () => {
  console.log("✅ Connected to Redis Cloud Successfully");
});

client.on("error", (err) => {
  console.error("❌ Redis Client Error", err);
});

// ✅ BullMQ Queue Using Redis Client
const fileQueue = new Queue("log-processing-queue", {
  connection: {
    host: process.env.Redis_Host_Cloud,
    port: process.env.Redis_Port_Cloud,
    password: process.env.REDIS_PASSWORD,
    tls: {
      rejectUnauthorized: false,
      minVersion: "TLSv1.2",
    },
  },
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
