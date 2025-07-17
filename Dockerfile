# Use the official Node.js image as the base image
FROM node:20-alpine

# Create a non-root user
# -S means create a system user/group
# addgroup - Alpine Linux command to create a new group
# -g 1001 - Sets the Group ID (GID) to 1001
# Why 1001? It's a common practice to use UIDs/GIDs above 1000 to avoid conflicts with system users (which typically use 0-999)
# This ensures consistency across different container instances
# -S - Creates a system group (not a regular user group)
# System groups are intended for system services and daemons
# They don't have login capabilities or home directories
# nodejs - The name of the group being created
# -G nodejs assigns the user to the nodejs group as their primary group
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001 -G nodejs

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Change ownership of the app directory to the nestjs user
RUN chown -R nestjs:nodejs /usr/src/app

# Switch to the non-root user
USER nestjs

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
