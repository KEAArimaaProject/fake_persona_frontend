# Fake Data Generator Frontend

## Purpose
Frontent for the [Fake Data Generator](https://github.com/arturomorarioja/fake_info), which generates fake data of nonexistent Danish persons.

## Installation

The backend is expected to be running at `http://localhost:8080`, but this value can be changed at `src/js/info.js`.

## Tools
JavaScript / CSS3 / HTML5

## Author
Arturo Mora-Rioja

## to run the backend:
- The project supports Java 21
- start docker desktop
- start the database:
  - in a powershell, run PS C:\Users\USER\MYPROJECTS\fake_persona_backend\mandatory-one> `docker compose -f db\docker-compose.yml up -d`
- run the spring boot application:
  - in a powershell, run PS C:\Users\USER\MYPROJECTS\fake_persona_backend\mandatory-one> `./mvnw spring-boot:run`
- check that the backend works by making these calls in postman:
  - http://localhost:8080/api/name-gender
  - http://localhost:8080/api/person

## to run the frontend for use with playwright tests:
- run `npm install` (installs devDependencies in package.json)
- run `npx playwright install` (download the required browsers (Chromium by default, as configured in test\\e2e\\playwright.config.js))

## to run the frontend manually:
- in a terminal, run `python -m http.server 5500 --directory src` (from project root)
  
  or, if you just use `py`:
- in a terminal, run `py -m http.server 5500 --directory src` (from project root)

- open a browser and go to http://localhost:5500 (you should now see the Fake Personal Data Generator UI)


## Use SonarQube locally for static testing:

### For Jetbrains IDE's:
- donwload the plugin "SonarQube for IDE"
- Restart the IDE
- go to View -> Tool Windows -> SonarQube for IDE
- You now have a tool window that enables you to analyze individual files, or the whole project.

## Run playwright tests:

[test/e2e/testDocumentation.md](test/e2e/testDocumentation.md)



## Linting and Formatting Scripts

- **`npm run lint`**: Runs ESLint on the entire project (`.` targets all files). Reports code quality issues, TypeScript errors, and style violations.

- **`npm run lint:fix`**: Runs ESLint with `--fix` flag. Auto-fixes many issues (e.g., simple formatting, unused vars); manual review recommended.

- **`npm run format`**: Runs Prettier with `--write` on all files. Enforces consistent code style (semi-colons, single quotes, 2-space indents per `.prettierrc.json`).

- **`npm run prepare`**: Runs `husky install` post-`npm install`. Sets up Git hooks for pre-commit linting/formatting (install Husky first: `npm i -D husky lint-staged` then `npx husky init`).

Run from project root.



## GitHub Actions CI/CD (E2E Tests)

### Overview
- **Workflow**: `.github/workflows/e2e.yml`
- **Triggers**: `push` and `pull_request` to `main` branch
- **What it does**:
  - Sets up Node.js 20 and Java 21
  - Installs dependencies (`npm ci`)
  - Clones and starts backend: Docker Compose DB + Spring Boot app (waits for `http://localhost:8080/api/person`)
  - Installs Playwright browsers (`npx playwright install --with-deps`)
  - Runs E2E tests (`npm test` → Playwright, auto-starts frontend at `localhost:5500`)
  - Uploads `playwright-report` artifact on failure

### Local Verification (Mirrors CI)
1. Start backend (see "to run the backend" section)
2. `npm install`
3. `npx playwright install`
4. `npm test` (or headed: `npm run test:headed`)

### CI Verification
1. Push to branch or create PR to `main`
2. Go to repo **Actions** tab
3. Select **E2E Tests (Playwright)** run
4. Check job logs (especially "Run Playwright tests")
5. On failure: Download `playwright-report` artifact

### Status Check Name
- `E2E Tests (Playwright) / test` ← Use this exact name in branch protection

### Block Merges/Pushes on Failure (Branch Protection)
1. Repo **Settings > Branches > New branch protection rule**
2. Branch pattern: `main`
3. Check **Require a pull request before merging**
4. Check **Require status checks to pass before merging** → Select `E2E Tests (Playwright) / test`
5. Optional: Require reviews, linear history, etc.
6. **Save changes**

- Now: PRs to `main` blocked if E2E fails; direct pushes prevented.

### Troubleshooting
- **Backend startup fails**: Verify backend repo (`https://github.com/KEAArimaaProject/fake_persona_backend`), Docker access
- **CORS errors**: Backend must allow `http://localhost:5500`
- **Server not ready**: Increase `webServer.timeout` in `playwright.config.js`
- **Tests timeout**: Job timeout 60min; check backend readiness curl

All E2E tests must pass for green CI!
