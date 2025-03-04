import { setWorldConstructor } from "@cucumber/cucumber";
import { chromium } from "playwright";

class CustomWorld {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
    }

    async init() {
        console.log("🚀 Inicializando el navegador");
        //this.browser = await chromium.launch({ headless: true });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async close() {
        if (this.browser) {
            console.log("🛑 Cerrando el navegador");
            await this.browser.close();
        }
    }
}

setWorldConstructor(CustomWorld);
