import { expect } from "@playwright/test";

export class ServicioPage {
    constructor(page) {
        this.page = page;
        this.sidebarMenuItem = (menuName) => `#sidebarElement a:has-text("${menuName}")`;
        this.pageTitleSelector = 'h1.page-title';
    }

    async clickSidebarTab(tabName) {
        await this.page.waitForSelector(this.sidebarMenuItem(tabName), { state: 'visible', timeout: 60000 });
        await this.page.click(this.sidebarMenuItem(tabName));
        await this.page.waitForLoadState("domcontentloaded");
    }

    async getPageTitle() {
        return await this.page.textContent(this.pageTitleSelector);
    }
}
