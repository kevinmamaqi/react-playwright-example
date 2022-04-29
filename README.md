# Example playwright + react-graphql

## Structure

- _app_: react TS with vite.
- _e2e_: e2e headless tests with playwright.
- _scripts_: to facilitate dockerization.
- _.env_: to facilitate sharing environment variables.
- _README.md_: this document.

## How to use it

- Create github api token to acccess the graphql request and use it in the .env.
- _`npm run app`_: starts the frontend app
- _`npm run local-test`_: launches playwright in localhost.
- _`e2e-test`_: builds the app in a docker and playwright in a docker and runs the tests.
- _`e2e-stop`_: stops docker containers
