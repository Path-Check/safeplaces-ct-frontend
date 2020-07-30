const pa11y = require('pa11y');
require('dotenv').config();

const logOptions = {
  debug: console.log.bind(console),
  // error: console.error.bind(console),
  info: console.log.bind(console),
};

const defaultOptions = {
  // standard: 'WCAG2A'
  standard: 'WCAG2AAA',
  // log: logOptions,
}

const runPa11y = async () => {
  try {
    const results = await Promise.allSettled([
      testLogin(),
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

const testUrl = (url, options) => async () => {
  try {
    const results = await pa11y(url, options)
    if (results.issues && results.issues.length > 0) {
      // console.log('PA11Y ERRORS: ' + url)
      console.log(results)
      // console.log('___________________________________________________________')
      // for (let i = 0; i < results.issues.length; i++) {
      //   console.log(results.issues[i].message)
      //   console.log('___________________________________________________________')
      // }
      throw new Error('Accessibility Issues Detected')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const testLogin = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  screenCapture: './a11y-tests/screenshots/login.png'
})

const testTrace = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  actions: [
    `set field #email-input to ${process.env.PA11Y_LOGIN_EMAIL}`,
    `set field #pass-input to ${process.env.PA11Y_LOGIN_PASSWORD}`,
    'click element #login-button',
    'wait for url to be http://localhost:3000/trace',
  ],
  screenCapture: './a11y-tests/screenshots/trace.png',
})

const testTraceModal = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  actions: [
    `set field #email-input to ${process.env.PA11Y_LOGIN_EMAIL}`,
    `set field #pass-input to ${process.env.PA11Y_LOGIN_PASSWORD}`,
    'click element #login-button',
    'wait for url to be http://localhost:3000/trace',
    'click element #load-existing-record',
  ],
  screenCapture: './a11y-tests/screenshots/traceModal.png',
})

const testPublish = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  actions: [
    `set field #email-input to ${process.env.PA11Y_LOGIN_EMAIL}`,
    `set field #pass-input to ${process.env.PA11Y_LOGIN_PASSWORD}`,
    'click element #login-button',
    'wait for url to be http://localhost:3000/trace',
    'click element #publish-data',
    'wait for url to be http://localhost:3000/publish',
  ],
  screenCapture: './a11y-tests/screenshots/publish.png',
})

const testPublishModal = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  actions: [
    `set field #email-input to ${process.env.PA11Y_LOGIN_EMAIL}`,
    `set field #pass-input to ${process.env.PA11Y_LOGIN_PASSWORD}`,
    'click element #login-button',
    'wait for url to be http://localhost:3000/trace',
    'click element #publish-data',
    'wait for url to be http://localhost:3000/publish',
    'click element #load-data-for-publishing',
  ],
  screenCapture: './a11y-tests/screenshots/publishModal.png',
})

const testGeneralSettings = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  actions: [
    `set field #email-input to ${process.env.PA11Y_LOGIN_EMAIL}`,
    `set field #pass-input to ${process.env.PA11Y_LOGIN_PASSWORD}`,
    'click element #login-button',
    'wait for url to be http://localhost:3000/trace',
    'click element #settings',
  ],
  screenCapture: './a11y-tests/screenshots/settingsGeneral.png',
})

const testMemberSettings = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  actions: [
    `set field #email-input to ${process.env.PA11Y_LOGIN_EMAIL}`,
    `set field #pass-input to ${process.env.PA11Y_LOGIN_PASSWORD}`,
    'click element #login-button',
    'wait for url to be http://localhost:3000/trace',
    'click element #settings',
    'wait for url to be http://localhost:3000/settings/general',
    'click element #Members',
    'wait for url to be http://localhost:3000/settings/members',
  ],
  screenCapture: './a11y-tests/screenshots/settingsMembers.png',
})

runPa11y();