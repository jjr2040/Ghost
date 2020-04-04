var {Given} = require('cucumber');
var {When} = require('cucumber');
var {Then} = require('cucumber');
var {expect} = require('chai');

var baseUrl = 'http://localhost:2368/ghost';
var username = 'admin';
var user = 'admin@test.com';
var pw = 'admin12345';

Given('I go to ghost admin', () => {
    browser.url(baseUrl + '/#/signin');
});

Given('I go to the main site', () => {
    browser.url(baseUrl);
});

////////////// LOGIN //////////////
When('I create an admin account', () => {
    $('span:nth-child(1)').waitForDisplayed(5000);
    var btnCreateAccount = $('span:nth-child(1)');
    browser.waitUntil(() => btnCreateAccount.isClickable());
    btnCreateAccount.click();

    $('input[name="blog-title"]').waitForDisplayed(5000);

    var titleInput = $('input[name="blog-title"]');
    browser.waitUntil(() => titleInput.isClickable());
    titleInput.click();
    titleInput.setValue(username);

    var nameInput = $('input[name="name"]');
    browser.waitUntil(() => nameInput.isClickable());
    nameInput.click();
    nameInput.setValue(username);

    var emailInput = $('input[name="email"]');
    browser.waitUntil(() => emailInput.isClickable());
    emailInput.click();
    emailInput.setValue(user);

    var passwordInput = $('input[name="password"]');
    browser.waitUntil(() => passwordInput.isClickable());
    passwordInput.click();
    passwordInput.setValue(pw);

    var submitBtn = $('button[type="submit"]');
    browser.waitUntil(() => submitBtn.isClickable());
    submitBtn.click();

    $('.gh-flow-skip').waitForDisplayed(5000);
    var skipBtn = $('.gh-flow-skip');
    browser.waitUntil(() => skipBtn.isClickable());
    skipBtn.click();
});

When(/^I fill with (.*) and (.*)$/ , (email, password) => {
    var mailInput = $('input[name="identification"]');
    browser.waitUntil(() => mailInput.isClickable());
    mailInput.click();
    mailInput.setValue(email);

    var passwordInput = $('input[name="password"]');
    browser.waitUntil(() => passwordInput.isClickable());
    passwordInput.click();
    passwordInput.setValue(password);
});

When('I fill credentials correctly', () => {
    var mailInput = $('input[name="identification"]');
    browser.waitUntil(() => mailInput.isClickable());
    mailInput.click();
    mailInput.setValue(user);

    var passwordInput = $('input[name="password"]');
    browser.waitUntil(() => passwordInput.isClickable());
    passwordInput.click();
    passwordInput.setValue(pw);
});

When('I try to login', () => {
    $('.login').click();
});

When('I logout', () => {
    $('.gh-user-name').waitForDisplayed(5000);
    var userBtn = $('.gh-user-name');
    browser.waitUntil(() => userBtn.isClickable());
    userBtn.click();

    $('.user-menu-signout').waitForDisplayed(5000);
    var signoutBtn = $('.user-menu-signout');
    browser.waitUntil(() => signoutBtn.isClickable());
    signoutBtn.click();
});

Then('I expect to see {string}', error => {
    $('.main-error').waitForDisplayed(5000);
    var alertText = browser.$('.main-error').getText();
    expect(alertText).to.include(error);
});

Then('I expect to enter the site', () => {
    $('.gh-nav-menu-details-blog').waitForDisplayed(5000);
    var title = browser.$('.gh-nav-menu-details-blog').getText();
    expect(title).to.include('admin');
});

Then('I expect to see login page', () => {
    $('.login').waitForDisplayed(5000);
    var btnText = browser.$('.login span').getText();
    expect(btnText).to.include('Sign in');
});

////////////// Posts //////////////
Given('I go to ghost admin and login', () => {
    browser.url(baseUrl + '/#/signin');
    var mailInput = $('input[name="identification"]');
    browser.waitUntil(() => mailInput.isClickable());
    mailInput.click();
    mailInput.setValue(user);

    var passwordInput = $('input[name="password"]');
    browser.waitUntil(() => passwordInput.isClickable());
    passwordInput.click();
    passwordInput.setValue(pw);
    $('.login').click();
    $('.gh-nav-menu-details-blog').waitForDisplayed(5000);
});

When('I click on posts', () => {
    $('a[data-test-nav="posts"]').click();
});

When('I click on new', () => {
    $('.gh-btn-green').click();
});

When('I click on previously created post', () => {
    $('p:nth-child(2)').click();
});

When('I type a title and a content', () => {
    var title = $('.gh-editor-title');
    browser.waitUntil(() => title.isClickable());
    title.click();
    title.setValue('Test title');

    var content = $('.koenig-editor__editor');
    browser.waitUntil(() => content.isClickable());
    content.click();
    content.setValue('Test content');
});

When('I edit a title and a content', () => {
    var title = $('.gh-editor-title');
    browser.waitUntil(() => title.isClickable());
    title.click();
    title.setValue('Edited title');

    var content = $('.koenig-editor__editor');
    browser.waitUntil(() => content.isClickable());
    content.click();
    content.setValue('Edited content');
});

When('I publish', () => {
    var publishMenu = $('.gh-publishmenu-trigger');
    publishMenu.click();
    var publishButton = $('.gh-publishmenu-button');
    browser.waitUntil(() => publishButton.isClickable());
    publishButton.click();
});

When('I delete it', () => {
    var settingsButton = $('.post-settings');
    browser.waitUntil(() => settingsButton.isClickable());
    settingsButton.click();

    var deleteButton = $('.settings-menu-delete-button');
    browser.waitUntil(() => deleteButton.isClickable());
    deleteButton.click();

    var confirmButton = $('.gh-btn-red');
    browser.waitUntil(() => confirmButton.isClickable());
    confirmButton.click();
});

Then('I expect to see the posts page', () => {
    $('.gh-canvas-title').waitForDisplayed(5000);
    var pageTitle = $('.gh-canvas-title');
    var pageText = pageTitle.$('a').getText();

    expect(pageText).to.include('Posts');
});

Then('I expect to see it published', () => {
    var publishedButton = $('.gh-btn-green');
    publishedButton.waitForDisplayed(5000);
    expect(publishedButton).to.exist;
});

////////////// Pages //////////////
When('I click on pages', () => {
    $('a[data-test-nav="pages"]').click();
});

When('I click on previously created page', () => {
    $('p:nth-child(2)').click();
});

Then('I expect to see the pages page', () => {
    $('.gh-canvas-title').waitForDisplayed(5000);
    var pageTitle = $('.gh-canvas-title');
    var pageText = pageTitle.$('a').getText();

    expect(pageText).to.include('Pages');
});