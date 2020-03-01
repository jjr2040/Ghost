const timeout = 90000;

beforeAll(async () => {
    jest.setTimeout(20000);
    await page.setViewport({ width: 1366, height: 768});
    await page.goto(URL, {waitUntil: 'networkidle0'});
});

describe('Ghost Tags', () => {
    test('Navigate to Tags page', async () => {
        let page = await initPage();

        await page.click('a[data-test-nav="tags"]');

        const h2Handle = await page.$("h2");
        const html = await page.evaluate(h2Handle => h2Handle.innerHTML, h2Handle);

        expect(html).toBe("Tags");
        page.close();
    }, timeout);

    test('Create Tag', async () => {
        let page = await initPage();

        await page.click('a[data-test-nav="tags"]');
        await page.waitFor(1000);

        await page.click('.gh-btn-green');
        await page.waitFor(1000);

        await page.type('input[name="name"]', "test", {delay: 100});
        await page.type('textarea[name="description"]', "test", {delay: 100});

        await page.click('.gh-btn-blue');

        await expect(page).toMatch("Saved", {timeout: 10000});

        page.close();
    }, timeout);

    test('Edit Tag', async () => {
        let page = await initPage();

        await page.click('a[data-test-nav="tags"]');
        await page.waitFor(1000);
        await page.click('p:nth-child(2)');
        await page.waitFor(1000);

        await page.type('input[name="name"]', "edited", {delay: 100});
        await page.type('textarea[name="description"]', "edited", {delay: 100});

        await page.click('.gh-btn-blue');

        await expect(page).toMatch("Saved", {timeout: 10000});

        page.close();
    }, timeout);

    test('Delete Tag', async () => {
        let page = await initPage();

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