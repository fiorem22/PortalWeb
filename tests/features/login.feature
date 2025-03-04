  Feature: login for utp portal

    @login
    Scenario Outline: login with valid username and password
      Given providing valid url
      When providing valid "<username>" and "<password>"
      Then clicking login button
      Then user should be logged in successfully

      Examples:

      | username   | password |
      | U24254650@ | 1234     |
      | U24220181@ | 1234     |