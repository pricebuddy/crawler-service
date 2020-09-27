The crawler will run every 30mg add. It needs product data fro the database in order to get the links to scrape. The xpaths can be changed at any moment if the site changes.

Run tests:

`npm run test`

Run app locally:

`npm start`

How to build docker image locally:

`docker build -t crawler-service .`

How to run using docker locally:

`docker run --init -p 3000:3000 -e "MONGO_HOST=host.docker.internal" crawler-service`
