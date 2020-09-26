FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY . /usr/src/app

# Install app dependencies
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

ENV APP_PORT=3000
ENV MONGO_HOST=$MONGO_HOST

EXPOSE 3000
CMD [ "npm", "start" ]