from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import ElementNotInteractableException

class Page(object):
    """
    Base class that all page models can inherit from
    """
    def __init__(self, selenium_driver, base_url='http://localhost:8080/'):
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
    loc_scrubber = (By.XPATH, '//a[@href="./location-scrubber/index.html"]')

    def open_page(self):
        self.open("")
        assert "Safe Places" in self.driver.title

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
        except ElementNotInteractableException as e:
            pass

        try:
            self.find_element(self.api_key).click()
            self.find_element(self.api_key).send_keys('AIzaSyBvm-T7hqlAtAcQqPy0nOS1CSmXJQeZSPI')
            self.find_element(self.submit).click()
        except ElementNotInteractableException as e:
            pass

        self.driver.implicitly_wait(30)


class RedactionPage(Page):
    load_file_btn = (By.XPATH, '//*[@id="privatekitJSON"]')
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
