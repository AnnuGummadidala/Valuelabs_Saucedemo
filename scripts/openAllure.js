const { execSync } = require('child_process');

if (!process.env.CI) {
  execSync('allure open allure-report', {
    stdio: 'inherit',
  });
} else {
  console.log('CI environment detected. Skipping allure open.');
}