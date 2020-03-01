const timeout = 90000;

beforeAll(async () => {
    jest.setTimeout(20000);
    await page.setViewport({ width: 1366, height: 768});
    await page.goto(URL, {waitUntil: 'networkidle0'});
});

describe('Ghost Posts', () => {
    test('Navigate to posts page', async () => {
        let page = await initPage();

        await page.click('a[data-test-nav="posts"]');

        const h2Handle = await page.$("h2");
        const html = await page.evaluate(h2Handle => h2Handle.innerHTML, h2Handle);

        expect(html).toBe("Posts");
        page.close();
    }, timeout);

    test('Create Post', async () => {
        let page = await initPage();

        await page.click('a[data-test-nav="new-story"]');

        await page.type('.gh-editor-title', "New post title", {delay: 100});
        await page.type('.koenig-editor__editor', "New post content", {delay: 100});

        await page.click('.gh-publishmenu-trigger');
        await page.waitFor(1000);

        await page.click('.gh-publishmenu-button');

        await expect(page).toMatch("Published", {timeout: 10000});

        page.close();
    }, timeout);

    test('Edit Post', async () => {
        let page = await initPage();

        await page.click('a[data-test-nav="posts"]');
        await page.waitFor(1000);
        await page.click('p:nth-child(2)');

        await page.type('.gh-editor-title', " Edited", {delay: 100});
        await page.type('.koenig-editor__editor', " Edited", {delay: 100});

        await page.click('.gh-publishmenu-trigger');
        await page.waitFor(1000);

        await page.click('.gh-publishmenu-button');

        await expect(page).toMatch("Published", {timeout: 10000});

        page.close();
    }, timeout);

    test('Delete Post', async () => {
        let page = await initPage();

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

async function initPage()
{
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
    await page.goto(URL, {waitUntil: 'networkidle0'});
    await page.setViewport({ width: 1366, height: 768});

    await checkIfNotLoggedIn(page);

    return page;
}

async function checkIfNotLoggedIn(page){
    if (await page.$('.login') !== null){
        await page.type('input[name="identification"]', Username);
        await page.type('input[name="password"]', Password);

        await page.click('.login');
    }
    await page.waitFor(2000);
}