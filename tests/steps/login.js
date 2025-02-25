import { Given, When, Then } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { LoginPage } from "../pages/LoginPage.js";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

setDefaultTimeout(30000);

let browser;
let page;
let loginPage;

Given("providing valid url", async function () {
    browser = await chromium.launch({ headless: false, slowMo: 1000 });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.open("https://sso-qa.utp.edu.pe/auth/realms/Xpedition-qa/protocol/openid-connect/auth?client_id=utpmas-web&redirect_uri=https%3A%2F%2Fdpyafdt5ufpo0.cloudfront.net%2F&state=64e84937-faa2-40d8-a8ad-257086cd8484&response_mode=fragment&response_type=code&scope=openid&nonce=c5afa7c6-ef3f-4b44-b019-4655b949f459");

    await page.waitForSelector("#username", { state: "visible", timeout: 60000 });
});

When("providing valid username and password", async function () {
    await loginPage.login("U24254650@", "1234");
});

Then("clicking login button", async function () {
    await page.waitForTimeout(5000);
});

Then("user should be logged in successfully", async function () {
    if (!page) {
        throw new Error("🚨 ERROR: 'page' no está inicializado.");
    }

    console.log("🔹 Verificando la URL antes del login...");
    console.log(`📌 URL actual: ${page.url()}`);

    // 🔹 Asegurar que la página realmente cargue
    await page.waitForLoadState('load', { timeout: 60000 });

    console.log("✅ Página cargada, verificando si cambió la URL después del login...");
    console.log(`📌 URL después de login: ${page.url()}`);

    // 📌 Si la URL no cambió, puede que el login haya fallado.
    if (page.url().includes("login") || page.url().includes("signin")) {
        console.error("❌ ERROR: Parece que el usuario no se autenticó correctamente.");
        throw new Error("⚠️ El usuario sigue en la página de login. Verifica credenciales.");
    }

    // 🔹 Obtener el contenido de la página para verificar si "Inicio" está presente
    const bodyText = await page.textContent('body');
    console.log(`📌 Texto visible en la página:\n${bodyText}`);

    // 🔹 Intentar localizar "Inicio" en diferentes formas
    const inicioLocator = page.locator('text=Inicio');
    const inicioLink = page.locator('a', { hasText: "Inicio" });

    try {
        await inicioLocator.waitFor({ state: 'visible', timeout: 20000 });
        console.log("✅ ASSERT PASSED: Se encontró correctamente el texto 'Inicio'.");
    } catch (error) {
        console.error("❌ ERROR: No se encontró el texto 'Inicio'. Intentando con un selector alternativo...");

        try {
            await inicioLink.waitFor({ state: 'visible', timeout: 10000 });
            console.log("✅ ASSERT PASSED: Se encontró el enlace 'Inicio'.");
        } catch (error) {
            console.error("❌ ERROR: No se encontró el enlace 'Inicio'.");

            throw error;
        }
    }
});








