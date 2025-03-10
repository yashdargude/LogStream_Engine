const { Worker } = require("bullmq");
const Redis = require("ioredis");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const readline = require("readline");
const os = require("os");

// ✅ Create Redis Connection Using ioredis (NOT native Redis)
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

// ✅ Initialize Supabase
const supabase = createClient(
  process.env.Supabase_URL,
  process.env.Supabase_Anon_Key
);

// ✅ Worker for BullMQ
const fileWorker = new Worker(
  "log-processing-queue",
  async (job) => {
    console.log(
      `⚙️ Processing job ${job.id} with priority ${job.opts.priority}`
    );

    const { filePath } = job.data;

    // ✅ Read the log file
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    // ✅ Initialize Log Stats
    const logStats = {
      job_id: job.id,
      errors: 0,
      warnings: 0,
      infos: 0,
      ips: new Set(),
    };

    // ✅ Process each line of the log file
    for await (const line of rl) {
      // ✅ Extract data using regex
      const match = line.match(/^\[(.*?)\] (\w+) (.+?)(?: ({.*}))?$/);

      if (match) {
        const [, timestamp, level, message, jsonPayload] = match;

        // ✅ Count errors, warnings, infos
        if (level === "ERROR") logStats.errors++;
        if (level === "WARNING") logStats.warnings++;
        if (level === "INFO") logStats.infos++;

        // ✅ Extract IP addresses from payload
        if (jsonPayload) {
          try {
            const payload = JSON.parse(jsonPayload);
            if (payload.ip) {
              logStats.ips.add(payload.ip);
              console.log(`✅ IP Address Captured: ${payload.ip}`);
            }
          } catch (error) {
            console.error(`❌ Failed to parse JSON: ${error.message}`);
          }
        }
      }
    }

    // ✅ Convert Set to Array
    logStats.ips = Array.from(logStats.ips);

    // ✅ Save Log Stats to Supabase
    const { data, error } = await supabase.from("log_stats").insert([
      {
        job_id: logStats.job_id,
        errors: logStats.errors,
        warnings: logStats.warnings,
        infos: logStats.infos,
        ips: logStats.ips,
      },
    ]);

    if (error) {
      console.error("❌ Failed to insert log stats:", error.message);
    } else {
      console.log("✅ Successfully inserted log stats:", data);
    }
  },
  {
    connection,
  }
);

// ✅ Export the Worker
module.exports = fileWorker;
