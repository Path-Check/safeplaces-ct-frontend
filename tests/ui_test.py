import pytest
from selenium import webdriver
from tests.page_objects import EntryPage, LoginPage, ContactTracePage, AddNewRecordPage, AddDataToRecordPage, StageForPublishingPage, PublishDataPage, SelectDataPage, SettingsPage, Tools
import unittest
import os


class TestRedaction:

    def test_app_loads(self, setup_env):
        entry_page = EntryPage(
            setup_env['driver'], base_url=setup_env['base_url'])
        entry_page.open_page()

    def test_invalid_login(self, setup_env):
        entry_page = EntryPage(
            setup_env['driver'], base_url=setup_env['base_url'])
        entry_page.open_page()
        login_page = LoginPage(setup_env['driver'])
        login_page.login_invalid()
        # confirm we're still at the login page by confirming that we can still enter an invalid login
        login_page.login_invalid()

    @pytest.mark.skip(reason="under development")
    def test_contact_trace(self, setup_env):
        entry_page = EntryPage(
            setup_env['driver'], base_url=setup_env['base_url'])
        entry_page.open_page()
        login_page = LoginPage(setup_env['driver'])
        login_page.login_if_required()
        entry_page.open_trace()
        contact_trace_page = ContactTracePage(setup_env['driver'])
        contact_trace_page.add_new_record()
        add_record_page = AddNewRecordPage(setup_env['driver'])
        add_record_page.create_manually()
        contact_trace_page.add_data_point()
        # start to add a point and cancel editing the point
        # if the test works this far, we can expand it later
        point_editor_page = AddDataToRecordPage(setup_env['driver'])
        point_editor_page.enter_location(
            '-122.19732036472264, 37.718665250290684')
        point_editor_page.enter_date('06/18/2020 07:00')
        point_editor_page.enter_duration_hours('0')
        point_editor_page.enter_duration_minutes('40')
        point_editor_page.cancel()

        # add a point again but this time save the data
        # point_editor_page.add_data_point('-122.19732036472264, 37.718665250290684','06/08/2020 07:00\r\n', '\t', '20')
        # point_editor_page.save_data()

        # add a point by selecting the location on the map and saving the data
        point_editor_page.add_data_point_select_on_map(
            '07/08/2020 07:00AM\r\n\t', '1\t', '20\t')
        point_editor_page.save_data()
        # point_editor_page.cancel()

        contact_trace_page.stage_for_publishing()
        stage_publish_page = StageForPublishingPage(setup_env['driver'])
        stage_publish_page.no_consent()
        contact_trace_page.stage_for_publishing()
        stage_publish_page.yes_consent()

    def test_publish(self, setup_env):
        entry_page = EntryPage(
            setup_env['driver'], base_url=setup_env['base_url'])
        entry_page.open_page()
        login_page = LoginPage(setup_env['driver'])
        login_page.login_if_required()
        entry_page.open_publish()
        publish_data_page = PublishDataPage(setup_env['driver'])
        # sleep(10)
        publish_data_page.load_data()
        select_data_page = SelectDataPage(setup_env['driver'])
        select_data_page.select_item()
        select_data_page.open_selected()
        publish_data_page.submit_for_publishing()

        # logout
        # entry_page.open_settings()
        # settings_page = SettingsPage(self.driver)
        # settings_page.logout

    @pytest.mark.skip("leaving test_ out of the method name until the SUT works")
    def test_settings(self, setup_env):
        login_page = LoginPage(setup_env['driver'])
        login_page.login_if_required()
        entry_page = EntryPage(
            setup_env['driver'], base_url=setup_env['base_url'])
        entry_page.open_page()
        entry_page.open_settings()
        settings_page = SettingsPage(setup_env['driver'])
        settings_page.set_health_authority_name('Test Health Authority')
        settings_page.set_information_website_URL('https://cdc.gov')
        settings_page.set_reference_website_URL('https://cdc.gov')
        settings_page.set_api_endpoint(
            'https://s3.aws.com/bucket_name/safepaths.json')
        settings_page.set_privacy_policy_URL(
            'https://www.cdc.gov/other/privacy.html')
        # set retention policy slider to 50% of the way across, which would be 15 days
        settings_page.set_retention_policy('50')
        settings_page.reset_gps_coordinates
        settings_page.save_and_continue

    def tearDown(self, setup_env):
        setup_env['driver'].close()
