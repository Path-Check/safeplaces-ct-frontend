#from selenium.webdriver.remote import webdriver
from selenium import webdriver
#from selenium.webdriver.chrome import options
from page_objects import EntryPage, LoginPage, RedactionPage, ContactTracePage, AddNewRecordPage, AddDataToRecordPage, StageForPublishingPage, PublishDataPage, SelectDataPage, SubmitDataPage, SettingsPage, Tools
import unittest
import os

class TestRedaction(unittest.TestCase):

    def setUp(self):
        #Change this to TRUE if you don't want to use a dockerised stack
        self.local_mode = False

        #setup environment based on environment variables
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


        chrome_options = webdriver.ChromeOptions()
        prefs = {'download.default_directory': '/tmp'}
        chrome_options.add_experimental_option('prefs', prefs)
        if self.local_mode:
            self.driver = webdriver.Chrome(chrome_options=chrome_options)
        else:
            self.driver = webdriver.Remote(command_executor=self.sel_url, options=chrome_options)

    def test_app_loads(self):
        tools = Tools()
        entry_page = EntryPage(self.driver,base_url=self.base_url)
        entry_page.open_page()

    def test_invalid_login(self):
        tools = Tools()
        entry_page = EntryPage(self.driver,base_url=self.base_url)
        entry_page.open_page()
        login_page = LoginPage(self.driver)
        login_page.login_invalid()
        # confirm we're still at the login page by confirming that we can still enter an invalid login
        login_page.login_invalid()

    def test_contact_trace(self):
        tools = Tools()
        entry_page = EntryPage(self.driver,base_url=self.base_url)
        entry_page.open_page()
        login_page = LoginPage(self.driver)
        login_page.login_if_required()
        entry_page.open_trace()
        contact_trace_page = ContactTracePage(self.driver)
        contact_trace_page.add_new_record()
        add_record_page = AddNewRecordPage(self.driver)
        add_record_page.create_manually()
        contact_trace_page.more()
        contact_trace_page.add_data_point()
        # start to add a point and cancel editing the point
        # if the test works this far, we can expand it later
        point_editor_page = AddDataToRecordPage(self.driver)
        point_editor_page.enter_location('-122.19732036472264, 37.718665250290684')
        point_editor_page.enter_date('06/08/2020 07:00')
        point_editor_page.enter_duration_hours('0')
        point_editor_page.enter_duration_minutes('40')
        point_editor_page.close()
        # add a point again but this time save the data
        # point_editor_page.add_data_point('-122.19732036472264, 37.718665250290684','06/08/2020 07:00', '0', '20')
        # point_editor_page.save_data()
        # stage_publish_page = StageForPublishing(self.driver)
        # stage_publish_page.stage_no_consent()
        # stage_publish_page.stage_yes_consent()
        # entry_page.open_publish()
        # publish_data_page = PublishDataPage(self.driver)
        # publish_data_page.publish_data()
        # select_data_page = SelectDataPage(self.driver)
        # select_data_page.select_item()
        # select_data_page.open_seleted()
        # publish_data_page.submit_publish()
        # submit_data_page = SubmitDataPage(self.driver)
        # submit_data_page.cancel()
        # contact_trace_page.submit_publish()
        # submit_data_page = SubmitDataPage(self.driver)
        # submit_data_page.submit()
        entry_page.open_settings()
        settings_page = SettingsPage(self.driver)
        settings_page.logout
       
    # leave test_ out of the method name until ready to make this one live
    def publish(self):
        # stage for publishing and abort by clicking the no consent button
        # contact_trace_page.stage_for_publishing()
        # stage_publish_page = StageForPublishing(self.driver)
        # stage_publish_page.no_consent()
        # stage for publishing and click the yes consent button to stage
        # contact_trace_page.stage_for_publishing()
        # stage_publish_page = StageForPublishing(self.driver)
        # stage_publish_page.yes_consent()
        
    # leaving test_ out of the method name until the SUT works
    def settings(self):
        login_page = LoginPage(self.driver)
        login_page.login_if_required()
        entry_page = EntryPage(self.driver,base_url=self.base_url)
        entry_page.open_page()
        entry_page.open_settings()
        settings_page = SettingsPage(self.driver)
        settings_page.set_health_authority_name('Test Health Authority')
        settings_page.set_information_website_URL('https://cdc.gov')
        settings_page.set_reference_website_URL('https://cdc.gov')
        settings_page.set_api_endpoint('https://s3.aws.com/bucket_name/safepaths.json')
        settings_page.set_privacy_policy_URL('https://www.cdc.gov/other/privacy.html')
        # set retention policy slider to 50% of the way across, which would be 15 days
        actionChains = ActionChains(webdriver)
        percent = '50'
        width = data_retention_slider_track.size['width']
        move.click_and_hold(self.sliderknob).move_by_offset(percent * width / 100, 0).release().perform()
        settings_page.reset_gps_coordinates
        settings_page.save_and_continue
        

    #def test_redaction(self): <--- removed test_ from the method name until the SUT works!
    def redaction(self):
        tools = Tools()
        entry_page = EntryPage(self.driver,base_url=self.base_url)
        entry_page.open_page()
        entry_page.setup_case()
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
