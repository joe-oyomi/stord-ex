# Backend archtecture choices

## Generation of short unique url

 -  I have used an npm package `"autocannon": "^7.10.0",` used to generate unique random strings that are url friendly
 I could have used other tools like uuid, but they seem to generate very long strings that might most of the time be longer than the original url

 ## Validation & security

 -  I have used npm package called `joi` which helps in validating the user inputs and secure our business logic from unneccessary inputs.

 ## Data storage

  - I have used postgresql as the db for data persistence which is easier to use, multi platform, free, and very fast.

## Testing Libraries

 - For unit tests, I have used mocha, and chai with chai-http since they help access the server and simulate a real user

 - For Load testing, I have used autocannon in a shell script which help simulate a lot of parralel users that hit the application simultaneously hence we are able to inspect how fast the application is.