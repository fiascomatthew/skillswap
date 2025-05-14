# SkillSwap

**SkillSwap** is a platform for skill-sharing between individuals, designed to let people learn, teach, and connect around various areas of knowledge.

## 🐳 Getting Started with Docker

### Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) must be installed
- A `.env` file at the root of the project (see below)

### Environment Setup

Copy the example environment file and rename it to `.env`:

```bash
cp .env.example .env

Then, fill in the required environment variables:

NODE_ENV=development
SESSION_SECRET=your-secret-value
PORT=3000
DATABASE_URL=postgresql://****:****@db:5432/****

### Start the project

To build and run the application:
```bash
docker-compose up --build

This will:

- Start the main service (Node.js app) on http://localhost:3000
- Start a PostgreSQL database on port 5432
- Automatically initialize and seed the database using init.sql and seeding.sql
