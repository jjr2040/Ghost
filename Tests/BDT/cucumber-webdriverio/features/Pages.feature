Feature: Pages
    As an user I want to be able to create pages, edit, and delete them

Scenario: Navigation to pages
    Given I go to ghost admin and login
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
    Then I expect to see the posts page