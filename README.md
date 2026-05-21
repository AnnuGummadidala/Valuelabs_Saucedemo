# Playwright Automation Framework

This project is an end-to-end automation framework developed using Playwright with TypeScript for the Sauce Demo application.

Application URL:

https://www.saucedemo.com

--------------------------------------------------

TECH STACK

- Playwright
- TypeScript
- Faker
- Allure Reports
- GitHub Actions CI/CD

--------------------------------------------------

PROJECT SETUP

Clone Project

git clone [<repository-url>](https://github.com/AnnuGummadidala/Valuelabs_Saucedemo)


--------------------------------------------------

INSTALL DEPENDENCIES

Install Node Modules

npm install

Install Playwright Browsers

npx playwright install

Install Allure Commandline

npm install -g allure-commandline --save-dev

--------------------------------------------------

ENVIRONMENT SETUP

Environment files are maintained inside:

env/

Example:

local.env
stage.env
prod.env

--------------------------------------------------

RUN TESTS

Run Local Environment : npm run test:local

Run Stage Environment :npm run test:staging

Run Production Environment : npm run test:prod


--------------------------------------------------

REPORTING

Allure Reports are integrated into the framework.

During execution:

- old reports are deleted
- new reports are generated automatically
- reports open automatically after execution in local machine

Generate Allure Report

npm run allure:generate

Open Allure Report

npm run allure:open

--------------------------------------------------

FRAMEWORK STRUCTURE

project/

.github/
components/
config/
env/
pages/
scripts/
tests/
utils/

playwright.config.ts
package.json
tsconfig.json
README.md

--------------------------------------------------

IMPLEMENTED TEST SCENARIOS

LOGIN

- Valid Login
- Locked User Validation
- Empty Username Validation
- Empty Password Validation

INVENTORY

- Product Listing Validation
- Product Sorting Validation

PRODUCT DETAIL

- Product Detail Validation

CART

- Add Product To Cart
- Remove Product From Cart

CHECKOUT

- Successful Checkout
- Checkout Form Validation

LOGOUT

- Successful User Logout Validation

--------------------------------------------------

FRAMEWORK FEATURES

- Page Object Model Architecture
- Reusable Components
- Environment-Based Execution
- Allure Reporting
- Multi Browser Support
- GitHub Actions CI
- Parallel Execution Using Sharding
- Faker Test Data Generation

--------------------------------------------------

CI/CD

GitHub Actions workflow is available inside:

.github/workflows/playwright.yml

Pipeline supports:

- automatic execution on push
- pull request execution
- environment selection
- parallel execution
- Allure report artifact upload
