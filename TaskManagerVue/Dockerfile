# Dockerfile for Vue CLI

# Use the node image from official Docker Hub
FROM node:14 as build-stage
# set the working directory
WORKDIR /app/TaskManagerVue
# Copy the rest of the project files to the container
COPY ./TaskManagerVue /app/TaskManagerVue
# Install the project dependencies
RUN npm install
# Build the Vue.js application to the production mode to dist folder
RUN npm run build
# Use the lightweight Nginx image from the previous stage for the nginx container
FROM nginx:latest as production-stage
# Copy the build application from the previous stage to the Nginx container
COPY --from=build-stage /app/TaskManagerVue/dist/ /usr/share/nginx/html/
# Copy the nginx configuration file
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
# Expose the port 8080
EXPOSE 8080
