const timeout = 90000;

beforeAll(async () => {
    jest.setTimeout(20000);
    await page.setViewport({ width: 1366, height: 768});
    await page.goto(URL, {waitUntil: 'networkidle0'});
});

describe('Ghost Login', () => {
    test('Wrong Login', async () => {
        let page = await initPage();

        await page.type('input[name="identification"]', 'wrong login');
        await page.type('input[name="password"]', 'wrong password');

        await page.click('.login');

        await expect(page).toMatch('Please fill out the form to sign in', {timeout: 10000});
        page.close();
    }, timeout);

    test('No username', async () => {
        let page = await initPage();

        await page.type('input[name="password"]', 'wrong password');

        await page.click('.login');

        await expect(page).toMatch('Please fill out the form to sign in.', {timeout: 10000});
        page.close();
    }, timeout);

    test('No username', async () => {
        let page = await initPage();

        await page.type('input[name="identification"]', 'wrong login');

        await page.click('.login');

        await expect(page).toMatch('Please fill out the form to sign in.', {timeout: 10000});
        page.close();
    }, timeout);

    test('Happy path :)', async () => {
        let page = await initPage();

        await page.type('input[name="identification"]', Username);
        await page.type('input[name="password"]', Password);

        await page.click('.login');

        await expect(page).toMatch(Fullname, {timeout: 10000});
        page.close();
    }, timeout);
});

async function initPage()
{
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
    await page.goto(URL, {waitUntil: 'networkidle0'});
    await page.setViewport({ width: 1366, height: 768});

    await checkIfLoggedIn(page);

    return page;
}

async function checkIfLoggedIn(page){
    if (await page.$('.login') === null){
        await page.click('.gh-user-name');
        await page.click('.user-menu-signout');
    }
    await page.waitFor(2000);
}