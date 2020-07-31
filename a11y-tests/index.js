const pa11y = require('pa11y');
const fs = require('fs');
const html = require('pa11y-reporter-html');
require('dotenv').config();

const defaultOptions = {
  standard: 'WCAG2A'
}

const loginActions = [
  `set field #email-input to ${process.env.PA11Y_LOGIN_EMAIL}`,
  `set field #pass-input to ${process.env.PA11Y_LOGIN_PASSWORD}`,
  'click element #login-button',
  'wait for url to be http://localhost:3000/trace',
]

const runPa11y = async () => {
  try {
    const results = await Promise.allSettled([
      testLogin(),
      testForgotPassword(),
      testTrace(),
      testTraceModal(),
      testPublish(),
      testPublishModal(),
      testGeneralSettings(),
      testMemberSettings(),
    ])
    const resultErrors = results.filter(result => result.status === 'rejected')
    if (resultErrors[0]) {
      throw new Error('Accessibility Issues Detected');
    }
  } catch (error) {
    console.error(error)
  }
}

const testUrl = (url, outputPath, options) => async () => {
  // Log Results and throw an error
  // try {
  //   const results = await pa11y(url, options)
  //   if (results.issues && results.issues.length > 0) {
  //     console.log(results)
  //     throw new Error('Accessibility Issues Detected')
  //   }
  // } catch (error) {
  //   throw new Error(error.message)
  // }

  // Log Results and write results to an html file
  try {
    const results = await pa11y(url, options)
    if (results.issues && results.issues.length > 0) {
      console.log(results)
      const htmlResults = await html.results(results);
      fs.writeFile(outputPath, htmlResults, (error) => { console.log(error) });
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const testLogin = testUrl('http://localhost:3000/login', './a11y-tests/errors/login.html', {
  ...defaultOptions,
  // screenCapture: './a11y-tests/screenshots/login.png'
})

const testForgotPassword = testUrl('http://localhost:3000/login', './a11y-tests/errors/forgotPassword.html', {
  ...defaultOptions,
  actions: [
    'click element #forgot-password',
    'wait for element #submit-forgot-password to be visible',
  ],
  // screenCapture: './a11y-tests/screenshots/forgotPassword.png'
})

const testTrace = testUrl('http://localhost:3000/login', './a11y-tests/errors/trace.html', {
  ...defaultOptions,
  actions: [
    ...loginActions,
  ],
  wait: 4000, // wait to let map render
  // screenCapture: './a11y-tests/screenshots/trace.png',
})

const testTraceModal = testUrl('http://localhost:3000/login', './a11y-tests/errors/traceModal.html', {
  ...defaultOptions,
  actions: [
    ...loginActions,
    'click element #load-existing-record',
    'wait for element #modal to be visible',
  ],
  // screenCapture: './a11y-tests/screenshots/traceModal.png',
})

const testPublish = testUrl('http://localhost:3000/login', './a11y-tests/errors/publish.html', {
  ...defaultOptions,
  actions: [
    ...loginActions,
    'click element #publish-data',
    'wait for url to be http://localhost:3000/publish',
  ],
  // screenCapture: './a11y-tests/screenshots/publish.png',
})

const testPublishModal = testUrl('http://localhost:3000/login', './a11y-tests/errors/publishModal.html', {
  ...defaultOptions,
  actions: [
    ...loginActions,
    'click element #publish-data',
    'wait for url to be http://localhost:3000/publish',
    'click element #load-data-for-publishing',
    'wait for element #modal to be visible',
  ],
  wait: 4000, // wait to let map render
  // screenCapture: './a11y-tests/screenshots/publishModal.png',
})

const testGeneralSettings = testUrl('http://localhost:3000/login', './a11y-tests/errors/generalSettings.html', {
  ...defaultOptions,
  actions: [
    ...loginActions,
    'click element #settings',
  ],
  // screenCapture: './a11y-tests/screenshots/settingsGeneral.png',
})

const testMemberSettings = testUrl('http://localhost:3000/login', './a11y-tests/errors/memberSettings.html', {
  ...defaultOptions,
  actions: [
    ...loginActions,
    'click element #settings',
    'wait for url to be http://localhost:3000/settings/general',
    'click element #Members',
    'wait for url to be http://localhost:3000/settings/members',
  ],
  // screenCapture: './a11y-tests/screenshots/settingsMembers.png',
})

runPa11y();

// TODO
// NEW LOGIN SCREENS?????
// RESET PASSWORD???