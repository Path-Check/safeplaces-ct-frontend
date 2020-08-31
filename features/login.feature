Feature: Login & Authentication
  
  Scenario: Failed login
    
    Given I open a browser to the login page
    When I enter an e-mail address of "tester@pathckeck.org"
    And I enter a password
    And I click the Login button
    Then I expect to see a Toast alert containing "Something went wrong"