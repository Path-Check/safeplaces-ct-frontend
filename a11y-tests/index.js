const pa11y = require('pa11y');
require('dotenv').config();

const defaultOptions = {
  standard: 'WCAG2AAA'
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
      console.log(results)
      throw new Error('Accessibility Issues Detected')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const testLogin = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  // screenCapture: './a11y-tests/screenshots/login.png'
})

const testTrace = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  actions: [
    ...loginActions,
  ],
  // screenCapture: './a11y-tests/screenshots/trace.png',
})

const testTraceModal = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  actions: [
    ...loginActions,
    'click element #load-existing-record',
  ],
  // screenCapture: './a11y-tests/screenshots/traceModal.png',
})

const testPublish = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  actions: [
    ...loginActions,
    'click element #publish-data',
    'wait for url to be http://localhost:3000/publish',
  ],
  // screenCapture: './a11y-tests/screenshots/publish.png',
})

const testPublishModal = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  actions: [
    ...loginActions,
    'click element #publish-data',
    'wait for url to be http://localhost:3000/publish',
    'click element #load-data-for-publishing',
  ],
  // screenCapture: './a11y-tests/screenshots/publishModal.png',
})

const testGeneralSettings = testUrl('http://localhost:3000/login', {
  ...defaultOptions,
  actions: [
    ...loginActions,
    'click element #settings',
  ],
  // screenCapture: './a11y-tests/screenshots/settingsGeneral.png',
})

const testMemberSettings = testUrl('http://localhost:3000/login', {
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