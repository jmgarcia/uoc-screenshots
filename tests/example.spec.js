const { test } = require('@playwright/test');

const pages = [
  { name: 'Home_CA', url: 'https://www.uoc.edu/ca' },
  { name: 'Home_ES', url: 'https://www.uoc.edu/es' },
  { name: 'Home_EN', url: 'https://www.uoc.edu/en' },
];

for (const site of pages) {
  test(`Captura de ${site.name}`, async ({ page }, testInfo) => {
    // Vamos a la URL
    await page.goto(site.url);

    // Esperamos a que la red esté tranquila (imágenes cargadas)
    await page.waitForLoadState('domcontentloaded');

    // Cambiamos 'visible' por 'attached'
    const navMenu = page.locator('.cmp-navigation').first();
    await navMenu.waitFor({ state: 'attached', timeout: 30000 });

    // await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // await page.waitForTimeout(1000);

    // Hacemos la captura de pantalla completa
    await page.screenshot({
      path: `./output/mqt/${testInfo.project.name}/${site.name}.png`,
      fullPage: false
    });
  });
}