# Automated Browser Testing With Nightwatch & Cucumber

# What Is Nightwatch?
Nightwatch is a thin JavaScript API overlaying the Selenium WebDriver API. This allows us to control the Selenium browser automation from JavaScript code in a manner most familiar to JavaScript and UI developers.

# What is Cucumber?
Cucumber is library for implementing Behavior Driven Development. IT codifies a simple format (Gherkin) for writing specifications for a system which should be readable by both technical contributors and non-technical users/stakeholders alike.

# Why Would I Use Them Together?
When you combine Nightwatch and Cucumber, writing test scenarios becomes relatively painless, and attaching logic to those scenarios is very easy. The real value comes from the fact that when paired, you get exceptional reporting on those test scenarios. You can even include screenshots of the automated browser in your reports!

# Setting It All Up

# Install Dependencies
# Install Nightwatch 

yarn add --dev nightwatch nightwatch-api
Install CucumberJS 

yarn add --dev cucumber-js
# Install Cucumber Reporting Libraries 

yarn add --dev cucumber-pretty cucumber-html-reporter

# Create Configuration
# Create the nightwatch configuration 

From the command-line, run nightwatch to cause it to generate an initial configuration file

Modify the nightwatch.conf.js file 

# Create the cucumber configuration file <root>/cucumber.conf.js 

Add script entries to package.json for running the Cucumber tests 

Create the directory <root>/features/step-definitions

# Create Your First Specification
Create your first .feature file as <root>/features/Login.feature with the following contents 
Define steps to satisfy your feature steps in the file <root>/features/step-definitions/steps.js 

# Run Your First Scenario
Run the tests and produce a report using npm run test:cucumber. 

# Python Tests (old Selenium tests - to be deprecated and replaced by Nightwatch & Cucumber as described above):

# Pre-requisites
* Chromedriver should be installed on your system and must match your chrome version - see https://sites.google.com/a/chromium.org/chromedriver/
* Chromedriver must be in your path
* Chrome must be installed
* pip install selenium
* pip install pytest

# Execution
* Just run "pytest" from the repo root.

# CI Execution

## Preparation

### Dockerized Setup
* Configure the Dockerfile under tests/docker/testhost to add appropriate environment variables
  * the BASE_TEST_URL should be the URL of the frontend server being tested
  * the SELENIUM_URL should refer to the selenium standalone server started in docker in the for http://URL:4444/wd/hub

### Local setup
* In the ui_test.py code, set self.local_mode to True
* Set environment variables appropriate to your local environment

## Execution
WARNING - THIS SHOULD NOT YET BE INTEGRATED WITH CORE CI FLOWS UNTIL TESTED

* Start a selenium standalone server:  docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome
* Start a test host:
  * docker build -t testhost .
  * docker run testhost
* Start a frontend server without back-end
