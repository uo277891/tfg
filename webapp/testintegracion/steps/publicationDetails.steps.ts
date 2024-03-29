import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';

const feature = loadFeature('./features/PublicationDetails.feature');

let page: any;
let browser: any;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/login", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('Intertar dar me gusta a una publicacion', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string = "usuario1";
    let contraseña:string = "contraseña";

    given('Usuario identificado', async () => { 
        await page.goto("http://localhost:3000/login", {waitUntil: "networkidle0"}) 
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('Iniciar Sesión')
        await page.type('input[id=userName]', nombre)
        await page.type('input[id=password]', contraseña)
        await page.click("#inicioSesion")
    });

    when('Dar me gusta a la publicación', async () => {
        await delay(2500)
        await page.click("#pub0")
        let text = await page.evaluate(() => document.body.textContent);
        await delay(2500)
        await page.click("#meGusta")
        await delay(2500)
    });

    then('El sistema actualiza la lista de me gustas', async () => {
        let text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('1')
        await page.click("#meGusta")
        await delay(2500)
        text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('0')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

  function delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

});