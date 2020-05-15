These are selenium python tests for testing the Safe Places web application.

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
  * the BASE_URL should be the URL of the frontend server being tested
  * the SELENIUM_URL should refer to the selenium standalone server started in docker

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
