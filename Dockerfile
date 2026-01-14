FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Build Next.js
RUN npm run build

# Expose ports
EXPOSE 3000 5000

# Start both servers
CMD ["sh", "-c", "node server/index.js & npm start"]
