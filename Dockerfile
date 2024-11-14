# Use the official Node.js image as the base
FROM node:18

# Install Truffle globally
RUN npm install -g truffle

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install project dependencies
RUN npm install

# Specify an environment variable for the network (optional)
ENV NETWORK=development

# Expose the default ports for local Ethereum networks (Ganache 7545 and Truffle develop 8545)
EXPOSE 7545 8545

# Set the command to migrate contracts on the specified network
CMD ["truffle", "migrate", "--network", "development"]
