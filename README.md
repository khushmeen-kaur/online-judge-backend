# Online Judge Backend

## Overview

A scalable Online Judge backend built using Node.js, Express.js, MongoDB, Redis, BullMQ, and Docker.

The system allows users to submit code solutions, which are asynchronously processed through a queue-based architecture. Submitted programs are compiled and executed inside isolated Docker containers and evaluated against predefined test cases.

---

## Features

* JWT Authentication
* Problem Management
* Test Case Management
* Submission Management
* Redis + BullMQ Queue Processing
* Dockerized Code Execution
* Automated Verdict Generation

Supported Verdicts:

* ACCEPTED
* WRONG_ANSWER
* COMPILATION_ERROR
* RUNTIME_ERROR
* TIME_LIMIT_EXCEEDED

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Redis
* BullMQ
* Docker

---

## Workflow

1. User submits code.
2. Submission enters Redis queue.
3. Worker picks submission.
4. Source file is generated.
5. Code is compiled inside Docker.
6. Test cases are executed.
7. Output is compared with expected output.
8. Verdict is generated and stored.

---

## Future Enhancements

* Contest System
* Leaderboards
* Multi-language Support
* Memory Limit Exceeded
* Execution Time Tracking
* Detailed Submission Analytics
