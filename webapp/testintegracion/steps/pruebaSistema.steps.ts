import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';

const feature = loadFeature('./features/PruebaSistema.feature');

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

  test('Realizar el ciclo de crear una publicación y eliminarla', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string = "usuario2";
    let contraseña:string = "contraseña";
    let texto:string = "publicacion de prueba"

    given('Usuario identificado', async () => { 
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('Iniciar Sesión')
        await page.type('input[id=userName]', nombre)
        await page.type('input[id=password]', contraseña)
        await page.click("#inicioSesion")
        await delay(2000)
        await page.goto("http://localhost:3000/publication/new", {waitUntil: "networkidle0"}).catch(() => {});
    });

    when('Se crea la publicacion', async () => {
        await delay(2000)
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('Nueva publicación')
        await page.type('textarea[id=texto]', texto)
        await page.click("#crearPub")
        await delay(2000)
    });

    then('El sistema la muestra en el perfil del usuario (después se elimina)', async () => {
        await delay(2000)
        let text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('publicacion de prueba')
        await page.click("#elim0")
        await page.click("#confirmar")
        await delay(2000)
        await page.goto("http://localhost:3000/profile/646a47025e73d6bf56559576", {waitUntil: "networkidle0"}).catch(() => {});
        text = await page.evaluate(() => document.body.textContent);
        await expect(text).not.toContain('publicacion de prueba')
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