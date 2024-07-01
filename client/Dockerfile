# Use the official Node.js image
FROM node:16

# Create and change to the app directory
WORKDIR /app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Run the web service on container startup
CMD [ "npm", "run", "dev" ]
