# Continuous Integration/Deployment

To automatically validate the configuration and code in this repository, and appropriately deploy it, the following recommendations are in order:

## CI/CD using Github actions

- Create the `.github/workflows` directory in the root of this project

- Initialize a `yml` file for continuous integration

- Fill it with content to handle the unit testing procedure. An example is shown below:

```
name: Integration tests for shortener backend service

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout'
        uses: actions/checkout@master

      - name: 'Setup node.js'
        uses: actions/setup-node@v1
        with:
          node-version: 14

      - name: 'Install dependencies'
        run: cd ./server && npm i

      - name: 'Setup Postgres'
        uses: harmon758/postgresql-action@v1
        with:
          postgresql version: '11'

      - name: 'Apply unit tests'
        run: cd ./server && npm run test

```

> NB: The YAML configuration above has not been fully tested.

Follow the method above to deploy automatically to your platform of choice.
