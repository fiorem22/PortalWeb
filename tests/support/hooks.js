import { BeforeAll, AfterAll, Before, After } from "@cucumber/cucumber";
import { chromium } from "playwright";

let browser;

BeforeAll(async function () {
    console.log("🚀 [BeforeAll] Iniciando navegador global");
    if (!browser) {
        browser = await chromium.launch({ headless: false });
    }
});

Before(async function () {
    console.log("🔄 [Before] Configurando contexto y página");
    this.browser = browser;
    this.context = await this.browser.newContext();
    //this.page = await this.context.newPage();
});

After(async function () {
    console.log("🛑 [After] Cerrando contexto y página");
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
});

AfterAll(async function () {
    console.log("🛑 [AfterAll] Cerrando navegador global");
    if (browser) {
        await browser.close();
        browser = null;
    }
});

