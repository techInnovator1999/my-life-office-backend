# 🚀 Quick Start - Local Development

## Fastest Way (No Docker) ✅

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Edit .env with your local database credentials
# Set DATABASE_HOST=localhost, DATABASE_PASSWORD=your-password, etc.

# 3. Make sure PostgreSQL is running
brew services start postgresql@14

# 4. Make sure Redis is running (optional)
brew services start redis

# 5. Run everything (installs deps, runs migrations, seeds DB, starts server)
npm run start-dev-server
```

**Done!** 🎉 Your app is running at http://localhost:3000

---

## With Docker Compose 🐳

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Edit .env - set DATABASE_HOST=host.docker.internal

# 3. Make sure PostgreSQL & Redis are running locally
brew services start postgresql@14
brew services start redis

# 4. Run with Docker
docker compose -f docker-compose.local.yml up
```

---

## First Time Setup Only

### Install PostgreSQL & Redis (macOS)
```bash
brew install postgresql@14 redis
brew services start postgresql@14
brew services start redis
```

### Create Database
```bash
psql postgres -c "CREATE DATABASE my_life_office;"
```

---

## Useful Commands

```bash
# Start dev server (hot reload)
npm run start:dev

# Run migrations
npm run migration:run

# Seed database
npm run seed:run:relational

# Create admin user
npm run create:admin

# View API docs
open http://localhost:3000/docs
```

---

## 📖 Full Guide

See **`LOCAL_DEVELOPMENT.md`** for detailed instructions and troubleshooting.
