module.exports = {
  'Test login page': function (browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body')
      .assert.titleContains('Safe Places')
      .assert.visible('input[id=email-input]')
      .setValue('input[id=email-input]', 'tester@pathcheck.org')
      .assert.visible('input[id=pass-input]')
      .setValue('input[id=pass-input]', 'supersecretpassword')
      .assert.visible('button[id=login-button]')
      .click('button[id=login-button]')
      .waitForElementVisible('div[role=alert]')
      .assert.containsText('div[role=alert]', 'Something went wrong')
      .end();
  },
};
