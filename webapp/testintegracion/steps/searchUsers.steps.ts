import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';

const feature = loadFeature('./features/SearchUser.feature');

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

  test('Intertar buscar usuarios por nombre', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string = "usuario1";
    let contraseña:string = "contraseña";
    let nombreABuscar: string;

    given('Usuario identificado y nombre a buscar', async () => { 
        const text = await page.evaluate(() => document.body.textContent);
        nombreABuscar = "usuario2"
        await expect(text).toContain('Iniciar Sesión')
        await page.type('input[id=userName]', nombre)
        await page.type('input[id=password]', contraseña)
        await page.click("#inicioSesion")
    });

    when('Escribir el nombre y darle a buscar', async () => {
        await delay(1000)
        await page.goto("http://localhost:3000/find", {waitUntil: "networkidle0"}).catch(() => {});
        await page.type('input[id=searchName]', nombreABuscar)
        await page.click("#search")
        await delay(1000)
    });

    then('El sistema muestra todos las usuario que contengan la cadena del nombre', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('usuario2')
    });
  })

  test('Intertar buscar usuarios por filtro', ({given,when,then}) => {
    jest.setTimeout(100000);
    let nombre:string = "usuario1";
    let contraseña:string = "contraseña";

    given('Usuario identificado', async () => { 
        await page.goto("http://localhost:3000/login", {waitUntil: "networkidle0"}).catch(() => {});
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('Iniciar Sesión')
        await page.type('input[id=userName]', nombre)
        await page.type('input[id=password]', contraseña)
        await page.click("#inicioSesion")
    });

    when('Aplicar el filtro de edad', async () => {
        await delay(1000)
        await page.goto("http://localhost:3000/find", {waitUntil: "networkidle0"}).catch(() => {});
        await page.click("#buscar")
        await delay(1000)
        await page.click("#btFiltros")
        await delay(1000)
    });

    then('El sistema muestra todos las usuario que estén en el rango de edad', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toContain('usuario1')
        await expect(text).toContain('usuario2')
        await expect(text).toContain('usuario3')
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