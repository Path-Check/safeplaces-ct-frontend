import pytest
import os
from selenium import webdriver


@pytest.fixture(scope="module")
def setup_env():
    setup_env = {}
    # Change this to TRUE if you don't want to use a dockerised stack
    setup_env['local_mode'] = True

    # setup environment based on environment variables
    if 'HOME_DIR' in os.environ.copy():
        setup_env['home_dir'] = os.environ['HOME_DIR']
    else:
        setup_env['home_dir'] = os.getcwd()
    if 'DATA_DIR' in os.environ.copy():
        setup_env['data_dir'] = os.environ['DATA_DIR']
    else:
        setup_env['data_dir'] = 'tests/data/'
    if 'TMP_DIR' in os.environ.copy():
        setup_env['tmp_dir'] = os.environ['TMP_DIR']
    else:
        setup_env['tmp_dir'] = '/tmp/'
    if 'BASE_TEST_URL' in os.environ.copy():
        setup_env['base_url'] = os.environ['BASE_TEST_URL']
    else:
        setup_env['base_url'] = 'https://staging.spl.extremesolution.com/'
    if 'SELENIUM_URL' in os.environ.copy():
        setup_env['sel_url'] = os.environ['SELENIUM_URL']
    else:
        setup_env['sel_url'] = 'http://172.17.0.2:4444/wd/hub'
    if 'BROWSER' in os.environ.copy():
        setup_env['browser'] = os.environ['BROWSER']
    else:
        setup_env['browser'] = 'CHROME'

    chrome_options = webdriver.ChromeOptions()
    # Disable use of /dev/shm inside of containers where it is not available
    chrome_options.add_argument('--disable-dev-shm-usage')
    prefs = {'download.default_directory': '/tmp'}
    chrome_options.add_experimental_option('prefs', prefs)
    if setup_env['local_mode']:
        if (setup_env['browser'] == 'FIREFOX'):
            setup_env['driver'] = webdriver.Firefox()
        else:
            if (setup_env['browser'] == 'EDGE'):
                setup_env['driver'] = webdriver.Edge()
            else:
                setup_env['driver'] = webdriver.Chrome(
                    chrome_options=chrome_options)
    else:
        setup_env['driver'] = webdriver.Remote(
            command_executor=setup_env['sel_url'], options=chrome_options)

    return setup_env
