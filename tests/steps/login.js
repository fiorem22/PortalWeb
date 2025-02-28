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
    this.page = await this.browser.newPage();

    const loginPage = new LoginPage(this.page);
    await loginPage.open("https://dpyafdt5ufpo0.cloudfront.net/inicio");

    await this.page.waitForSelector("#username", { state: "visible", timeout: 50000 });
    console.log("✅ Página de login cargada correctamente.");
});

When("providing valid username and password", async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.login("U24254650@", "1234");
    console.log("✅ Usuario y contraseña ingresados.");
});

Then("clicking login button", async function () {
    await this.page.waitForTimeout(5000);
    console.log("✅ Espera de 5 segundos completada después de hacer clic en el botón de login.");
});


Then("user should be logged in successfully", async function () {
    const inicioLocator = this.page.locator('text=Inicio');
    const inicioLink = this.page.locator('a', { hasText: "Inicio" });

    try {
        await inicioLocator.waitFor({ state: 'visible', timeout: 20000 });
        console.log("✅ ASSERT PASSED: Se encontró correctamente el texto 'Inicio'.");
    } catch (error) {
        try {
            await inicioLink.waitFor({ state: 'visible', timeout: 10000 });
            console.log("✅ ASSERT PASSED: Se encontró el enlace 'Inicio'.");
        } catch (error) {
            console.error("❌ ERROR: No se encontró el texto ni el enlace 'Inicio'.");
            throw error;
        }
    }
});















