import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';

const feature = loadFeature('./features/OwnProfile.feature');

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

  test('Intertar acceder para editar perfil', ({given,when,then}) => {
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

    when('Pulsar el botón para editar perfil', async () => {
        await delay(1000)
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('usuario1')
        await expect(text).toContain('2')
        await expect(text).toContain('1')
        await expect(text).toContain('FreeStyle')
        await expect(text).toContain('publicacion 2')
        await page.click("#editarPerfil")
    });

    then('El sistema redirigirá al usuario al perfil privado', async () => {
        await delay(1000)
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('Perfil')
    });
  })

  test('Intertar acceder a los detalles de una publicación', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string = "usuario1";
    let contraseña:any = "contraseña";

    given('Usuario identificado', async () => {
        await page.goto("http://localhost:3000/login", {waitUntil: "networkidle0"}) 
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('Iniciar Sesión')
        await page.type('input[id=userName]', nombre)
        await page.type('input[id=password]', contraseña)
        await page.click("#inicioSesion")
    });

    when('Pulsar el botón para acceder a los detalles de una publicación', async () => {
        await delay(1000)
        await page.click("#pub0")
    });

    then('El sistema redirigirá a la publicación', async () => {
        await delay(1000)
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('publicacion 2')
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