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
    await loginPage.open("https://dpyafdt5ufpo0.cloudfront.net/inicio");
    await page.waitForSelector("#username", { state: "visible", timeout: 50000 });
});

When("providing valid username and password", async function () {
    await loginPage.login("U24220181@", "1234");
});

Then("clicking login button", async function () {
    await page.waitForTimeout(5000);

});

Then("user should be logged in successfully", async function () {
    await expect(page.locator('[data-test="user-icon"]')).toBeVisible();

    await browser.close();
});