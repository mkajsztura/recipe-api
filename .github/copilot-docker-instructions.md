# Docker Best Practices for Recipe API

## Security
- Always run containers as non-root user
- Use specific user/group IDs (e.g., 1001) for consistency
- Create system users with `-S` flag for service applications
- Use multi-stage builds to reduce attack surface
- Scan images for vulnerabilities before deployment
- Use official base images from trusted sources

## Image Optimization
- Use Alpine Linux for smaller image sizes
- Leverage Docker layer caching effectively
- Use .dockerignore to exclude unnecessary files
- Clean up package managers cache after installations
- Use multi-stage builds to separate build and runtime dependencies

## Performance
- Copy package.json before source code for better cache utilization
- Install dependencies before copying application code
- Use specific versions for base images (avoid 'latest' tag)
- Minimize the number of layers
- Use COPY instead of ADD unless specific ADD features are needed

## Maintainability
- Use meaningful labels and metadata
- Document Dockerfile steps with comments
- Use build arguments for configurable values
- Follow consistent naming conventions
- Keep Dockerfiles simple and readable
- Use health checks for production containers

## Development Workflow
- Use docker-compose for local development
- Implement proper logging to stdout/stderr
- Use environment variables for configuration
- Mount volumes for development hot-reloading
- Separate development and production configurations

## Common Patterns for NestJS
- Use node:alpine as base image
- Create non-root user with UID 1001
- Install dependencies before copying source
- Build application after all files are copied
- Use proper file ownership with chown
- Switch to non-root user before running app
