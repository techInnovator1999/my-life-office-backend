# 🚀 Render Deployment Guide

## ✅ Fixed Build Error

The build error with `fcmtoken.json` has been fixed! The app now:
- ✅ Loads Firebase credentials from environment variable in production
- ✅ Falls back to local file in development
- ✅ Gracefully disables notifications if Firebase is not configured

## 📋 Deployment Steps on Render

### 1. Create PostgreSQL Database

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `my-life-office-db`
   - **Database**: `my_life_office`
   - **Region**: Choose closest to you (e.g., Oregon)
   - **Plan**: **Free**
4. Click **"Create Database"**
5. **Save these details** (you'll need them):
   - Internal Database URL
   - Or individual: Host, Port, Database, Username, Password

### 2. Create Redis Instance (Optional but recommended)

1. Click **"New +"** → **"Redis"**
2. Configure:
   - **Name**: `my-life-office-redis`
   - **Region**: Same as database
   - **Plan**: **Free**
3. Click **"Create Redis"**
4. **Save the Redis URL**

### 3. Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `my-life-office-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Environment**: **Docker**
   - **Dockerfile Path**: `./Dockerfile.staging` or `./Dockerfile`
   - **Plan**: **Free**

### 4. Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

#### Required Database Variables
```env
NODE_ENV=production
DATABASE_TYPE=postgres
DATABASE_HOST=<from PostgreSQL internal host>
DATABASE_PORT=5432
DATABASE_USERNAME=<from PostgreSQL>
DATABASE_PASSWORD=<from PostgreSQL>
DATABASE_NAME=my_life_office
DATABASE_LOGGING=false
DATABASE_SYNCHRONIZE=false
DATABASE_MAX_CONNECTIONS=100
DATABASE_SSL_ENABLED=true
DATABASE_REJECT_UNAUTHORIZED=false
```

#### Required App Variables
```env
APP_NAME=Life Agent Portal API
API_PREFIX=api
APP_FALLBACK_LANGUAGE=en
APP_HEADER_LANGUAGE=x-custom-lang
FRONTEND_DOMAIN=https://your-frontend.com
BACKEND_DOMAIN=https://your-backend.onrender.com
```

#### Required JWT Secrets (Generate random strings)
```env
AUTH_JWT_SECRET=<generate-random-string-here>
AUTH_JWT_TOKEN_EXPIRES_IN=15m
AUTH_REFRESH_SECRET=<generate-random-string-here>
AUTH_REFRESH_TOKEN_EXPIRES_IN=7d
AUTH_FORGOT_SECRET=<generate-random-string-here>
AUTH_FORGOT_TOKEN_EXPIRES_IN=1h
AUTH_CONFIRM_EMAIL_SECRET=<generate-random-string-here>
AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN=1d
```

#### AWS S3 (Required for file uploads)
```env
FILE_DRIVER=s3
AWS_S3_REGION=us-west-1
AWS_DEFAULT_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

#### Email (SendGrid)
```env
MAIL_SERVICE=SendGrid
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USER=apikey
MAIL_PASSWORD=your-sendgrid-api-key
MAIL_DEFAULT_EMAIL=noreply@yourdomain.com
MAIL_DEFAULT_NAME=Life Agent Portal
MAIL_IGNORE_TLS=false
MAIL_SECURE=false
MAIL_REQUIRE_TLS=true
```

#### Stripe
```env
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET_KEY=whsec_...
STRIPE_API_VERSION=2023-10-16
```

#### Redis (if you created Redis instance)
```env
WORKER_HOST=<your-redis-url-from-step-2>
```

#### Admin User (for seeding)
```env
ADMIN_PASSWORD=your-secure-password
ADMIN_EMAIL=admin@example.com
ADMIN_FIRSTNAME=Super
ADMIN_LASTNAME=Admin
```

#### Firebase (Optional - for push notifications)
```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"...","private_key":"..."}
```
*Note: This should be the entire JSON content from your Firebase service account file as a single line*

#### File Upload
```env
FILE_MAX_SIZE=1073741824
```

#### Sentry (Optional)
```env
SENTRY_DSN=your-sentry-dsn
```

### 5. Deploy

1. Click **"Create Web Service"**
2. Render will start building your app
3. Watch the logs for any errors
4. Once deployed, you'll get a URL like: `https://my-life-office-backend.onrender.com`

## 🧪 Testing Your Deployment

1. **API Docs**: Visit `https://your-app.onrender.com/docs`
2. **Health Check**: Visit `https://your-app.onrender.com/`
3. **Check Logs**: Look for "Running Port: 10000" message

## 🔧 Important Notes

### Port Configuration
✅ Your app automatically uses Render's `PORT` environment variable (configured in `src/config/app.config.ts`)

### Database Migrations
✅ Migrations run automatically on startup via `start-prod-server` script

### Firebase Notifications
- If you don't set `FIREBASE_SERVICE_ACCOUNT`, notifications will be disabled (app will still work)
- To enable, get your Firebase service account JSON and set it as environment variable

### Free Tier Limitations
- **Web Service**: Spins down after 15 min inactivity (~30s cold start)
- **PostgreSQL**: Free for 90 days, then $7/month
- **Redis**: Free for 90 days, then $5/month

## 🐛 Troubleshooting

### Build Still Fails?
1. Check you pushed the latest code with FCM fix
2. Verify Dockerfile path is correct
3. Check build logs for specific errors

### Database Connection Issues?
1. Verify all DATABASE_* environment variables are set
2. Ensure `DATABASE_SSL_ENABLED=true`
3. Check database status is "Available"

### App Crashes on Startup?
1. Check logs for missing environment variables
2. Verify migration errors
3. Ensure all required env vars are set

## 🎉 Next Steps

After successful deployment:
1. ✅ Test all API endpoints
2. ✅ Set up custom domain (optional)
3. ✅ Configure Stripe webhooks with your Render URL
4. ✅ Set up monitoring
5. ✅ Configure database backups

---

**Need help?** Check Render docs: https://render.com/docs
