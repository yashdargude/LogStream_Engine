require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const fileQueue = require("./queues/fileQueue");
const fileWorker = require("./workers/fileWorker");
const { createClient } = require("@supabase/supabase-js");
require("./workers/fileWorker");

const app = express();
const port = process.env.PORT || 3000;

const supabase = createClient(
  process.env.Supabase_URL,
  process.env.Supabase_Anon_Key
);

app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/api/upload-logs", upload.array("logfiles", 10), async (req, res) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  const jobs = await Promise.all(
    files.map(async (file) => {
      const fileSizeInBytes = fs.statSync(file.path).size;
      const priority = Math.max(1, Math.floor(fileSizeInBytes / 10)); // Higher priority for smaller files

      console.log(
        `File: ${file.originalname}, Size: ${fileSizeInBytes} bytes, Priority: ${priority}`
      );

      const job = await fileQueue.add(
        "process-log",
        {
          fileId: file.filename,
          filePath: file.path,
        },
        { priority }
      );

      return { jobId: job.id, fileName: file.originalname, priority };
    })
  );

  res.send(jobs);
});

app.get("/api/stats", async (req, res) => {
  const { data, error } = await supabase.from("log_stats").select("*");

  if (error) {
    return res.status(500).send(error.message);
  }

  res.send(data);
});

app.get("/api/stats/:jobId", async (req, res) => {
  const { jobId } = req.params;
  const { data, error } = await supabase
    .from("log_stats")
    .select("*")
    .eq("job_id", jobId);

  if (error) {
    return res.status(500).send(error.message);
  }

  res.send(data);
});

app.get("/api/queue-status", async (req, res) => {
  const queueStatus = await fileQueue.getJobCounts();
  res.send(queueStatus);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// backend/files/logs/log1.log
// /Users/yashdargude/Desktop/project/LogStream_Engine/backend/files/logs/log1.log
