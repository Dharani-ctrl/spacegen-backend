# SpaceGen Aviation - Backend Server

Express.js backend API server for SpaceGen Aviation website with MongoDB integration, JWT authentication, and email notifications.

## Project Structure

```
server/
├── config/              # Configuration files
│   └── database.js      # MongoDB connection
├── controllers/         # Business logic
│   ├── enquiryController.js
│   └── authController.js
├── middleware/          # Express middleware
│   ├── auth.js         # JWT authentication
│   └── errorHandler.js # Error handling
├── models/             # MongoDB schemas
│   ├── Enquiry.js
│   └── Admin.js
├── routes/             # API routes
│   ├── enquiries.js
│   └── auth.js
├── utils/              # Utility functions
│   └── validators.js
├── server.js           # Main entry point
├── package.json
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Installation

### 1. Prerequisites
- Node.js 18+
- MongoDB (Atlas or local)

### 2. Setup
```bash
cd server
npm install
cp .env.example .env
```

### 3. Configure Environment
Edit `.env` with your values:
```properties
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/spacegen
JWT_SECRET=your-secret-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=spacegen@2024
```

### 4. Run Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Public Endpoints

**Submit Enquiry**
```bash
POST /api/enquiries
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+919842158350",
  "school": "St. Mary School",
  "grade": "10th",
  "programLevel": "Level 1",
  "message": "Interested in aviation"
}
```

### Admin Endpoints (Requires Authentication)

**Login**
```bash
POST /api/auth/login

{
  "username": "admin",
  "password": "spacegen@2024"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "...",
    "username": "admin",
    "role": "admin"
  }
}
```

**Get All Enquiries**
```bash
GET /api/enquiries?status=new&page=1&limit=10
Authorization: Bearer <token>
```

**Get Single Enquiry**
```bash
GET /api/enquiries/:id
Authorization: Bearer <token>
```

**Update Enquiry**
```bash
PATCH /api/enquiries/:id
Authorization: Bearer <token>

{
  "status": "contacted",
  "notes": "Called student",
  "followUpDate": "2024-03-01"
}
```

**Delete Enquiry**
```bash
DELETE /api/enquiries/:id
Authorization: Bearer <token>
```

## Database Models

### Enquiry Schema
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  school: String,
  grade: Enum ['4th' - '12th'],
  programLevel: Enum ['Level 1', 'Level 2', 'Undecided'],
  message: String,
  status: Enum ['new', 'reviewed', 'contacted', 'enrolled', 'rejected'],
  notes: String,
  followUpDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Admin Schema
```javascript
{
  username: String (unique),
  password: String (hashed),
  email: String,
  role: Enum ['admin', 'manager'],
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development, production |
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb+srv://... |
| `JWT_SECRET` | Secret for JWT tokens | your-secret-key |
| `ADMIN_USERNAME` | Default admin username | admin |
| `ADMIN_PASSWORD` | Default admin password | spacegen@2024 |
| `CORS_ORIGIN` | Allowed origins | http://localhost:3000 |

## Development

### Starting Fresh
```bash
npm run dev
```

### With Nodemon (Auto-reload)
```bash
npm install -g nodemon
npm run dev
```

### Testing Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Create enquiry
curl -X POST http://localhost:5000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@test.com",
    "phone": "+919842158350",
    "school": "Test School",
    "grade": "10th",
    "programLevel": "Level 1"
  }'
```

## Security Best Practices

- Change default admin password immediately
- Use strong JWT_SECRET (min 32 characters)
- Enable HTTPS in production
- Use environment variables for sensitive data
- Implement rate limiting
- Validate all inputs
- Use CORS appropriately

## Deployment

### Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy!

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create spacegen-backend

# Set environment variables
heroku config:set MONGODB_URI=...
heroku config:set JWT_SECRET=...

# Deploy
git push heroku main
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check MONGODB_URI in .env |
| Authentication error | Verify JWT_SECRET is set |
| CORS error | Check CORS_ORIGIN in .env |
| Port already in use | Change PORT in .env |

## Support & Documentation

- [Express.js Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Mongoose Docs](https://mongoosejs.com)
- [JWT Guide](https://jwt.io)

---

**Version**: 1.0.0 | **Last Updated**: Feb 2026
