# SpaceGen Backend - Deployment Guide

Complete guide to deploy the Express.js backend server to production.

## Deployment Options

### Option 1: Render (Recommended - Free Tier Available)

#### Step 1: Prepare Repository
```bash
# Create a new GitHub repository for the server
# Push the /server folder to this repository
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/yourusername/spacegen-backend.git
git push -u origin main
```

#### Step 2: Connect to Render
1. Go to https://render.com
2. Click "New+" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: spacegen-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

#### Step 3: Set Environment Variables
In Render dashboard, go to "Environment":
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/spacegen
JWT_SECRET=generate-strong-secret-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-from-default
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

#### Step 4: Deploy
Click "Create Web Service" - Render will auto-deploy!

Your backend URL: `https://spacegen-backend.onrender.com`

---

### Option 2: Heroku

#### Step 1: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

#### Step 2: Create App
```bash
heroku create spacegen-backend
```

#### Step 3: Set Config Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your-secret
heroku config:set ADMIN_USERNAME=admin
heroku config:set ADMIN_PASSWORD=change-this
heroku config:set CORS_ORIGIN=https://yourdomain.com
```

#### Step 4: Deploy
```bash
git push heroku main
```

---

### Option 3: Railway.app

1. Go to https://railway.app
2. Create new project
3. Connect GitHub repository
4. Set environment variables
5. Deploy!

---

## MongoDB Atlas Setup (Cloud Database)

### Step 1: Create Account
1. Go to https://mongodb.com/cloud/atlas
2. Sign up with GitHub or email
3. Create organization and project

### Step 2: Create Cluster
1. Click "Create Deployment"
2. Select "M0 Shared" (Free tier)
3. Select region (India - ap-south-1)
4. Click "Create Deployment"

### Step 3: Security Setup
1. Go to "Database Access"
2. Add user:
   - Username: `spacegen_admin`
   - Password: Generate strong password
   - Role: `Atlas admin`
3. Go to "Network Access"
4. Add IP Address:
   - Click "Add Current IP" OR
   - Enter `0.0.0.0/0` (Allow all - for development)

### Step 4: Get Connection String
1. Click "Databases"
2. Click "Connect"
3. Choose "Node.js"
4. Copy connection string:
   ```
   mongodb+srv://spacegen_admin:password@cluster.mongodb.net/spacegen?retryWrites=true&w=majority
   ```
5. Replace `password` with your password
6. Use this as `MONGODB_URI`

---

## Frontend Integration

### Update Frontend Environment
In `/vercel/share/v0-project/.env.local`:
```
NEXT_PUBLIC_API_URL=https://spacegen-backend.onrender.com
```

### Update API Calls
In components using the API:
```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enquiries`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

---

## Testing Production Server

### Health Check
```bash
curl https://spacegen-backend.onrender.com/api/health
```

### Test Enquiry Submission
```bash
curl -X POST https://spacegen-backend.onrender.com/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+919842158350",
    "school": "Test School",
    "grade": "10th",
    "programLevel": "Level 1"
  }'
```

### Test Admin Login
```bash
curl -X POST https://spacegen-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "spacegen@2026"
  }'
```

---

## Security Checklist

Before going to production:
- [ ] Change default admin password
- [ ] Generate new JWT_SECRET (min 32 chars)
- [ ] Set NODE_ENV=production
- [ ] Use strong MongoDB password
- [ ] Enable MongoDB IP whitelist
- [ ] Configure CORS_ORIGIN correctly
- [ ] Use HTTPS (auto on Render/Heroku)
- [ ] Remove sensitive data from code
- [ ] Test all endpoints thoroughly
- [ ] Monitor error logs

---

## Troubleshooting

### "MongoDB Connection Failed"
- Check MONGODB_URI is correct
- Verify IP whitelist includes server IP
- Check username/password

### "CORS Error"
- Update CORS_ORIGIN in environment
- Include full URL with protocol
- Separate multiple origins with comma

### "JWT Authentication Failed"
- Verify JWT_SECRET matches frontend
- Check token expiration
- Ensure token is in Authorization header

### "Rate Limit Exceeded"
- Implement rate limiting in production
- Add caching for frequent requests
- Use CDN for static assets

---

## Monitoring & Logs

### Render Logs
1. Go to Render Dashboard
2. Select your service
3. Click "Logs" tab

### Heroku Logs
```bash
heroku logs --tail
```

### Check Real-time Issues
```bash
# Get recent logs
heroku logs -n 100

# Tail logs in real-time
heroku logs -f
```

---

## Custom Domain Setup

### With Render
1. Go to "Settings"
2. Add custom domain
3. Update DNS records to Render nameservers

### With Vercel Frontend
1. Go to Vercel project settings
2. Add custom domain
3. Follow DNS setup instructions

---

## Performance Optimization

### Enable Caching
```javascript
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});
```

### Enable Compression
```bash
npm install compression
```

```javascript
import compression from 'compression';
app.use(compression());
```

### Database Indexing
Already included in models (email, status, createdAt)

---

## Backup & Recovery

### MongoDB Atlas Backups
1. Go to "Backup" tab
2. Enable automatic daily backups
3. Snapshots stored 7-35 days (depending on tier)

### Manual Backup
```bash
# Export database
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/spacegen"

# Import database
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net/spacegen" dump/
```

---

## Estimated Costs

| Service | Free Tier | Paid |
|---------|-----------|------|
| Render | ✅ 750 hrs/mo | $7/month |
| MongoDB Atlas | ✅ 512MB | $57/month |
| Domain | - | ₹500-1,500/year |
| **Total** | **$0/month** | **~$70/month** |

---

## Next Steps

1. Deploy backend to Render/Heroku
2. Set up MongoDB Atlas
3. Update frontend .env.local
4. Test all endpoints
5. Monitor logs
6. Go live!

---

**Last Updated**: Feb 2026 | **Version**: 1.0.0
