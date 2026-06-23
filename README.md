# Online Judge Backend

## Overview

Online Judge Backend is a scalable coding platform backend built using Node.js, Express.js, MongoDB, Redis, BullMQ, and Docker.

The platform allows users to submit code solutions for programming problems. Submissions are processed asynchronously using Redis queues and BullMQ workers. Code is compiled and executed inside isolated Docker containers and evaluated against predefined test cases.

The platform also supports contests, participant registration, leaderboards, and automated verdict generation.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication

### Problem Management

* Create Problems
* View Problems
* Manage Test Cases

### Submission System

* Submit Solutions
* View Submission History
* Automated Evaluation

### Judge Engine

* Dockerized Code Compilation
* Dockerized Code Execution
* Test Case Validation
* Output Comparison

Supported Verdicts:

* ACCEPTED
* WRONG_ANSWER
* COMPILATION_ERROR
* RUNTIME_ERROR
* TIME_LIMIT_EXCEEDED

### Contest System

* Create Contest
* Update Contest
* Delete Contest
* Join Contest
* View Participants
* Contest Statistics
* Contest Leaderboard

### Security

* Contest Ownership Authorization
* Contest Submission Validation

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Queue Processing

* Redis
* BullMQ

### Code Execution

* Docker
* GCC

### Authentication

* JWT

---

## System Architecture

User
↓
Express API
↓
MongoDB

Submission
↓
Redis Queue
↓
BullMQ Worker
↓
Judge Service
↓
Docker Compile
↓
Docker Execute
↓
Verdict Generation
↓
MongoDB

---

## API Modules

### Authentication

* Register User
* Login User

### Problems

* Create Problem
* Get Problems
* Manage Test Cases

### Submissions

* Create Submission
* Get Submission By ID
* Get My Submissions

### Contests

* Create Contest
* Update Contest
* Delete Contest
* Join Contest
* Get Participants
* Get My Contests
* Get Contest Stats
* Get Leaderboard

---

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd online-judge-backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=3001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Start Redis

```bash
docker run -d -p 6379:6379 redis
```

### Start Server

```bash
npm start
```

### Start Worker

```bash
node src/workers/submission.worker.js
```

---

## Future Improvements

* Multi-language Support
* Real-time Updates
* Notifications
* Advanced Contest Features
* Memory Usage Tracking

---

## Author

Khushmeen Kaur
Integrated M.Tech Software Engineering, VIT Vellore
