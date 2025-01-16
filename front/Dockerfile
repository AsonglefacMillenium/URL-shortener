# Stage 1: Build the application
FROM node:18 AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application
FROM node:18

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app ./

# Expose port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
