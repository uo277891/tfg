import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';

const feature = loadFeature('./features/Registro.feature');

let page: any;
let browser: any;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/register", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('Intertar registro con nombre en uso', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string;
    let localidad:string;
    let cont:string;
    let repCont:string;

    given('Datos con nombre en uso', () => { 
        nombre = "usuario1"
        localidad = "Gijon"
        cont = "12345678"
        repCont = "12345678"
    });

    when('Introduce datos y procede a registrarse', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Registro')
      await page.type('input[id=userName]', nombre)
      await page.type('input[id=location]', localidad)
      await page.type('input[id=password]', cont)
      await page.type('input[id=passwordConf]', repCont)
      await page.click("#siguiente1")
      await page.click("#siguiente2")
    });

    then('El sistema indica que el nombre está en uso', async () => {
      await page.click("#registrarse")
      await delay(200)
      const text = await page.evaluate(() => document.body.textContent);
      
      await expect(text).toContain('El nombre ya está en uso')
    });
  })

  test('Intertar registro sin introducir nombre', ({given,when,then}) => {
    jest.setTimeout(100000);
    let localidad:string;
    let cont:string;
    let repCont:string;

    given('Datos sin nombre', () => { 
        localidad = "Gijon"
        cont = "12345678"
        repCont = "12345678"
    });

    when('Introduce datos y procede a registrarse', async () => {
        await page
      .goto("http://localhost:3000/register", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Registro')
      await page.type('input[id=location]', localidad)
      await page.type('input[id=password]', cont)
      await page.type('input[id=passwordConf]', repCont)
      await page.click("#siguiente1")
      await page.click("#siguiente2")
    });

    then('El sistema indica que hay campos sin completar', async () => {
      await page.click("#registrarse")
      await delay(200)
      const text = await page.evaluate(() => document.body.textContent);
      
      await expect(text).toContain('Algún campo está vacío')
    });
  })

  test('Intertar registro con contraseñas diferentes', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string;
    let localidad:string;
    let cont:string;
    let repCont:string;

    given('Datos con contraseñas diferentes', () => { 
        nombre = "usuario5";
        localidad = "Gijon"
        cont = "12345678"
        repCont = "123456789"
    });

    when('Introduce datos y procede a registrarse', async () => {
        await page
      .goto("http://localhost:3000/register", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Registro')
      await page.type('input[id=userName]', nombre)
      await page.type('input[id=location]', localidad)
      await page.type('input[id=password]', cont)
      await page.type('input[id=passwordConf]', repCont)
      await page.click("#siguiente1")
      await page.click("#siguiente2")
    });

    then('El sistema indica que las contraseñas no coinciden', async () => {
      await page.click("#registrarse")
      await delay(200)
      const text = await page.evaluate(() => document.body.textContent);
      
      await expect(text).toContain('Las contraseñas no coinciden')
    });
  })

  test('Intertar registro con nombre con espacios', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string;
    let localidad:string;
    let cont:string;
    let repCont:string;

    given('Datos con nombre con espacios', () => { 
        nombre = "usuario31383838  ";
        localidad = "Gijon"
        cont = "12345678"
        repCont = "12345678"
    });

    when('Introduce datos y procede a registrarse', async () => {
        await page
      .goto("http://localhost:3000/register", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Registro')
      await page.type('input[id=userName]', nombre)
      await page.type('input[id=location]', localidad)
      await page.type('input[id=password]', cont)
      await page.type('input[id=passwordConf]', repCont)
      await page.click("#siguiente1")
      await page.click("#siguiente2")
    });

    then('El sistema indica que el nombre no es válido', async () => {
      await page.click("#registrarse")
      await delay(200)
      const text = await page.evaluate(() => document.body.textContent);
      
      await expect(text).toContain('El nombre de usuario no puede ser mayor de 15 caracteres ni tener espacios')
    });
  })

  test('Intertar registro con contraseña menor a 8 caracteres', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string;
    let localidad:string;
    let cont:string;
    let repCont:string;

    given('Datos con contraseña menor a 8 caracteres', () => { 
        nombre = "usuario5";
        localidad = "Gijon"
        cont = "1234567"
        repCont = "1234567"
    });

    when('Introduce datos y procede a registrarse', async () => {
        await page
      .goto("http://localhost:3000/register", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Registro')
      await page.type('input[id=userName]', nombre)
      await page.type('input[id=location]', localidad)
      await page.type('input[id=password]', cont)
      await page.type('input[id=passwordConf]', repCont)
      await page.click("#siguiente1")
      await page.click("#siguiente2")
    });

    then('El sistema indica que la contraseña es muy corta', async () => {
      await page.click("#registrarse")
      await delay(200)
      const text = await page.evaluate(() => document.body.textContent);
      
      await expect(text).toContain('La contraseña debe tener un mínimo de 8 caracteres')
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