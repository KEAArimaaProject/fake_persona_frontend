

# to run the playwright tests:
- first: make sure the fontend and backend are running (see README.md)

### Headless
- PS C:\Users\USER\MYPROJECYTS\fake_persona_frontend> $env:HEADLESS="true"; .\node_modules\.bin\playwright.cmd test --config=test/e2e/playwright.config.js
### Headed normal
- PS C:\Users\USER\MYPROJECYTS\fake_persona_frontend> $env:HEADLESS="false"; .\node_modules\.bin\playwright.cmd test --config=test/e2e/playwright.config.js
### Slow motion (headed + 500ms)
- PS C:\Users\USER\MYPROJECYTS\fake_persona_frontend> $env:HEADLESS="false"; $env:SLOW_MO="500"; .\node_modules\.bin\playwright.cmd test --config=test/e2e/playwright.config.js

### to run each test in slow-motion:
- PS C:\Users\CMLyk\WebstormProjects\fake_persona_frontend\test\e2e>
- PS C:\Users\CMLyk\WebstormProjects\fake_persona_frontend\test\e2e> $env:HEADLESS="false"; $env:SLOW_MO="1000"; npx playwright test tests/playwright_test.js -g "should generate a single Person"



