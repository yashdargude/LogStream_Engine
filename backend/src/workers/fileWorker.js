const { Worker } = require("bullmq");
const Redis = require("ioredis");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const readline = require("readline");
const os = require("os");

// const connection = new Redis({
//   host: process.env.Redis_Host_Cloud,
//   port: process.env.Redis_Port_Cloud,
//   password: process.env.REDIS_PASSWORD,
//   maxRetriesPerRequest: null,
//   tls: {
//     minVersion: "TLSv1.2", // ✅ Force correct TLS version
//     rejectUnauthorized: false, // ✅ Ignore certificate issues
//   },
// });

const connection = new Redis(process.env.Redis_Url_Cloud, {
  maxRetriesPerRequest: null,
  tls: {
    rejectUnauthorized: false,
  },
});

const supabase = createClient(
  process.env.Supabase_URL,
  process.env.Supabase_Anon_Key
);

const fileWorker = new Worker(
  "log-processing-queue",
  async (job) => {
    console.log(`Processing job ${job.id} with priority ${job.opts.priority}`);

    const { filePath } = job.data;

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    const logStats = {
      job_id: job.id,
      errors: 0,
      warnings: 0,
      infos: 0,
      ips: new Set(),
    };

    for await (const line of rl) {
      //   console.log("Processing line:", line);

      // Improved regex to correctly extract log parts including JSON payload
      const match = line.match(/^\[(.*?)\] (\w+) (.+?)(?: ({.*}))?$/);

      if (match) {
        const [, timestamp, level, message, jsonPayload] = match;

        // Count errors, warnings, infos
        if (level === "ERROR") logStats.errors++;
        if (level === "WARNING") logStats.warnings++;
        if (level === "INFO") logStats.infos++;

        // Parse JSON payload if present
        if (jsonPayload) {
          try {
            const payload = JSON.parse(jsonPayload);
            if (payload.ip) {
              logStats.ips.add(payload.ip);
              console.log("IP Address Added:", payload.ip);
            }
          } catch (error) {
            console.error("Error parsing JSON payload:", error.message);
          }
        }
      } else {
        console.log("No match found for line:", line);
      }
    }

    logStats.ips = Array.from(logStats.ips);
    console.log("Final IPs Set:", logStats.ips);

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
      console.error("Error inserting log stats:", error.message);
    } else {
      console.log("Log stats inserted:", data);
    }
  },
  { connection }
);

module.exports = fileWorker;
