#from selenium.webdriver.remote import webdriver
from selenium import webdriver
#from selenium.webdriver.chrome import options
from page_objects import EntryPage, LoginPage, RedactionPage, Tools
import unittest
import os

class TestRedaction(unittest.TestCase):

    def setUp(self):
        #setup environment
        if 'HOME_DIR' in os.environ.copy():
            self.home_dir = os.environ['HOME_DIR']
        else:
            self.home_dir = os.getcwd()
        if 'DATA_DIR' in os.environ.copy():
            self.data_dir = os.environ['DATA_DIR']
        else:
            self.data_dir = 'tests/data/'
        if 'TMP_DIR' in os.environ.copy():
            self.tmp_dir = os.environ['TMP_DIR']
        else:
            self.tmp_dir = '/tmp/'
        if 'BASE_TEST_URL' in os.environ.copy():
            self.base_url = os.environ['BASE_TEST_URL']
        else:
            self.base_url = 'https://safeplaces.extremesolution.com/'
        if 'SELENIUM_URL' in os.environ.copy():
            self.sel_url = os.environ['SELENIUM_URL']
        else:
            self.sel_url = 'http://172.17.0.2:4444/wd/hub'

        print("DATA_DIR: " + self.data_dir)
        chrome_options = webdriver.ChromeOptions()
        prefs = {'download.default_directory': '/tmp'}
        chrome_options.add_experimental_option('prefs', prefs)
        self.driver = webdriver.Remote(command_executor=self.sel_url, options=chrome_options)


    def test_redaction(self):
        tools = Tools()
        entry_page = EntryPage(self.driver,base_url=self.base_url)
        entry_page.open_page()
        entry_page.open_redactor()
        login_page = LoginPage(self.driver)
        login_page.login_if_required()
        redaction_page = RedactionPage(self.driver)
        redaction_page.load_file(self.data_dir +'/privkit31A-synthetic-REDACTED.json')
        redaction_page.check_start_date_is('1-Mar-2020 1:00pm GMT')
        redaction_page.check_end_date_is('19-Mar-2020 10:00pm GMT')
        redaction_page.check_duration_is('18 days 9 hrs')
        redaction_page.save_file()
        #TODO: this next step fails because it was designed for backend=OFF.  To test this, we need to load the publisher screen and see what data is there when we hit load
        #tools.compare_files(self.tmp_dir + '/privkit31A-synthetic-REDACTED-REDACTED.json', self.home_dir + '/' + self.data_dir + '/expected_results/privkit31A-synthetic-REDACTED-REDACTED.json')


    def tearDown(self):
        self.driver.close()
