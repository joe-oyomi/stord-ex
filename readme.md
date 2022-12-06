# URL shortener fullstack application.

The url shortener is a fullstack web application that includes both a frontend (written in react.js) and a backend (written in express.js). Below are the different parts:

## 1. The server

The server is the backend web service of the application. It consists of various api endpoints that you can access to be able to create or retrieve the data

### Endpoints

1. `POST /shorten`: this will create a short link and return a standard json payload object, which can be parsed by the frontend for further user experience.

REQUEST:

```
{
  title: string,
  description: string,
  url: string // required and must be a valid url
}
```

RESPONSE:

```
{
  statusCode: number,
  data: object: {
    shorturl: string,
    url: string,
    count: number, // as number of times it was visited,
    ...},
  message: string,
  error: object
}
```

2. `GET /slug`

This will visit a short link that was generated and redirect to the original website. if the link is broken, then it will redirect to the not-found page of the client application

3. `GET /stats?offset=0&limit=100`

This will return a list of all shortened links

queryParams are:

```
{
  offset: number, (>=0)
  limit: number (>=0)
}
```

## 2. The Client

- The initialized client application starts with a web page having three form fields for the title description and url for a shortening request. Upon submission, the data from these fields are sent as a `POST` request to the `/shorten` endpoint of the API server. If the request is successful and a json object returned, the single page application injects the page with the new shortened link, as well as the original url – both of which can be "clicked to copy" for convenience.

- Visiting a valid shortened url will automatically redirect to the original corresponding url, with no apparent UI reference to the frontend web application from the browser's point of view.

- The `/stats` route for the frontend pulls a list returned from the server, and renders it neatly in a table format for ease of access to shortened urls, their original equivalent, number of times visited,times created and times last visited.

## Starting the application in a local development environment

For the application to run successfully, you'll need to have the following installed:

- node.js, preferably version 14
- npm, typically installed when you install node. Alternatively, you might prefer the yarn package manager.
- PostgreSQL, particularly listening on your local port 5432.

Follow the steps below to get the application up and running:

### 1. Start the api server.

- Navigate to `./server`
- Run `cp .env.example .env` to create a local environment file. Adapt it as appropriate.
- Install dependencies by running `npm i` or `yarn install`
- Start the server with `npm start`. It should listen on local port 3001.

### 2. Start the client application

- Navigate to `./client`
- Run `cp .env.example .env` to create a local environment file. Adapt it as appropriate.
- Install dependencies by running `npm i` or `yarn install`
- Start the client with `npm start`. This should automatically open up a browser window on your local port 3000.

## Starting the application using docker containers

The following dependencies are required to run containers:

- docker desktop
- docker compose (for older docker versions)

Follow the steps below to get the containers up and running:

- In the `/server` and `client` directories, Create and adapt a `.env` file with `cp .env.example .env`
- In the root directory run `docker compose up`
- This should build/download the images and run them on your local machine

The backend PORT is `3001`, while the frontend PORT is `3000`. Test by visiting `http://localhost:3000` in your browser.

## Testing the application

Two kinds of tests are available

### 1. Unit tests on the backend

To run this test, follow the steps below:

- Navigate to `./server`
- Install the dependencies with `npm i` or `yarn install` if you haven't already
- Run `npm run test`

### 2. Load tests on the backend

Follow the steps below to run this test:

- Start the server application using any of the above methods
- Open another terminal session
- Navigate to the root directory of the application
- Run `bash loadtest.sh`
- After the test has run, you should be able to see detailed stats on the stress test
