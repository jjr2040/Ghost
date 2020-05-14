const timeout = 90000;

beforeAll(async () => {
    jest.setTimeout(20000);
    await page.setViewport({ width: 1366, height: 768});
    await page.goto(URL, {waitUntil: 'networkidle0'});
});

///////////// Login ////////////
describe('Ghost Login', () => {
    test('Wrong Login', async () => {
        let page = await initPage(0);

        await page.type('input[name="identification"]', 'wrong login');
        await page.type('input[name="password"]', 'wrong password');

        await page.click('.login');

        await expect(page).toMatch('Please fill out the form to sign in', {timeout: 10000});
        page.close();
    }, timeout);

    test('No username', async () => {
        let page = await initPage(0);

        await page.type('input[name="password"]', 'wrong password');

        await page.click('.login');

        await expect(page).toMatch('Please fill out the form to sign in.', {timeout: 10000});
        page.close();
    }, timeout);

    test('No password', async () => {
        let page = await initPage(0);

        await page.type('input[name="identification"]', 'wrong login');

        await page.click('.login');

        await expect(page).toMatch('Please fill out the form to sign in.', {timeout: 10000});
        page.close();
    }, timeout);

    test('Happy path :)', async () => {
        let page = await initPage(0);

        await page.type('input[name="identification"]', Email);
        await page.type('input[name="password"]', Password);

        await page.click('.login');

        await expect(page).toMatch(Username, {timeout: 10000});
        page.close();
    }, timeout);
});

///////////// Posts ////////////
describe('Ghost Posts', () => {
    test('Navigate to posts page', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="posts"]');

        const h2Handle = await page.$("h2 a");
        const html = await page.evaluate(h2Handle => h2Handle.innerHTML, h2Handle);

        expect(html).toBe("Posts");
        page.close();
    }, timeout);

    test('Create Post', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="new-story"]');

        await page.click('.gh-editor-title');
        await page.type('.gh-editor-title', "New post title");
        await page.click('.koenig-editor__editor');
        await page.type('.koenig-editor__editor', "New post content");

        await page.click('.gh-publishmenu-trigger');
        await page.waitFor(1000);

        await page.click('.gh-publishmenu-button');

        await expect(page).toMatch("Published", {timeout: 10000});

        page.close();
    }, timeout);

    test('Edit Post', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="posts"]');
        await page.waitFor(1000);
        await page.click('p:nth-child(2)');

        await page.click('.gh-editor-title', {clickCount: 3});
        await page.type('.gh-editor-title', "Edited Post Title");
        await page.click('.koenig-editor__editor', {clickCount: 3});
        await page.type('.koenig-editor__editor', "Edited Post Content");

        await page.click('.gh-publishmenu-trigger');
        await page.waitFor(1000);

        await page.click('.gh-publishmenu-button');

        await expect(page).toMatch("Published", {timeout: 10000});

        page.close();
    }, timeout);

    test('Edit Post with phrase that contains accents', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="posts"]');
        await page.waitFor(1000);
        await page.click('p:nth-child(2)');

        await page.click('.koenig-editor__editor', {clickCount: 3});
        await page.type('.koenig-editor__editor', "Ávido de ver cómo funcionan las tildes normales!");

        await page.click('.gh-publishmenu-trigger');
        await page.waitFor(1000);

        await page.click('.gh-publishmenu-button');

        await expect(page).toMatch("Published", {timeout: 10000});

        page.close();
    }, timeout);

    test('Delete Post', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="posts"]');
        await page.waitFor(1000);
        await page.click('p:nth-child(2)');
        await page.waitFor(1000);

        await page.click('.post-settings');
        await page.waitFor(1000);

        await page.click('.settings-menu-delete-button');
        await page.waitFor(1000);

        await page.click('.gh-btn-red');
        await page.waitFor(1000);

        page.close();
    }, timeout);
});

///////////// Pages ////////////
describe('Ghost Pages', () => {
    test('Navigate to Pages page', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="pages"]');

        const h2Handle = await page.$("h2 a");
        const html = await page.evaluate(h2Handle => h2Handle.innerHTML, h2Handle);

        expect(html).toBe("Pages");
        page.close();
    }, timeout);

    test('Create Page', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="pages"]');
        await page.waitFor(1000);

        await page.click('.gh-btn-green');
        await page.waitFor(1000);

        await page.type('.gh-editor-title', "New page title");
        await page.type('.koenig-editor__editor', "New page content");

        await page.click('.gh-publishmenu-trigger');
        await page.waitFor(1000);

        await page.click('.gh-publishmenu-button');

        await expect(page).toMatch("Published", {timeout: 10000});

        page.close();
    }, timeout);

    test('Edit Page', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="pages"]');
        await page.waitFor(1000);
        await page.click('p:nth-child(2)');

        await page.type('.gh-editor-title', " Edited");
        await page.type('.koenig-editor__editor', " Edited");

        await page.click('.gh-publishmenu-trigger');
        await page.waitFor(1000);

        await page.click('.gh-publishmenu-button');

        await expect(page).toMatch("Published", {timeout: 10000});

        page.close();
    }, timeout);

    test('Edit Page with markdown code', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="pages"]');
        await page.waitFor(1000);
        await page.click('p:nth-child(2)');

        await page.click('.koenig-editor__editor', {clickCount: 3});
        await page.keyboard.press('Backspace');
        await page.waitFor(1000);
        await page.click('.stroke-middarkgrey');
        await page.waitFor(1000);
        await page.click('.flex:nth-child(3) .w8 path:nth-child(1)');
        await page.waitFor(1000);
        await page.click('.CodeMirror-code');
        await page.waitFor(1000);
        await page.type('.CodeMirror-code', "## Testing markdown with `code`");

        await page.click('.gh-publishmenu-trigger');
        await page.waitFor(1000);

        await page.click('.gh-publishmenu-button');

        await expect(page).toMatch("Published", {timeout: 10000});

        page.close();
    }, timeout);

    test('Delete Page', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="pages"]');
        await page.waitFor(1000);
        await page.click('p:nth-child(2)');
        await page.waitFor(1000);

        await page.click('.post-settings');
        await page.waitFor(1000);

        await page.click('.settings-menu-delete-button');
        await page.waitFor(1000);

        await page.click('.gh-btn-red');
        await page.waitFor(1000);

        page.close();
    }, timeout);
});

///////////// Tags ////////////
describe('Ghost Tags', () => {
    test('Navigate to Tags page', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="tags"]');

        const h2Handle = await page.$("h2");
        const html = await page.evaluate(h2Handle => h2Handle.innerHTML, h2Handle);

        expect(html).toBe("Tags");
        page.close();
    }, timeout);

    test('Create Tag', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="tags"]');
        await page.waitFor(1000);

        await page.click('.gh-btn-green');
        await page.waitFor(1000);

        await page.type('input[name="name"]', "test");
        await page.type('textarea[name="description"]', "test");

        await page.click('.gh-btn-blue');

        await expect(page).toMatch("Saved", {timeout: 10000});

        page.close();
    }, timeout);

    test('Edit Tag', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="tags"]');
        await page.waitFor(1000);
        await page.click('p:nth-child(2)');
        await page.waitFor(1000);

        await page.type('input[name="name"]', "edited");
        await page.type('textarea[name="description"]', "edited");

        await page.click('.gh-btn-blue');

        await expect(page).toMatch("Saved", {timeout: 10000});

        page.close();
    }, timeout);

    test('Delete Tag', async () => {
        let page = await initPage(1);

        await page.click('a[data-test-nav="tags"]');
        await page.waitFor(1000);
        await page.click('p:nth-child(2)');
        await page.waitFor(1000);

        await page.click('.gh-btn-red');
        await page.waitFor(1000);

        await page.click('.gh-btn.gh-btn-red.gh-btn-icon.ember-view');
        await page.waitFor(1000);

        page.close();
    }, timeout);
});

async function initPage(type)
{
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
    await page.goto(URL, {waitUntil: 'networkidle0'});
    await page.setViewport({ width: 1366, height: 768});

    await checkIfRegistered(page);

    if(type == 0)
        await checkIfLoggedIn(page);
    else
        await checkIfNotLoggedIn(page);

    return page;
}

async function checkIfLoggedIn(page){
    if (await page.$('.login') === null){
        await page.click('.gh-user-name');
        await page.click('.user-menu-signout');
    }
    await page.waitFor(1000);
}

async function checkIfNotLoggedIn(page){
    if (await page.$('.login') !== null){
        await page.type('input[name="identification"]', Email);
        await page.type('input[name="password"]', Password);

        await page.click('.login');
    }
    await page.waitFor(1000);
}

async function checkIfRegistered(page) {
    const btnCreateAccount = await page.$("span:nth-child(1)");
    if(btnCreateAccount != null){
        const text = await page.evaluate(element => element.textContent, btnCreateAccount);
        if(text === "Create your account "){
            await btnCreateAccount.click();

            await page.type('input[name="blog-title"]', Username);
            await page.type('input[name="name"]', Username);
            await page.type('input[name="email"]', Email);
            await page.type('input[name="password"]', Password);

            await page.click('button[type="submit"]');
            await page.waitFor(2000);
            await page.click('.gh-flow-skip');
        }
    }
    await page.waitFor(1000);
}

