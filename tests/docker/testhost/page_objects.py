from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import ElementNotInteractableException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class Page(object):
    """
    Base class that all page models can inherit from
    """
    def __init__(self, selenium_driver, base_url='http://localhost:80/'):
        self.base_url = base_url
        self.driver = selenium_driver
        self.timeout = 45
        self.driver.implicitly_wait(45)
        self.driver.maximize_window()

    def find_element(self, loc):
        print(loc)
        return self.driver.find_element(loc[0], loc[1])

    def open(self,url):
        url = self.base_url + url
        self.driver.get(url)

    def check_is(self, expected, actual):
        assert actual == expected, "actual value is: " + actual


class EntryPage(Page):
    btn_setup_case = (By.CSS_SELECTOR, '#root > div > div > button')
    loc_scrubber = (By.XPATH, '//a[@href="./location-scrubber/index.html"]')
    contact_trace = (By.ID, 'contact-trace')
    publish_data = (By.ID, 'publish-data')
    settings_link = (By.ID, 'settings')

    def open_page(self):
        self.open("")
        assert "Safe Places" in self.driver.title, self.driver.title
        #assert "React" in self.driver.title, self.driver.title

    def setup_case(self):
        self.find_element(self.btn_setup_case).click()

    def open_redactor(self):
        self.find_element(self.loc_scrubber).click()

    def open_trace(self):
        self.find_element(self.contact_trace).click()

    def open_publish(self):
        self.find_element(self.publish_data).click()

    def open_settings(self):
        self.find_element(self.settings_link).click()

class LoginPage(Page):
    username = (By.ID, 'email-input')
    password = (By.ID, 'pass-input')
    login_btn = (By.ID, 'login-button')
    api_key = (By.ID, 'api-key')
    submit = (By.ID, 'submit')

    def login_if_required(self):
        self.driver.implicitly_wait(3)

        try:
            self.find_element(self.username).send_keys("safeplaces@extremesolution.com")
            self.find_element(self.password).send_keys("Wx$sRj3E")
            self.find_element(self.login_btn).click()
        except Exception as e:
            pass

        try:
            self.find_element(self.api_key).click()
            self.find_element(self.api_key).send_keys('AIzaSyBvm-T7hqlAtAcQqPy0nOS1CSmXJQeZSPI')
            self.find_element(self.submit).click()
        except Exception as e:
            pass

        self.driver.implicitly_wait(30)

    def login_invalid(self):
        self.driver.implicitly_wait(3)

        try:
            self.find_element(self.username).send_keys("invalid")
            self.find_element(self.password).send_keys("invalid")
            self.find_element(self.login_btn).click()
        except Exception as e:
            pass

        try:
            self.find_element(self.api_key).click()
            self.find_element(self.api_key).send_keys('AIzaSyBvm-T7hqlAtAcQqPy0nOS1CSmXJQeZSPI')
            self.find_element(self.submit).click()
        except Exception as e:
            pass

        self.driver.implicitly_wait(30)


class RedactionPage(Page):
    load_file_btn = (By.CSS_SELECTOR, '#root > div > div > div.styles_sidebar__28L4X > div.styles_header__hJUf6 > div.styles_buttons__xEkBq > div > button')
    save_file_btn = (By.ID, 'save')
    delete = (By.ID, 'delete-btn')
    date_start = (By.ID, 'date-start')
    date_end = (By.ID, 'date-end')
    duration = (By.ID, 'duration')

    def load_file(self, filename):
        self.find_element(self.load_file_btn).send_keys(filename)

    def save_file(self):
        self.find_element(self.save_file_btn).click()

    def check_start_date_is(self, value):
        self.check_is(value, self.find_element(self.date_start).text)

    def check_end_date_is(self, value):
        self.check_is(value, self.find_element(self.date_end).text)

    def check_duration_is(self, value):
        self.check_is(value,self.find_element(self.duration).text)
        
    # def add_entry(self):
    #     self.find_element(self.add_entry_btn).click()

    # def delete_inspected(self):
    #     self.find_element(self.delete_inspected_btn).click()
        
    # def select_all(self):
    #     self.find_element(self.select_all_btn).click()
        
    # def select_none(self):
    #     self.find_element(self.select_none_btn).click()

class ContactTracePage(Page):
    add_new_record_button = (By.ID, 'add-new-record')
    load_existing_record_button = (By.ID, 'load-existing-record')
    more_button = (By.ID, 'more-menu-button')
    selected_more_button = (By.ID, 'selected-data-more-menu')
    add_data_point_button = (By.ID, 'add-data-point')
    stage_publish_button = (By.ID, 'stage-for-publishing')
    
    def add_new_record(self):
        self.find_element(self.add_new_record_button).click()
    
    def load_existing_record(self):
        self.find_element(self.load_existing_record_button).click()

    def more(self):
        self.find_element(self.more_button).click()
    
    def selected_more(self):
        self.find_element(self.selected_more_button).click()
    
    def add_data_point(self):
        self.find_element(self.add_data_point_button).click()

    def stage_for_publishing(self):
        stage = WebDriverWait(self.driver, 20).until(
        EC.element_to_be_clickable((By.ID, "stage-for-publishing")))
        stage.click();
        
class AddNewRecordPage(Page):
    check_data_upload_button = (By.ID, 'check-data-upload')
    create_record_manually_button = (By.ID, 'create-record-manually')
    
    def upload_data(self):
        self.find_element(self.check_data_upload_button).click()
    
    def create_manually(self):
        create_manual = WebDriverWait(self.driver, 60).until(
        EC.element_to_be_clickable((By.ID, "create-record-manually")))
        create_manual.click();
    
class AddDataToRecordPage(Page):
    search_location = (By.ID, 'search-location')
    select_from_map_button = (By.ID, 'select-from-map')
    date_picker = (By.ID, 'time')
    duration_hours = (By.NAME, 'durationHours')
    duration_minutes = (By.NAME, 'durationMinutes')
    cancel_point_button = (By.ID, 'cancel-point')
    save_data_button = (By.ID, 'save-data')
    close_point_editor_button = (By.ID, 'point-editor-close')
    edit_record_button = (By.ID, 'edit-record-id')
    mapbox = (By.CLASS_NAME, 'mapboxgl-map')
    
    def enter_location(self, location):
        self.find_element(self.search_location).send_keys(location)

    def select_from_map(self):
        self.find_element(self.select_from_map_button).click()
    
    def use_location(self):
        use_location_button = WebDriverWait(self.driver, 30).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "locationSelect_popupButton__yCype")))
        use_location_button.click();
    
    def use_location_on_map(self):
        actionChains = ActionChains(self.driver)
        actionChains.context_click(self.find_element(self.mapbox)).perform()
        self.use_location()        
        
    def enter_date(self, date):
        self.find_element(self.date_picker).send_keys(date)

    def enter_duration_hours(self, hours):
        self.find_element(self.duration_hours).send_keys(hours)

    def enter_duration_minutes(self, minutes):
        self.find_element(self.duration_minutes).send_keys(minutes)

    def save_data(self):
        self.find_element(self.save_data_button).click()
        
    def close(self):
        self.find_element(self.close_point_editor_button).click()
    
    def cancel(self):
        self.find_element(self.cancel_point_button).click()
    
    def add_data_point(self, location, date, hours, minutes):
        contact_trace_page = ContactTracePage(self.driver)
        contact_trace_page.add_data_point()
        self.enter_location(location)
        self.enter_date(date)
        self.enter_duration_hours(hours)
        self.enter_duration_minutes(minutes)
    
    def add_data_point_select_on_map(self, date, hours, minutes):
        contact_trace_page = ContactTracePage(self.driver)
        contact_trace_page.add_data_point()
        self.use_location_on_map()
        self.enter_date(date)
        self.enter_duration_hours(hours)
        self.enter_duration_minutes(minutes)
    
class StageForPublishingPage(Page):
    yes_consent_button = (By.ID, 'yes-consent')
    no_consent_button = (By.ID, 'no-consent')
    
    def yes_consent(self):
        yes = WebDriverWait(self.driver, 20).until(
        EC.element_to_be_clickable((By.ID, "yes-consent")))
        yes.click();
    
    def no_consent(self):
        no = WebDriverWait(self.driver, 20).until(
        EC.element_to_be_clickable((By.ID, "no-consent")))
        no.click();
    
    def stage_no_consent(self):
        contact_trace_page = ContactTracePage(self.driver)
        contact_trace_page.stage_for_publishing()
        self.no_consent()
    
    def stage_yes_consent(self):
        contact_trace_page = ContactTracePage(self.driver)
        contact_trace_page.stage_for_publishing()
        self.yes_consent()
    
class PublishDataPage(Page):
    load_data_button = (By.ID, 'load-data-for-publishing')
    publish_data_button = (By.ID, 'publish-data')
    
    def load_data(self):
        self.find_element(self.load_data_button).click()

    def open_selected(self):
        open_selected_button = WebDriverWait(self.driver, 30).until(
        EC.element_to_be_clickable((By.ID, "open-selected-data")))
        open_selected_button.click();
        
    def submit_for_publishing(self):
        submit_publish_button = WebDriverWait(self.driver, 30).until(
        EC.element_to_be_clickable((By.ID, "submit-data-publishing")))
        submit_publish_button.click();
    
    def publish_data(self):
        self.find_element(self.publish_data_button).click()
    
class SelectDataPage(Page):

    def select_item(self):
        checkbox = self.driver.find_element_by_xpath("//*[@id='records-table']/tbody/tr/th/div/label")
        self.driver.execute_script("arguments[0].click();", checkbox)
    
    def open_selected(self):
        open_selected_button = WebDriverWait(self.driver, 30).until(
        EC.element_to_be_clickable((By.ID, "open-selected-data")))
        open_selected_button.click();

    
class SubmitDataPage(Page):
    submit_button = (By.CSS_SELECTOR, '#root > div > div.styles_modalWrapper__1jdE8 > div > div > div.PublishData_PublishDataActions__1OVeJ > button:nth-child(1)')
    cancel_button = (By.CSS_SELECTOR, '#root > div > div.styles_modalWrapper__1jdE8 > div > div > div.PublishData_PublishDataActions__1OVeJ > button.styles_button__1QQUp.styles_buttonLarge__8_wA9.styles_buttonSecondary__3onvZ.undefined')

    def submit(self):
        self.find_element(self.submit_button).click()
    
    def cancel(self):
        self.find_element(self.cancel_button).click()
    
class SettingsPage(Page):
    configuration_button = (By.XPATH, '//a[@href="/settings/organizatio"]')
    logout_button = (By.ID, 'logout')
    health_authority_name = (By.ID, 'name')
    information_website_URL = (By.ID, 'informationWebsiteUrl')
    reference_website_URL = (By.ID, 'referenceWebsiteUrl')
    api_endpoint = (By.ID, 'apiEndpoint')
    privacy_policy_URL = (By.ID, 'privacyPolicyUrl')
    data_retention_slider = (By.ID, 'day-slider')
    data_retention_slider_track = (By.CLASS_NAME, 'rc-slider-track')
    data_retention_slider_handle = (By.CLASS_NAME, 'rc-slider-handle')
    open_map_button = (By.ID, 'open-map')
    reset_gps_button = (By.ID, 'reset-gps')
    save_continue_button = (By.ID, 'save-continue')
    
    def set_health_authority_name(self, health_authority):
        self.find_element(health_authority_name).send_keys(health_authority)

    def set_information_website_URL(self, information_website):
        self.find_element(information_website_URL).send_keys(information_website)

    def set_reference_website_URL(self, reference_website):
        self.find_element(reference_website_URL).send_keys(reference_website)

    def set_api_endpoint(self, endpoint):
        self.find_element(api_endpoint).send_keys(endpoint)

    def set_privacy_policy_URL(self, privacy_policy):
        self.find_element(privacy_policy_URL).send_keys(privacy_policy)

    def set_retention_policy(self, percent):
        actionChains = ActionChains(self.driver)
        percent = '50'
        width = self.data_retention_slider_track.size['width']
        move.click_and_hold(self.sliderknob).move_by_offset(percent * width / 100, 0).release().perform()

    def open_map(self):
        self.find_element(open_map_button).click()
        
    def reset_gps_coordinates(self):
        self.find_element(reset_gps_button).click()
        
    def save_and_continue(self):
        self.find_element(save_continue_button).click()
 
    def configuration(self):
        self.find_element(configuration_button).click()
        
    def logout(self):
        self.find_element(logout_button).click()
    
    # in case we need to configure the settings every time the website is rebuilt, this can be added to ui_test.py
    def configure_settings_if_required(self):
        self.driver.implicitly_wait(3)
        self.set_health_authority_name('Test Health Authority')
        self.set_information_website_URL('https://cdc.gov')
        self.set_reference_website_URL('https://cdc.gov')
        self.set_api_endpoint('https://s3.aws.com/bucket_name/safepaths.json')
        self.set_privacy_policy_URL('https://www.cdc.gov/other/privacy.html')
        # set retention policy slider to 50% of the way across, which would be 15 days
        self.set_retention_policy('50')
        self.reset_gps_coordinates
        self.save_and_continue

class Tools:
    def compare_files(self, fname1, fname2):
        f1 = open(fname1)
        f2 = open(fname2)

        # Print confirmation
        print("-----------------------------------")
        print("Comparing files ", " > " + fname1, " < " +fname2, sep='\n')
        print("-----------------------------------")

        f1_line = f1.readline()
        f2_line = f2.readline()


        while f1_line != '' or f2_line != '':
            f1_line = f1_line.rstrip()
            f2_line = f2_line.rstrip()
            if f1_line != f2_line:
                assert False, "Files are not the same"
            f1_line = f1.readline()
            f2_line = f2.readline()

        f1.close()
        f2.close()
