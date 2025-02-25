import { Before, After } from "@cucumber/cucumber";

Before(async function () {
    console.log("🔄 Ejecutando Before Hook...");
    await this.init();
});

After(async function () {
    console.log("🛑 Ejecutando After Hook...");
    await this.close();
});
