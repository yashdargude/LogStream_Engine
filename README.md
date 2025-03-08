# 🚀 Real-Time File Processing Microservice with BullMQ, Next.js, Supabase, and Docker

## 📖 Project Overview

This project is a full-stack microservice application designed to process large log files asynchronously using **BullMQ** and **Node.js**. The system is built using:

- ✅ **Backend:** Node.js (20.x) with BullMQ for job processing.
- ✅ **Frontend:** Next.js (15.x) with React (18.x) for real-time log processing analytics.
- ✅ **Database & Storage:** Supabase for storing logs, job statistics, and user authentication.
- ✅ **WebSocket:** Real-time job progress and log statistics updates.
- ✅ **Docker:** Containerized deployment using Docker and Docker Compose.
- ✅ **Authentication:** Supabase Auth with JWT and OAuth (Google & GitHub).
- ✅ **Job Queue:** BullMQ to prioritize small-sized files for faster processing.

---

## 🎯 Objective

The core objective of this project is to process large `.log` files asynchronously, store logs, extract errors/warnings/infos/IPs, and provide real-time updates to the frontend.

This project is highly efficient and scalable, allowing concurrent processing of logs and delivering quick file analytics to the user.

---

## 🛠 Features

### ✅ 1. File Upload & Processing

- Allows users to upload `.log` files up to **1GB**.
- Files are automatically prioritized based on their size. Smaller files are processed first.
- Handles file parsing with Node.js streams.

### ✅ 2. Real-time Updates

- Real-time WebSocket connection for:
  - **Queue Status:** Active, Completed, Failed logs.
  - **Job Progress:** Track real-time job processing.
- Updates the frontend instantly without refreshing the page.

### ✅ 3. Log File Parsing

- Extracts critical data from the logs such as:
  - ✅ Errors
  - ✅ Warnings
  - ✅ Infos
  - ✅ IP Addresses
- Saves extracted data to Supabase Database.

### ✅ 4. Supabase Integration

- Uses Supabase Storage to store uploaded files.
- Uses Supabase Database to store extracted log statistics.
- Provides Supabase Auth for user login using:
  - **Google**
  - **GitHub**

### ✅ 5. Queue Management with BullMQ

- Uses BullMQ with Redis to process files.
- Prioritizes smaller files using priority-based queues.
- Retries failed jobs up to **3 times** before marking them failed.
- Handles concurrency with 4 concurrent workers.

### ✅ 6. Dockerized Deployment

- Provides a complete Docker setup using Docker Compose.
- Runs:
  - ✅ **Next.js Frontend + Backend**
  - ✅ **Redis for BullMQ**
  - ✅ **Supabase Integration**

### ✅ 7. Job Statistics

- Provides a dashboard to view processed logs.
- Displays:
  - ✅ Job ID
  - ✅ Errors Count
  - ✅ Warnings Count
  - ✅ Infos Count
  - ✅ IP Addresses

---

## 💯 Future Improvements

✅ Implement caching with Redis.
✅ Add multi-user support.
✅ Generate downloadable reports (CSV).
✅ Auto-retry for failed files.
✅ Email notification when processing completes.

---

## 📝 Author

- 💻 **Built by:** Yash Dargude

---

## 📜 License

This project is licensed under **MIT License**.

✅ **Now deploy it with Docker & scale effortlessly! 🚀**
