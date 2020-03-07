Feature: Login into ghost
    As an user I want to authenticate myself within Ghost admin module in order to use the program

Scenario Outline: Login failed with wrong inputs
    Given I go to ghost admin
    When I fill with <email> and <password>
    And I try to login
    Then I expect to see <error>

    Examples:
    | email                         | password      | error                                     |
    | wrong@uniandes.edu.co      | WrongPassword | "Access denied"             |

Scenario: Login works with right inputs
    Given I go to ghost admin
    When I fill credentials correctly
    And I try to login
    Then I expect to enter the site