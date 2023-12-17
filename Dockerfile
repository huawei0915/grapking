# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM --platform=linux/amd64 node:16.13-bullseye-slim as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY ./ /app

# Install all the dependencies
RUN ls -alF /app ; \

    npm config set strict-ssl false ; \
    npm config set audit false ; \

    npm install --force --verbose ; \
    npm run sit ; \
    ls -alF /app
# Stage 2: Serve app with nginx server

FROM --platform=linux/amd64 bitnami/nginx:1.24

USER root
ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# USER 1001
WORKDIR /app

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/grapKing  /app
