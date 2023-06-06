import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';

const feature = loadFeature('./features/ExternProfile.feature');

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

  test('Intertar seguir a un usuario', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string = "usuario1";
    let contraseña:any = "contraseña";

    given('Usuario identificado y página de otro usuario', async () => { 
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('Iniciar Sesión')
        await page.type('input[id=userName]', nombre)
        await page.type('input[id=password]', contraseña)
        await page.click("#inicioSesion")
        await delay(1000)
        await page
        .goto("http://localhost:3000/profile/646a47415e73d6bf56559584", {
        waitUntil: "networkidle0"}).catch(() => {});
    });

    when('Pulsar el botón para seguir', async () => {
        await delay(1500)
        const text = await page.evaluate(() => document.body.textContent);
        await page.click("#seguir")
        await delay(1500)
    });

    then('El sistema seguirá al usuario', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('Dejar de seguir')
        await page.click("#dejarSeguir")
        await delay(1500)
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