const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Given(/^I open a browser to the login page$/, async () => {
  return await client
    .url('http://localhost:3000/login')
    .waitForElementVisible('body', 5000);
});

When(/^I enter an e-mail address which is able to be validated$/, () => {
  return client.setValue('input[id=email-input]', 'tester@pathcheck.org');
});

When(/^I enter a password$/, () => {
  return client.setValue('input[id=pass-input]', 'supersecretpasword');
});

When(/^I click the Login button/, () => {
  return client.click('button[id=login-button]');
});

Then(/^I expect to see a Toast alert containing "([^"]*)"$/, message => {
  return client
    .waitForElementVisible('div[role=alert]')
    .assert.containsText('div[role=alert]', message);
});
