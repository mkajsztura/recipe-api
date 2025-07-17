# ====================================
# STAGE 1: Build Environment
# ====================================
# This stage contains all the build tools, source code, and dependencies needed to compile the application
# It's larger but gets discarded after the build is complete
FROM node:20-alpine AS builder

# Set the working directory for the build stage
WORKDIR /app

# Copy package.json and package-lock.json first (before source code)
# This allows Docker to cache the dependency installation layer
# If source code changes but dependencies don't, Docker can reuse this layer
COPY package*.json ./

# Install ALL dependencies (including devDependencies needed for building)
# npm ci is faster and more reliable than npm install for production builds
# It installs directly from package-lock.json and is designed for CI/CD environments
# && npm cache clean --force - immediately clean npm cache to reduce layer size
RUN npm ci && npm cache clean --force

# Copy the rest of the application source code
# This happens after dependency installation to leverage Docker layer caching
COPY . .

# Build the NestJS application
# This compiles TypeScript to JavaScript and creates the dist/ directory
RUN npm run build

# ====================================
# STAGE 2: Production Environment
# ====================================
# This stage creates the final, optimized image that will run in production
# It only contains runtime dependencies and the compiled application
FROM node:20-alpine AS production

# Create a non-root user for security
# -S means create a system user/group
# addgroup - Alpine Linux command to create a new group
# -g 1001 - Sets the Group ID (GID) to 1001
# Why 1001? It's a common practice to use UIDs/GIDs above 1000 to avoid conflicts with system users (which typically use 0-999)
# This ensures consistency across different container instances
# -S - Creates a system group (not a regular user group)
# System groups are intended for system services and daemons
# They don't have login capabilities or home directories
# nodejs - The name of the group being created
RUN addgroup -g 1001 -S nodejs

# Create the nestjs user
# -S - Creates a system user (not a regular user)
# -u 1001 - Sets the User ID (UID) to 1001
# -G nodejs - Assigns the user to the nodejs group as their primary group
RUN adduser -S nestjs -u 1001 -G nodejs

# Set the working directory for the production stage
WORKDIR /app

# Copy only the built application from the builder stage
# --from=builder - copies from the previous build stage
# --chown=nestjs:nodejs - sets the correct ownership immediately
# This is more efficient than copying and then changing ownership
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Copy production dependencies from the builder stage
# We need node_modules for runtime dependencies
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules

# Copy package.json for metadata (version info, etc.)
COPY --chown=nestjs:nodejs package*.json ./

# Switch to the non-root user before running the application
# This is a security best practice - never run applications as root in containers
USER nestjs

# Expose the application port
# This is mainly for documentation - it tells other developers which port the app uses
# The actual port mapping happens when running the container (docker run -p)
EXPOSE 3000

# Command to run the application
# We run the compiled JavaScript directly, not through npm
# This is more efficient and doesn't require npm in the production image
CMD ["node", "dist/main"]
