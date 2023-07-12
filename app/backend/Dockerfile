FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose the port that your NestJS application listens on (e.g., 3000)
EXPOSE 8000

# Start the application
CMD ["npm", "run", "start"]