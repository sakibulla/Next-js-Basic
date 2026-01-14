FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Copy production environment file
COPY .env.production .env.local

# Build Next.js
RUN npm run build

# Expose ports
EXPOSE 8080 5000

# Start both servers
CMD ["sh", "-c", "API_PORT=5000 node server/index.js & npm start"]
