# ☑️ Checkbox Real-Time Sync System

A distributed real-time checkbox synchronization system built using WebSockets and Redis.
This project demonstrates how to propagate state changes instantly across multiple clients and servers using a pub/sub architecture.

---

## 📌 Overview

The Checkbox system allows multiple users (or tabs/devices) to toggle checkboxes and see updates **instantly reflected everywhere**.

It is designed to explore:

* Real-time data flow
* Multi-server synchronization
* Pub/Sub messaging using Redis
* WebSocket-based state propagation

---

## ⚙️ Tech Stack

### 🧩 Backend

* **Node.js + Express**
* **WebSocket (Socket.IO)**
* **Redis (Pub/Sub for cross-server sync)**

### 🌐 Frontend

* **HTML, CSS, JavaScript**
* **Socket.IO Client**

---

## 🏗️ Architecture

This system uses a **distributed event-driven model**:

1. User toggles checkbox → event sent via WebSocket
2. Server receives update → publishes to Redis channel
3. Redis broadcasts event → all subscribed servers
4. Each server emits update → connected clients
5. All clients update UI in real-time

---


## 📦 Features

* ☑️ Real-time checkbox state synchronization
* 🔄 Multi-server consistency using Redis Pub/Sub
* ⚡ Low-latency updates via WebSockets
* 🧠 Event-driven architecture
* 🌍 Works across multiple clients and servers

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash id="cln123"
git clone https://github.com/sahilthakurr24/checkbox.git
cd checkbox
```

---

### 2️⃣ Install Dependencies

```bash id="ins456"
pnpm install
```

---

### 3️⃣ Start Redis Server

Make sure Docker is installed, then start Redis using the provided configuration:

```bash
docker-compose up -d
```

This will start a Redis instance accessible at:

```text
redis://localhost:6379
```

> Ensure Docker is running before executing the command.

---

### 4️⃣ Run the Application

```bash id="run321"
pnpm dev
```

---

## 🔐 How It Works

* Each checkbox update is treated as an **event**
* Redis acts as a **central message broker**
* Servers subscribe to Redis channels
* WebSockets deliver updates to clients instantly

---

## 🧠 Learning Goals

This project was built to understand:

* How Redis Pub/Sub enables multi-server communication
* Real-time systems using WebSockets
* State synchronization across distributed systems
* Event-driven backend design

---

## ⚠️ Notes

* Redis is used as a **message broker**, not as a primary database
* WebSockets are used strictly for **real-time state updates**
* Designed for learning distributed system fundamentals

---

## 🛠️ Future Improvements

* Persistent storage (Database integration)
* User authentication system
* Conflict resolution strategies
* Horizontal scaling with load balancers
* UI improvements (React + state management)

---


## 👨‍💻 Author

Sahil Thakur

---

> Built to explore real-time synchronization, distributed systems, and event-driven architecture.
