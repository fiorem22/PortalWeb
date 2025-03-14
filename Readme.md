**Clonar el repositorio**

git clone https://github.com/fiorem22/PortalWeb.git

**Instalar dependencias**
npm init playwright@latest
npm i @cucumber/cucumber

**Ejecucion de Test Case con tags**
npx cucumber-js --profile default --tags "@servicio"
npx cucumber-js --profile default --tags "@login"

**Ejecucion de todos los testcases**
npm run test
