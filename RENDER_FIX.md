# 🔧 Fix Render Deployment Errors

## ✅ Fixed Issues

### 1. **env-cmd Error** ✅
**Fixed!** Updated `package.json` to not require `.env` file in production.

### 2. **Database Connection** ⚠️
You need to update your environment variables on Render.

### 3. **Redis Connection** ⚠️
You need to create a Redis instance or update the connection string.

---

## 🚀 Action Required: Update Environment Variables

Go to your Render web service → **Environment** tab and update these variables:

### ❌ Wrong Values (Current)
```env
DATABASE_HOST=localhost          # ❌ Wrong! This is your local machine
WORKER_HOST=redis://redis:6379/1 # ❌ Wrong! Redis doesn't exist
```

### ✅ Correct Values (Update to these)

#### Option A: If you created PostgreSQL on Render
```env
# Get these from your Render PostgreSQL dashboard
DATABASE_HOST=<your-postgres-hostname>.render.com
DATABASE_PORT=5432
DATABASE_USERNAME=<your-postgres-username>
DATABASE_PASSWORD=<your-postgres-password>
DATABASE_NAME=lap-2
DATABASE_SSL_ENABLED=true        # ✅ Change to true for Render
DATABASE_REJECT_UNAUTHORIZED=false
```

**How to find these values:**
1. Go to Render Dashboard
2. Click on your PostgreSQL database
3. Copy the **Internal Database URL** or individual connection details
4. Update environment variables

#### Option B: If you're using external PostgreSQL
Use your external database credentials.

---

### Redis Configuration

#### Option A: Create Redis on Render (Recommended)
1. Go to Render Dashboard
2. Click **"New +"** → **"Redis"**
3. Name: `my-life-office-redis`
4. Plan: **Free**
5. Click **"Create Redis"**
6. Copy the **Internal Redis URL**
7. Update environment variable:
```env
WORKER_HOST=<your-redis-internal-url>
# Example: redis://red-xxxxx:6379
```

#### Option B: Disable Redis (if not needed)
If you don't need background jobs, you can comment out or remove:
```env
# WORKER_HOST=redis://redis:6379/1
```

---

### Other Important Updates

```env
# Change these to production values
NODE_ENV=production              # ✅ Change from development
BACKEND_DOMAIN=https://your-app.onrender.com  # ✅ Your actual Render URL
FRONTEND_DOMAIN=https://your-frontend.com     # ✅ Your actual frontend URL

# SSL for production database
DATABASE_SSL_ENABLED=true        # ✅ Change to true
```

---

## 📋 Complete Environment Variables Checklist

Copy these and update with your actual values:

```env
# App Configuration
NODE_ENV=production
APP_PORT=3000
APP_NAME=NestJS API
API_PREFIX=api
APP_FALLBACK_LANGUAGE=en
APP_HEADER_LANGUAGE=x-custom-lang

# URLs (update with your actual domains)
FRONTEND_DOMAIN=https://your-frontend.com
BACKEND_DOMAIN=https://your-backend.onrender.com
FRONTEND_ADMIN_DOMAIN=https://your-admin.com
FRONTEND_CLIENT_DOMAIN=https://your-client.com
LAP_SUPPORT=staff.lifeagentportal@mailinator.com

# Database (GET FROM RENDER POSTGRESQL DASHBOARD)
DATABASE_TYPE=postgres
DATABASE_HOST=<your-postgres-host>.render.com
DATABASE_PORT=5432
DATABASE_USERNAME=<your-postgres-username>
DATABASE_PASSWORD=<your-postgres-password>
DATABASE_NAME=lap-2
DATABASE_LOGGING=false
DATABASE_SYNCHRONIZE=false
DATABASE_MAX_CONNECTIONS=100
DATABASE_SSL_ENABLED=true
DATABASE_REJECT_UNAUTHORIZED=false

# Redis (GET FROM RENDER REDIS DASHBOARD)
WORKER_HOST=<your-redis-internal-url>

# AWS S3
FILE_DRIVER=s3
AWS_S3_REGION=us-east-1
AWS_DEFAULT_S3_BUCKET=bucket.development.lifeagentportal.com
AWS_ACCESS_KEY_ID=AKIAQJ2HVVJTFWACOYDS
AWS_SECRET_ACCESS_KEY=p1HA0f9trifAIz1+TuVsZuDZWepjR4vbKpL/6SW6

# Email (Gmail)
MAIL_SERVICE=gmail
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=mhussnainrg@gmail.com
MAIL_PASSWORD=pwyf qkei hozs bmxi
MAIL_DEFAULT_EMAIL=mhussnainrg@gmail.com
MAIL_DEFAULT_NAME=My Life Office CRM
MAIL_IGNORE_TLS=false
MAIL_SECURE=false
MAIL_REQUIRE_TLS=true
MAIL_SUPPORT_ADDRESS=mhussnainrg@gmail.com

# JWT Secrets
AUTH_JWT_SECRET=secret
AUTH_JWT_TOKEN_EXPIRES_IN=10h
AUTH_REFRESH_SECRET=secret_for_refresh
AUTH_REFRESH_TOKEN_EXPIRES_IN=3650d
AUTH_FORGOT_SECRET=secret_for_forgot
AUTH_FORGOT_TOKEN_EXPIRES_IN=30m
AUTH_CONFIRM_EMAIL_SECRET=secret_for_confirm_email
AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN=1d

# Google OAuth
GOOGLE_CLIENT_ID=9623213149728-i2np8rcvq7ru17q0f1qd6d4e48v3jfrr.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=ASDSADA-tFbWGkgU7Pa8xkf5UlWeSvu3qWeL

# Stripe
STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_WEBHOOK_SECRET_KEY=<your-stripe-webhook-secret>
STRIPE_API_VERSION=2023-10-16
STRIPE_OTHER_FEES_PERCENT=3

# File Upload
FILE_MAX_SIZE=1073741824

# Admin User
ADMIN_PASSWORD=secret
ADMIN_FIRSTNAME=Super
ADMIN_LASTNAME=Admin
ADMIN_EMAIL=admin@example.com
CLIENT_PASSWORD=secret
CLIENT_FIRSTNAME=John
CLIENT_LASTNAME=Doe
CLIENT_EMAIL=john.doe@example.com

# Sentry
SENTRY_DSN=https://c5f1212d846e@o4508949929787392.ingest.us.sentry.io/4508949960589312

# Firebase (Optional)
# FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
```

---

## 🎯 Step-by-Step Fix

### Step 1: Push the Code Fix
```bash
git add package.json
git commit -m "Fix: Remove env-cmd requirement for production migrations"
git push origin main
```

### Step 2: Create PostgreSQL Database (if not done)
1. Render Dashboard → **"New +"** → **"PostgreSQL"**
2. Name: `my-life-office-db`
3. Database: `lap-2`
4. Plan: **Free**
5. Click **"Create Database"**
6. **Copy the connection details**

### Step 3: Create Redis (Optional but recommended)
1. Render Dashboard → **"New +"** → **"Redis"**
2. Name: `my-life-office-redis`
3. Plan: **Free**
4. Click **"Create Redis"**
5. **Copy the Internal Redis URL**

### Step 4: Update Environment Variables
1. Go to your web service
2. Click **"Environment"** tab
3. Update these variables:
   - `DATABASE_HOST` → Your Render PostgreSQL host
   - `DATABASE_USERNAME` → Your PostgreSQL username
   - `DATABASE_PASSWORD` → Your PostgreSQL password
   - `DATABASE_SSL_ENABLED` → `true`
   - `WORKER_HOST` → Your Redis URL
   - `NODE_ENV` → `production`
   - `BACKEND_DOMAIN` → Your Render app URL

### Step 5: Redeploy
1. Click **"Manual Deploy"** → **"Deploy latest commit"**
2. Watch the logs
3. Should see: ✅ Migrations run successfully

---

## 🐛 Troubleshooting

### Still getting env-cmd error?
- Make sure you pushed the package.json changes
- Trigger a new deploy after pushing

### Database connection failed?
- Verify DATABASE_HOST is the Render PostgreSQL hostname
- Check DATABASE_SSL_ENABLED=true
- Verify database is in "Available" status

### Redis connection failed?
- Create Redis instance on Render
- Or comment out WORKER_HOST if not needed

---

## ✅ Success Indicators

You'll know it's working when you see in the logs:
```
✅ query: SELECT * FROM "migrations"
✅ 0 migrations are already loaded in the database.
✅ No migrations are pending
✅ Running Port: 10000
```

---

**Need help?** Let me know which step you're stuck on!
