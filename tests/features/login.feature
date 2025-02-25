Feature: login for utp portal

  @login
  Scenario: login with valid username and password
    Given providing valid url
    When providing valid username and password
    Then clicking login button
    Then user should be logged in successfully