import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';

const feature = loadFeature('./features/Login.feature');

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

  test('Intertar iniciar sesión sin introducir nombre', ({given,when,then}) => {
    jest.setTimeout(100000);
    let contraseña:any;

    given('Solo la contraseña', () => { 
        contraseña = "1234"
    });

    when('Introduce datos y procede a iniciar sesión', async () => {
      await page.goto("http://localhost:3000/login", {waitUntil: "networkidle0"})
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Iniciar Sesión')
      await page.type('input[id=password]', contraseña)
      await page.click("#inicioSesion")
    });

    then('El sistema indica que faltan datos', async () => {
      await delay(2000)
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Algún campo está vacío')
    });
  })

  test('Intertar iniciar sesión con dupla incorrecta', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string;
    let contraseña:any;

    given('Dupla incorrecta', () => { 
        nombre = "usuario1"
        contraseña = "1234"
    });

    when('Introduce datos y procede a iniciar sesión', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Iniciar Sesión')
      await page.type('input[id=userName]', nombre)
      await page.type('input[id=password]', contraseña)
      await page.click("#inicioSesion")
    });

    then('El sistema indica que no coinciden los datos', async () => {
      await delay(2000)
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Las credenciales no son correctas')
    });
  })

  test('Intertar iniciar sesión con datos correctos', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string;
    let contraseña:any;

    given('Dupla correcta', () => { 
        nombre = "usuario1"
        contraseña = "contraseña"
    });

    when('Introduce datos y procede a iniciar sesión', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Iniciar Sesión')
      await page.type('input[id=userName]', nombre)
      await page.type('input[id=password]', contraseña)
      await page.click("#inicioSesion")
    });

    then('El sistema inicia sesión', async () => {
      await delay(2000)
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('usuario1')
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