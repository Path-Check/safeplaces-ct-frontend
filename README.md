# Safeplaces frontend


### Technology used

- react.js
- redux 
- mapbox.gl
- css modules with scss
- jest for testing

### Structure

- use [ducks](https://github.com/erikras/ducks-modular-redux) scheme for redux implementation

## Workflow


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install

clone the repository using the `dev_react` branch

Copy the `.env.template` file in the parent directory and rename it to `.env` file in the parent directory. In order to make the application work correctly you have to enter API keys for Mapbox and Google places. If you don't want to register new ones feel free to ask for working credentials in the Slack channel.

```
REACT_APP_GOOGLE_PLACES_KEY=GOOGLE_API_KEY_WITH_PLACES_ENABLED
REACT_APP_GOOGLE_PLACES_LANGUAGE=en
REACT_APP_MAPBOX_KEY=MAPBOX_API_KEY
REACT_APP_API_URL=REACT_APP_API_URL
PA11Y_LOGIN_EMAIL= any valid onboarded account login email for the current API. Ideally the account should be a super user.
PA11Y_LOGIN_PASSWORD= any valid onboarded account login password for the current API. Ideally the account should be a super user.
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:e2e`

Runs the [Nightwatch](https://nightwatchjs.org/) WebDriver tests using Google Chrome against a locally
running instance of the UI on port 3000 (e.g. http://localhost:3000/). You **MUST** have already started
the dev server using `npm run start` in another terminal/console.

### `yarn test:cucumber`

Runs the [Nightwatch](https://nightwatchjs.org/) WebDriver tests using Google Chrome against a locally
running instance of the UI on port 3000. The difference between this and the `test:e2e` is that it uses 
[cucumber-js](https://github.com/cucumber/cucumber-js), feature files, and step definitions to do the
test using Behavior Driven Development (BDD). See the `features/login.feature` file and the 
`features/step-definitions/steps.js` files. 

### `yarn run a11y-check`

Runs the current accessibility tests in `/a11y-tests/index.js` This file will have to be updates whenever new routes are created.<br />
Requires `PA11Y_LOGIN_EMAIL` and `PA11Y_LOGIN_PASSWORD` <br />
The script will output accessibility errors to the console and also generate html files with the error lists in `/a11y-tests/errors`<br />
Corresponding screenshots of the pages with errors will be generated in `/a11y-tests/screenshots`<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
