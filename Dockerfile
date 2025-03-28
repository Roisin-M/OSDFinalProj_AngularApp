# Stage 1: Build the Angular app
FROM node:21-alpine3.18 AS build

EXPOSE 80
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration production

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy built Angular files to Nginx's default public directory
COPY --from=build /app/dist/yoga-management-fronend/browser /usr/share/nginx/html

# nginx config 
# COPY nginx.conf /etc/nginx/conf.d/default.conf
