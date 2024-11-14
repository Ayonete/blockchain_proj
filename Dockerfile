FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install dependencies
RUN npm ci

# Build the Truffle project
RUN npm run build

# Run the Truffle development server
CMD ["npm", "run", "start"]