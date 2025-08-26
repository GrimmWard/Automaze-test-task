# Automaze Project

A simple full‑stack task management example consisting of:

- Backend: Node.js + Express (v5) with Sequelize and SQLite for data storage.
- Frontend: Next.js 15 (React 19) with Tailwind CSS 4 and Radix UI components.

The backend exposes a minimal Tasks API. The frontend (Next.js) is intended to consume that API to display and manage tasks.


## Repository Structure

```
C:/Work/ActiveProjects/Automaze/Project
├─ backend/            # Express + Sequelize + SQLite API
└─ frontend/           # Next.js 15 + React 19 client
```


## Tech Stack

- Backend
  - Node.js (recommended: 20 LTS or newer)
  - Express 5
  - Sequelize ORM
  - SQLite (file: backend/tasks.sqlite)
  - CORS, dotenv, nodemon
- Frontend
  - Next.js 15 (app router)
  - React 19
  - Tailwind CSS 4
  - Radix UI, lucide-react, date-fns, axios, sonner


## Prerequisites

- Node.js 20 LTS or newer (18.18+ should also work, but 20 LTS is recommended)
- npm v9+ (bundled with Node 20)


## Quick Start

Open two terminals (one for the backend API, one for the frontend UI).

1) Backend API

```
cd backend
npm install
npm run dev   # starts with nodemon on http://localhost:8080 by default
```

Environment variables (optional):
- PORT: Port for the API server (default: 8080)

The SQLite DB file will be created at backend/tasks.sqlite. Sequelize sync runs on startup with `alter: true`.

2) Frontend (Next.js)

```
cd frontend
npm install
npm run dev   # Next.js dev server with Turbopack
```

By default, Next.js dev server runs on http://localhost:3000. If the frontend expects an API URL, set an environment variable such as `NEXT_PUBLIC_API_URL` pointing to the backend API (e.g., http://localhost:8080). The exact usage depends on your axios setup inside the frontend source.


## Backend API

Base URL: `http://localhost:8080/api/tasks`

Endpoints:
- GET `/` — List all tasks
- POST `/create` — Create a task
  - Body JSON example: `{ "title": "Buy milk", "priority": 3 }`
- PATCH `/update/:id` — Update a task's done flag
  - Body JSON example: `{ "done": true }`
- DELETE `/delete/:id` — Delete a task by id

Task model fields:
- title: string (required)
- done: boolean (default: false)
- priority: integer (default: 1, min 1, max 10)

cURL examples:

List tasks
```
curl http://localhost:8080/api/tasks/
```

Create a task
```
curl -X POST http://localhost:8080/api/tasks/create \
  -H "Content-Type: application/json" \
  -d '{"title":"Read docs","priority":2}'
```

Mark a task as done
```
curl -X PATCH http://localhost:8080/api/tasks/update/1 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'
```

Delete a task
```
curl -X DELETE http://localhost:8080/api/tasks/delete/1
```


## Scripts

Backend (`backend/package.json`):
- `npm run dev` — start server with nodemon (auto-restart on changes)
- `npm start` — start server with node

Frontend (`frontend/package.json`):
- `npm run dev` — Next dev server with Turbopack
- `npm run build` — Production build
- `npm start` — Start the production server
- `npm run lint` — Run eslint


## Configuration & Environment

Backend
- PORT: Optional. Defaults to 8080.
- Database: SQLite stored at `backend/tasks.sqlite`. No separate DB service required.

Frontend
- Typically, define `NEXT_PUBLIC_API_URL` to point to the backend API (e.g., http://localhost:8080). If not set, ensure the frontend axios configuration matches your environment.

Note: This repository currently does not include Docker files. Running locally is straightforward with Node and npm as outlined above.


## Development Notes

- The backend enables CORS globally and accepts JSON bodies.
- Sequelize `sync({ alter: true })` is used on startup to keep the schema in sync with the Task model during development.
- The API is intentionally simple and unauthenticated. Do not expose it publicly without adding authentication and input validation.


## Troubleshooting

- Port already in use: change PORT in backend or the port for Next.js (`-p` flag or env). 
- Database file permission issues: ensure the process can read/write `backend/tasks.sqlite`.
- CORS problems: verify the frontend calls the correct API origin and that no proxy misconfiguration exists.
- Missing frontend API base URL: set `NEXT_PUBLIC_API_URL` to the backend origin.


## License

This project is provided as-is without a specific license declared in the repository. If you intend to use it publicly, please add the appropriate license file.
