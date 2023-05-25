import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';

const feature = loadFeature('./features/Prueba.feature');

let page: any
let browser: any;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('Es una prueba', ({given,when,then}) => {
    jest.setTimeout(100000);

    given('Nada', () => { });

    when('Nada', async () => {
      await expect(page).toMatch('Red social de FreeStyle')
      await expect(page).toClick('button', { text: 'Registrarse' })
    });

    then('Nada', async () => {
      await expect(page).toMatch('Registrarse')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

