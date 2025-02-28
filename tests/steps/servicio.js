import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ServicioPage } from "../pages/ServicioPage.js";

Given("el usuario ha iniciado sesión como estudiante", async function () {
    this.page = await this.browser.newPage();

    const loginPage = new LoginPage(this.page);
    await loginPage.open("https://dpyafdt5ufpo0.cloudfront.net/inicio");
    await loginPage.login("U24254650@", "1234");

    this.servicioPage = new ServicioPage(this.page);
});

When("el usuario hace clic en la pestaña {string}", async function (tabName) {
    await this.servicioPage.clickSidebarTab(tabName);
});

Then("debería ver la página de servicios", async function () {

    const servicioLocator = this.page.locator('text=Servicios');
    const servicioLink = this.page.locator('a', { hasText: "Servicios" });

    try {
        await servicioLocator.waitFor({ state: 'visible', timeout: 20000 });
        console.log("✅ ASSERT PASSED: Se encontró correctamente el texto 'Servicios'.");
    } catch (error) {
        try {
            await servicioLink.waitFor({ state: 'visible', timeout: 10000 });
            console.log("✅ ASSERT PASSED: Se encontró el enlace 'Servicios'.");
        } catch (error) {
            console.error("❌ ERROR: No se encontró el texto ni el enlace 'Servicios'.");
            throw error;
        }
    }
});
