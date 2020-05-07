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
* Preparation:
** Configure the Dockerfile under tests/docker/testhost to add appropriate environment variables (e.g. base url)
* Start a standalone server:  docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome
* Start a test host:
  * docker build -t testhost .
  * docker run testhost
