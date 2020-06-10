const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		slowMo: 50
	});
	const page = await browser.newPage();
	await page.goto('http://localhost:3000/');
	await page.type('#email', 'fakeMail@yahoo.com');
	await page.type('#password', 'blabla123');
	await page.click('#root > div > div > div > button');
	await page.screenshot({path: 'firstTest.png'});
	console.log('- First test with a no good email and a no good password done.\nThe proof of the error message is in the screenshot \'firstTest.png\'');
	await page.reload();
	await page.type('#email', 'mon_mail@test.com');
	await page.type('#password', 'abc123!');
	await page.click('#root > div > div > div > button');
	await page.screenshot({path: 'secondTest.png'});
	console.log('- Second test with a good email and a good password done.\nThe proof is in the screenshot \'secondTest.png\'');
	await browser.close();
})();