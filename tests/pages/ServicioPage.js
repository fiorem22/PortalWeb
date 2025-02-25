import { expect } from "@playwright/test";

export class ServicioPage {
    constructor(page) {
        this.page = page;
        this.sidebarMenuItem = (menuName) => `#sidebarElement > div.sc-kBpyjw.dxnEPa > div:nth-child(1) > div.step5 > a`; // Selector dinámico
        this.pageTitle = "Servicios"; // Ajusta este selector según tu aplicación
    }

    async clickSidebarTab(tabName) {
        await this.page.click(this.sidebarMenuItem(tabName));
        await this.page.waitForLoadState("domcontentloaded"); // Espera a que cargue la página
    }

    async getPageTitle() {
        return await this.page.textContent(this.pageTitle);
    }
}
