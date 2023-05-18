FROM node:16-alpine as build

# Specify where our app will live in the container
WORKDIR /app
EXPOSE 3000

# Copy the React App to the container
COPY . /app/
RUN npm install -g serve
# Prepare the container for building React
# RUN npm install
# We want the production version
# RUN npm run build


CMD ["serve", "-s", "web-build"]
# # Prepare nginx
# # Pull nginx base image
# FROM nginx:1.17.1-alpine

# # Build file to nginx
# COPY --from=build /app/web-build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d

