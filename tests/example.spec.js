const {test} = require('@playwright/test');

const DOMAIN = 'https://www.pre.uoc.edu';
const FP_DOMAIN = 'https://pre-fp.fje.uoc.edu'; // Domini per a FP

const pages = [
    // Home portal
    {name: 'Home_CA', path: '/ca'},
    {name: 'Home_ES', path: '/es'},
    {name: 'Home_EN', path: '/en'},

    // Subhome oferta formativa
    {name: 'Oferta_Formativa_CA', path: '/ca/estudis'},
    {name: 'Oferta_Formativa_ES', path: '/es/estudios'},
    {name: 'Oferta_Formativa_EN', path: '/en/studies'},

    // Subhome oferta fomativa version landing
    {name: 'Oferta_Formativa_Landing_ES', path: '/es/estudios/oferta-formativa-landmkt', hasMenu: false},

    // Home News
    {name: 'News_CA', path: '/ca/news'},
    {name: 'News_ES', path: '/es/news'},
    {name: 'News_EN', path: '/en/news'},

    // Subhome Recerca
    //{name: 'Recerca_CA', path: '/ca/recerca'},
    //{name: 'Recerca_ES', path: '/es/investigacion'},
    //{name: 'Recerca_EN', path: '/en/research'},

    // Subhome La Universitat
    //{name: 'Universitat_CA', path: '/ca/universitat'},
    //{name: 'Universitat_ES', path: '/es/universidad'},
    //{name: 'Universitat_EN', path: '/en/university'},

    // Subhome FP (Domini diferent, utilitzem url completa construïda amb FP_DOMAIN)
    {name: 'FP_CA', url: `${FP_DOMAIN}/ca/estudis`},
    {name: 'FP_ES', url: `${FP_DOMAIN}/es/estudios`},
];

for (const site of pages) {
    test(`Captura de ${site.name}`, async ({page}, testInfo) => {
        // Construïm la URL final depenent de si tenim 'path' o 'url' directa
        const finalUrl = site.url ? site.url : `${DOMAIN}${site.path}`;

        // Vamos a la URL
        await page.goto(finalUrl);

        // Esperamos a que la red esté tranquila (imágenes cargadas)
        await page.waitForLoadState('domcontentloaded');

        try {
            const cookieBtn = page.locator('#onetrust-accept-btn-handler');
            await cookieBtn.click({ timeout: 5000 });
            await page.waitForTimeout(1000);
            console.log(`🍪 Cookies aceptadas en ${site.name}`);
        } catch (error) {
            console.log(`ℹ️ Info: No se encontró el banner de cookies a tiempo en ${site.name}`);
        }

        // Cambiamos 'visible' por 'attached'
        if (site.hasMenu !== false) {
            try {
                const navMenu = page.locator('.cmp-navigation').first();
                await navMenu.waitFor({state: 'attached', timeout: 30000});
            } catch (error) {
                console.log(`⚠️ Aviso: No se ha podido cargar el menú en ${site.name}, pero la prueba continúa.`);
            }
        } else {
            console.log(`ℹ️ Info: Saltando la comprobación del menú para ${site.name}`);
            await page.waitForTimeout(2000);
        }

        // await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        // await page.waitForTimeout(1000);

        // Hacemos la captura de pantalla completa
        await page.screenshot({
            path: `./output/mqt/${testInfo.project.name}/${site.name}.png`,
            fullPage: false
        });
    });
}