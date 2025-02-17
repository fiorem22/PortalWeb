import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = "#username";
        this.passwordInput = "#password";
        this.loginButton = "#kc-login";
    }

    async open(url) {
        await this.page.goto(url, { waitUntil: "load", timeout: 15000 });
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
}