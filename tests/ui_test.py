from selenium import webdriver
from page_objects import EntryPage, LoginPage, RedactionPage, Tools
import unittest
import os

class TestRedaction(unittest.TestCase):

    def setUp(self):
        options = webdriver.ChromeOptions()
        prefs = {'download.default_directory': '/tmp'}
        options.add_experimental_option('prefs', prefs)
        self.driver = webdriver.Chrome(options=options)
        self.home_dir = os.getcwd()

    def test_redaction(self):
        tools = Tools()
        entry_page = EntryPage(self.driver)
        entry_page.open_page()
        entry_page.open_redactor()
        login_page = LoginPage(self.driver)
        login_page.login_if_required()
        redaction_page = RedactionPage(self.driver)
        redaction_page.load_file(self.home_dir + '/data/privkit31A-synthetic-REDACTED.json')
        redaction_page.check_start_date_is('1-Mar-2020 1:00pm GMT')
        redaction_page.check_end_date_is('19-Mar-2020 10:00pm GMT')
        redaction_page.check_duration_is('18 days 9 hrs')
        redaction_page.save_file()
        tools.compare_files('/tmp/privkit31A-synthetic-REDACTED-REDACTED.json', self.home_dir + '/data//expected_results/privkit31A-synthetic-REDACTED-REDACTED.json')


    def tearDown(self):
        self.driver.close()
