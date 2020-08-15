module.exports = {
  'Test login page': function (browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body')
      .pause(1000)
      .assert.titleContains('Safe Places')
      .assert.visible('input[id=email-input]')
      .setValue('input[id=email-input]', 'tester@pathcheck.org')
      .pause(1000)
      .assert.visible('input[id=pass-input]')
      .setValue('input[id=pass-input]', 'supersecretpassword')
      .pause(1000)
      .assert.visible('button[id=login-button]')
      .click('button[id=login-button]')
      .pause(1000)
      .waitForElementVisible('div[role=alert]')
      .assert.containsText('div[role=alert]', 'Something went wrong')
      .pause(1000)
      .end();
  },
};
