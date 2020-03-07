var {Given} = require('cucumber');
var {When} = require('cucumber');
var {Then} = require('cucumber');
var {expect} = require('chai');

var baseUrl = 'http://localhost:2368/ghost';
var user = 'se-mende@uniandes.edu.co';
var pw = 'Pruebas123';

Given('I go to ghost admin', () => {
    browser.url(baseUrl + '/#/signin');
});

Given('I go to the main site', () => {
    browser.url(baseUrl);
});

////////////// LOGIN //////////////
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

Then('I expect to see {string}', error => {
    $('.main-error').waitForDisplayed(5000);
    var alertText = browser.$('.main-error').getText();
    expect(alertText).to.include(error);
});

Then('I expect to enter the site', () => {
    $('.gh-nav-menu-details-blog').waitForDisplayed(5000);
    var title = browser.$('.gh-nav-menu-details-blog').getText();
    expect(title).to.include('Pruebas');
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