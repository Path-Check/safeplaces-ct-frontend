from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import ElementNotInteractableException

class Page(object):
    """
    Base class that all page models can inherit from
    """
    def __init__(self, selenium_driver, base_url='http://localhost:80/'):
        self.base_url = base_url
        self.driver = selenium_driver
        self.timeout = 30
        self.driver.implicitly_wait(30)
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

    def open_page(self):
        self.open("")
        assert "Safe Places" in self.driver.title, self.driver.title
        #assert "React" in self.driver.title, self.driver.title

    def setup_case(self):
        self.find_element(self.btn_setup_case).click()

    def open_redactor(self):
        self.find_element(self.loc_scrubber).click()

class LoginPage(Page):
    username = (By.ID, 'username')
    password = (By.ID, 'password')
    login_btn = (By.ID, 'login')
    api_key = (By.ID, 'api-key')
    submit = (By.ID, 'submit')

    def login_if_required(self):
        self.driver.implicitly_wait(3)

        try:
            self.find_element(self.username).send_keys("admin")
            self.find_element(self.password).send_keys("admin")
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
    add_entry_btn = (By.CSS_SELECTOR, '#root > div > div > div.styles_sidebar__28L4X > div.styles_toolbar__3nYxc > a > button')
    delete_inspected_btn = (By.CSS_SELECTOR, '#root > div > div > div.styles_sidebar__28L4X > div.styles_toolbar__3nYxc > button:nth-child(2)')
    select_all_btn = (By.CSS_SELECTOR, '#root > div > div > div.styles_sidebar__28L4X > div.styles_toolbar__3nYxc > button:nth-child(3) > svg')
    select_none_btn = (By.CSS_SELECTOR, '#root > div > div > div.styles_sidebar__28L4X > div.styles_toolbar__3nYxc > button:nth-child(4)')

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
        
    def add_entry(self):
        self.find_element(self.add_entry_btn).click()

    def delete_inspected(self):
        self.find_element(self.delete_inspected_btn).click()
        
    def select_all(self):
        self.find_element(self.select_all_btn).click()
        
    def select_none(self):
        self.find_element(self.select_none_btn).click()

class NewPointEditor:
    dateInput = (By.NAME, 'date')
    timeInput = (By.NAME, 'time')
    searchAddress = (By.CSS_SELECTOR, '#root > div > div > div.styles_editor__1yYbN > form > div.styles_content__1vUjG > div:nth-child(2) > div > input')
    latitude = (By.NAME, 'latitude')
    longitude = (By.NAME, 'longitude')
    street = (By.NAME, 'street')
    other = (By.NAME, 'other')
    town = (By.NAME, 'town')
    postalCode = (By.NAME, 'postal')
    comment = (By.NAME, 'comment')
    add_tracks_btn = (By.CSS_SELECTOR, '#root > div > div > div.styles_editor__1yYbN > form > div.styles_content__1vUjG > button')
    pick_location_btn = (By.CSS_SELECTOR, '#root > div > div > div.styles_editor__1yYbN > form > div.styles_content__1vUjG > div.styles_position__2ql7M > span:nth-child(3) > button > svg')
    get_coordinates_btn = (By.CSS_SELECTOR, '#root > div > div > div.styles_editor__1yYbN > form > div.styles_content__1vUjG > div.styles_position__2ql7M > span:nth-child(4) > button > svg')
    
    def enter_date(self, date):
        self.find_element(self.dateInput).send_keys(date)

    def enter_date(self, date):
        self.find_element(self.dateInput).send_keys(date)

    def enter_address(self, address):
        self.find_element(self.searchAddress).send_keys(address)

    def enter_latitude(self, latitude):
        self.find_element(self.timeInput).send_keys(latitude)

    def enter_longitude(self, date):
        self.find_element(self.timeInput).send_keys(longitude)

    def enter_street(self, street):
        self.find_element(self.timeInput).send_keys(street)

    def enter_other(self, date):
        self.find_element(self.timeInput).send_keys(other)

    def enter_town(self, date):
        self.find_element(self.timeInput).send_keys(town)

    def enter_postal_code(self, date):
        self.find_element(self.timeInput).send_keys(postal_code)

    def enter_comment(self, date):
        self.find_element(self.timeInput).send_keys(comment)

    def pick_location(self):
        self.find_element(pick_location_btn).click()

    def get_coordinates(self):
        self.find_element(get_coordinates_btn).click()

    def add_tracks(self):
        self.find_element(add_tracks_btn).click()

class IndividualDataPoint:
    entry_selectbox = (By.CSS_SELECTOR, '#root > div > div > div.styles_sidebar__28L4X > div.styles_sidebarContent__3-5j0 > div > div.wfp--form-item.wfp--checkbox-wrapper.styles_checkbox__3IQ4N > label')
    entry_editbox = (By.CSS_SELECTOR, '#root > div > div > div.styles_sidebar__28L4X > div.styles_sidebarContent__3-5j0 > div > div.styles_itemInner__3xvEO > div.styles_buttons__1phBJ > button:nth-child(1) > svg')
    
    def select_entry(self):
        self.find_element(entry_selectbox).click()

    def edit_entry(self):
        self.find_element(entry_editbox).click()

class Settings:
    health_authority_name = (By.ID, 'name')
    information_website_URL = (By.ID, 'informationWebsiteUrl')
    reference_website_URL = (By.ID, 'referenceWebsiteUrl')
    api_endpoint = (By.ID, 'apiEndpoint')
    privacy_policy_URL = (By.ID, 'privacyPolicyUrl')
    data_retention_slider_handle = (By.CSS_SELECTOR, '#root > div > div > div > div > form > div:nth-child(6) > div > div > div.rc-slider-handle')
    reset_gps_button = (By.CSS_SELECTOR, '#root > div > div > form > div:nth-child(7) > div > button')
    save_continue_button = (By.CSS_SELECTOR, '#root > div > div > form > button')
    
    def set_health_authority_name(self):
        self.find_element(health_authority_name).send_keys(health_authority)

    def set_information_website_URL(self):
        self.find_element(information_website_URL).send_keys(information_website)

    def set_reference_website_URL(self):
        self.find_element(reference_website_URL).send_keys(reference_website)

    def set_api_endpoint(self):
        self.find_element(api_endpoint).send_keys(endpoint)

    def set_privacy_policy_URL(self):
        self.find_element(privacy_policy_URL).send_keys(privacy_policy)

    def reset_gps_coordinates(self):
        self.find_element(reset_gps_button).click()
        
    def save_and_continue(self):
        self.find_element(save_continue_button).click()
        
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

