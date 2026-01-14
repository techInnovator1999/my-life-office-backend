# 🏠 Running the Project Locally

You have **2 options** to run this project locally:

## Option 1: Without Docker (Recommended for Development) ✅

This is the **easiest and fastest** way to run locally.

### Prerequisites
- Node.js 22+ (check with `node -v`)
- PostgreSQL running locally
- Redis running locally (optional but recommended)

### Steps

#### 1. Install PostgreSQL & Redis (if not installed)

**macOS (using Homebrew):**
```bash
# Install PostgreSQL
brew install postgresql@14
brew services start postgresql@14

# Install Redis
brew install redis
brew services start redis
```

#### 2. Create Database
```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE my_life_office;

# Create user (optional)
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE my_life_office TO myuser;

# Exit
\q
```

#### 3. Set Up Environment Variables
```bash
# Copy example env file
cp .env.example .env

# Edit .env file with your values
nano .env
```

**Minimum required values in `.env`:**
```env
NODE_ENV=development
APP_PORT=3000
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
DATABASE_NAME=my_life_office
DATABASE_LOGGING=true
DATABASE_SYNCHRONIZE=false
DATABASE_SSL_ENABLED=false

# Redis
WORKER_HOST=redis://localhost:6379/1

# JWT Secrets (can be anything for local dev)
AUTH_JWT_SECRET=local-jwt-secret-key
AUTH_REFRESH_SECRET=local-refresh-secret-key
AUTH_FORGOT_SECRET=local-forgot-secret-key
AUTH_CONFIRM_EMAIL_SECRET=local-confirm-email-secret-key

# Admin user
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@example.com

# File storage (use local for development)
FILE_DRIVER=local

# Other required fields
FRONTEND_DOMAIN=http://localhost:3001
BACKEND_DOMAIN=http://localhost:3000
API_PREFIX=api
APP_FALLBACK_LANGUAGE=en
APP_HEADER_LANGUAGE=x-custom-lang
```

#### 4. Install Dependencies
```bash
npm install
```

#### 5. Run Migrations & Seed Database
```bash
# Run migrations
npm run migration:run

# Seed database with initial data
npm run seed:run:relational
```

#### 6. Start Development Server
```bash
npm run start:dev
```

Or use the combined script:
```bash
npm run start-dev-server
```
This will: install deps → run migrations → seed database → start server

#### 7. Access the Application
- **API**: http://localhost:3000
- **API Docs**: http://localhost:3000/docs
- **Health Check**: http://localhost:3000/

---

## Option 2: With Docker Compose 🐳

Use this if you want everything containerized.

### Prerequisites
- Docker Desktop installed and running

### Steps

#### 1. Set Up Environment Variables
```bash
# Copy example env file
cp .env.example .env

# Edit .env file
nano .env
```

**For Docker, use these database settings:**
```env
NODE_ENV=development
APP_PORT=3000
DATABASE_TYPE=postgres
DATABASE_HOST=host.docker.internal  # Important for Docker!
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=my_life_office
DATABASE_SSL_ENABLED=false

WORKER_HOST=redis://host.docker.internal:6379/1

# ... rest of your env vars
```

#### 2. Make Sure PostgreSQL & Redis Are Running Locally
```bash
# Start PostgreSQL
brew services start postgresql@14

# Start Redis
brew services start redis
```

#### 3. Run with Docker Compose
```bash
# Using the existing docker-compose file
docker compose -f docker-compose.local.yml up

# Or rebuild if you made changes
docker compose -f docker-compose.local.yml up --build

# Run in background
docker compose -f docker-compose.local.yml up -d
```

#### 4. Stop Docker Compose
```bash
docker compose -f docker-compose.local.yml down
```

**Note:** The `docker-compose.local.yml` expects PostgreSQL and Redis to be running on your **host machine** (not in Docker). It connects via `host.docker.internal`.

---

## Option 3: Full Docker Setup (Everything in Containers)

If you want PostgreSQL and Redis **also in Docker**, create a new docker-compose file:

```bash
# I can create a full docker-compose.yml for you if you want!
```

---

## 🎯 Which Option Should You Choose?

### Choose **Option 1 (No Docker)** if:
- ✅ You want **fast development** with hot reload
- ✅ You want to **debug easily**
- ✅ You already have PostgreSQL/Redis installed
- ✅ You want to use your IDE's debugging tools

### Choose **Option 2 (Docker Compose)** if:
- ✅ You want **consistent environment**
- ✅ You want to **isolate the app**
- ✅ You're testing Docker builds

---

## 🛠️ Useful Commands

### Database Commands
```bash
# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Generate new migration
npm run migration:generate src/database/migrations/MigrationName

# Seed database
npm run seed:run:relational

# Create admin user
npm run create:admin
```

### Development Commands
```bash
# Start dev server (with hot reload)
npm run start:dev

# Start with SWC (faster compilation)
npm run start:swc

# Start with debugging
npm run start:debug

# Build for production
npm run build

# Run production build locally
npm run start:prod
```

### Testing
```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Run e2e tests
npm run test:e2e

# Generate coverage
npm run test:cov
```

### Code Quality
```bash
# Lint code
npm run lint

# Fix lint issues
npm run lint:fix

# Format code
npm run format
```

---

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check PostgreSQL is running: `brew services list`
- Check database exists: `psql -l`
- Verify DATABASE_HOST in .env (use `localhost` for local, `host.docker.internal` for Docker)

### "Redis connection failed"
- Check Redis is running: `brew services list`
- Start Redis: `brew services start redis`
- Test connection: `redis-cli ping` (should return "PONG")

### "Migration failed"
- Drop database and recreate: `npm run schema:drop` (⚠️ deletes all data!)
- Or manually: `psql -d my_life_office -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"`

### Port already in use
- Change APP_PORT in .env
- Or kill process: `lsof -ti:3000 | xargs kill -9`

---

## 📖 Summary

**Quickest way to run locally:**
```bash
# 1. Set up .env file
cp .env.example .env
# Edit .env with your local database credentials

# 2. Install and run
npm run start-dev-server
```

**That's it!** 🎉

The `start-dev-server` script does everything: installs dependencies, runs migrations, seeds database, and starts the server.
