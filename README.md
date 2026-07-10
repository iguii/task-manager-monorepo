# Task Manager - Monorepo

[![.github/workflows/ci.yml](https://github.com/iguii/task-manager-monorepo/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iguii/task-manager-monorepo/actions/workflows/ci.yml)

<img width="1964" height="1236" alt="ScreenShot 2026-07-09 at 21 16 39" src="https://github.com/user-attachments/assets/b8c59edb-c5f8-46a8-a163-806bfbb09ca4" />

This is a monorepo implementation of a simple Task Manager web application.
It includes both the frontend and backend components, allowing
for easy management of tasks.

---

## Installation

### Prerequisites

* Docker
* NodeJS (optional)
* npm (optional)

## Running the application

```sh
docker compose up -d
```

Wait for **backend, frontend and db** services to initialize and start running.

---

## Usage

Navigate to [localhost:5173](http://localhost:5173) in
your browser to access the Task Manager application.
If it's your first time using it, you need to sign up before logging in.

---

## Configuration

`.env` configuration example:

```
# PostgreSQL
POSTGRES_DB=taskmanagerfinal
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432

# Backend
BACKEND_PORT=3000
DATABASE_URL=postgresql://postgres:postgres@db:5432/taskmanagerfinal?schema=public
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1d

# Frontend
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:3000/api/v1
```
