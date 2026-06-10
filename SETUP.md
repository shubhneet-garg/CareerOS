# CareerOS - Setup Guide

## Prerequisites

- Node.js 18+ (LTS recommended)
- Docker & Docker Compose
- Git
- npm or yarn

## Local Development Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/shubhneet-garg/CareerOS.git
cd CareerOS
```

### Step 2: Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- Google OAuth credentials
- Gemini API key
- Cloudinary credentials
- SendGrid API key

### Step 3: Install Dependencies

```bash
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

### Step 4: Start Services with Docker

```bash
docker-compose up -d
```

This starts:
- MongoDB (port 27017)
- Redis (port 6379)
- Backend API (port 3000)
- Frontend (port 5173)

### Step 5: Verify Setup

```bash
# Check services
docker-compose ps

# View logs
docker-compose logs -f

# Test backend
curl http://localhost:3000/api/v1/health

# Test frontend
open http://localhost:5173
```

## Development Workflow

### Backend Development

```bash
cd backend

# Start development server
npm run dev

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

### Frontend Development

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

## Database Setup

### Initialize MongoDB

```bash
# Connect to MongoDB
mongosh mongodb://admin:password@localhost:27017/careeros?authSource=admin

# Or use the Docker container
docker exec -it careeros-mongo mongosh mongodb://admin:password@localhost:27017/careeros?authSource=admin
```

### Create Indexes

```bash
cd backend
npm run db:migrate
```

## API Documentation

Once the backend is running:

```
http://localhost:3000/api/docs
```

Swagger UI will display all available endpoints.

## Testing

### Run All Tests

```bash
# Backend
cd backend && npm run test

# Frontend
cd frontend && npm run test
```

### Generate Coverage Reports

```bash
# Backend
cd backend && npm run test:coverage

# Frontend
cd frontend && npm run test:coverage
```

## Troubleshooting

### MongoDB Connection Issues

```bash
# Check MongoDB is running
docker ps | grep mongo

# View MongoDB logs
docker logs careeros-mongo

# Restart MongoDB
docker restart careeros-mongo
```

### Redis Connection Issues

```bash
# Check Redis is running
docker ps | grep redis

# Test Redis connection
docker exec careeros-redis redis-cli ping
```

### Port Already in Use

```bash
# Find process using port
lsof -i :3000  # Backend
lsof -i :5173  # Frontend
lsof -i :27017 # MongoDB
lsof -i :6379  # Redis

# Kill process
kill -9 <PID>
```

### Clear Docker Containers

```bash
# Remove all containers
docker-compose down -v

# Rebuild from scratch
docker-compose up -d --build
```

## Useful Commands

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Execute command in container
docker exec careeros-backend npm run db:migrate

# Stop all services
docker-compose stop

# Start services
docker-compose start

# Rebuild services
docker-compose up -d --build
```

## Production Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for production deployment instructions.

## Security

See [docs/SECURITY.md](docs/SECURITY.md) for security best practices and hardening guide.
