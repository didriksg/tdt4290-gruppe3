# Ergoterapitjenesten i Trondheim app ting
[NAME OF APP] is an app created to help Ergotjenesten i Trondheim with their workflow. The app is based on having a React frontend and 
NodeJS using Express backend, and a MongoDB NoSQL database.

## Getting started
### Pre-requisites

`docker` and `docker-compose` is required to run this app. These can be installed by:

- **Linux:** `apt-get install docker docker-compose`
- **OS X:** https://docs.docker.com/docker-for-mac/install/
- **Windows:** https://docs.docker.com/docker-for-windows/install/

### Installing
1. Open a terminal and navigate to the root folder of the project, containing the `docker-compose.yml` file, run: 
`docker-compose build` to 
build the docker 
image. This 
will install and setup the frontend, backend and database.
2. When the docker image is built, run: `docker-compose up` to start the image containing everything needed to run the app.
3. The app should now be up and running.


## Setup the website
1. Open a terminal and navigate to the client folder for the project
2. run: `npm install` to install the necessary modules
3. while in the client folder, run: `npm start`. The website will now run from `http://localhost:1234/`

## Running tests
Smart things about running the tests goes here.

## Developing
Smart things about developing goes here.

## Continious Integration
Smart things about continious integration goes here.

## Deployment
Smart things about how to deploy the app goes here.