import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';

const feature = loadFeature('./features/Logout.feature');

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

  test('Intertar cerrar sesión', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string = "usuario1";
    let contraseña:any = "contraseña";

    given('Usuario identificado', async () => { 
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('Iniciar Sesión')
        await page.type('input[id=userName]', nombre)
        await page.type('input[id=password]', contraseña)
        await page.click("#inicioSesion")
    });

    when('Pulsar el botón para cerrar sesión', async () => {
        await delay(2000)
        await page.click("#cerrarSesion")
    });

    then('El sistema cerrará sesión', async () => {
      await delay(2000)
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Sesión finalizada')
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