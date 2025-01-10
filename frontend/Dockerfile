# Step 1: Build the Svelte app using Node.js
FROM node:16 AS builder

WORKDIR /app

# Copy all files to the working directory
COPY . .

# Install dependencies and build the app
RUN npm install && npm run build

# Step 2: Serve the built files using Nginx
FROM nginx:alpine

# Copy the built files from the builder stage to Nginx's default HTML folder
COPY --from=builder /app/public /usr/share/nginx/html

# Copy a custom Nginx configuration file to respect the PORT environment variable
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the Cloud Run port
EXPOSE 8080

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
