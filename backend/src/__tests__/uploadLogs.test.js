const request = require("supertest");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const fileQueue = require("../queues/fileQueue");
const app = express();

jest.mock("../queues/fileQueue.js");

const upload = multer({ dest: "uploads/" });
app.post("/api/upload-logs", upload.array("logfiles", 10), async (req, res) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  const jobs = await Promise.all(
    files.map(async (file) => {
      const fileSizeInBytes = fs.statSync(file.path).size;
      const priority = Math.max(1, Math.floor(fileSizeInBytes / 10));

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

describe("POST /api/upload-logs", () => {
  it("should process uploaded log files and return job details", async () => {
    const mockFile = Buffer.from("test log content");
    fileQueue.add.mockResolvedValue({ id: "job-id" });

    const response = await request(app)
      .post("/api/upload-logs")
      .attach("logfiles", mockFile, "test.log");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { jobId: "job-id", fileName: "test.log", priority: expect.any(Number) },
    ]);
  });

  it("should return 400 if no files are uploaded", async () => {
    const response = await request(app).post("/api/upload-logs");

    expect(response.status).toBe(400);
    expect(response.text).toBe("No files uploaded.");
  });
});
