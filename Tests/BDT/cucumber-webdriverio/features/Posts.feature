Feature: Posts
    As an user I want to be able to create posts, edit, and delete them

Scenario: Navigation to posts
    Given I go to ghost admin and login
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