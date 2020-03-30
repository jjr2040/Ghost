Feature: Ghost page using BDT
    As an user I want to authenticate myself within Ghost admin module in order to use the program

#Scenario Outline: Login failed with wrong inputs
#    Given I go to ghost admin
#    When I fill with <email> and <password>
#    And I try to login
#    Then I expect to see <error>
#
#    Examples:
#    | email                         | password      | error                                     |
#    | wrong@uniandes.edu.co      | WrongPassword | "Access denied"             |

############# Registration and login #################
Scenario: Register works with right inputs
    Given I go to the main site
    When I create an admin account
    And I logout
    Then I expect to see login page

Scenario: Login works with right inputs
    Given I go to ghost admin
    When I fill credentials correctly
    And I try to login
    Then I expect to enter the site

############# Posts #################
Scenario: Navigation to posts
    Given I go to the main site
    When I click on posts
    Then I expect to see the posts page

Scenario: New Post
    Given I go to the main site
    When I click on posts
    And I click on new
    And I type a title and a content
    And I publish
    Then I expect to see it published

Scenario: Edit Post
    Given I go to the main site
    When I click on posts
    And I click on previously created post
    And I edit a title and a content
    And I publish
    Then I expect to see it published

Scenario: Delete Post
    Given I go to the main site
    When I click on posts
    And I click on previously created post
    And I delete it
    Then I expect to see the posts page

############# Pages #################
Scenario: Navigation to pages
    Given I go to the main site
    When I click on pages
    Then I expect to see the pages page

Scenario: New Page
    Given I go to the main site
    When I click on pages
    And I click on new
    And I type a title and a content
    And I publish
    Then I expect to see it published

Scenario: Edit Page
    Given I go to the main site
    When I click on pages
    And I click on previously created page
    And I edit a title and a content
    And I publish
    Then I expect to see it published

Scenario: Delete Page
    Given I go to the main site
    When I click on pages
    And I click on previously created post
    And I delete it
    Then I expect to see the pages page