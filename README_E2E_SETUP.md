

# Setting up automatick linter runs before commit and test runs before push.

# The Problem (in 10 seconds) (assuming you use windows)


The `.husky/pre-commit` and `.husky/pre-push` files are Linux scripts.

Windows Git + the default docker-desktop WSL distro can’t run them → you will get this error:

```
WSL (2111 - Reley) ERROR: CreateProcessCommon:640: execvpe(/bin/bash) failed
husky - pre-push script failed (code 1)
```

We fix it by installing a real Ubuntu environment (one-time) and rewriting the hooks correctly for modern Husky (v9+).

## One-Time Setup (takes 5–10 minutes total)

### Step 1: Install Ubuntu WSL (do this once on any Windows PC)

Open PowerShell (normal user is fine).
Paste this exact command and press Enter:

```powershell
wsl --install -d Ubuntu
```

Wait for the download (~500 MB). A new blue/black Ubuntu window will open automatically.
When asked, create a simple username (e.g. cml) and a password.
(Password typing is invisible — normal.)

### Step 2: Set Ubuntu as default (one command)

In the same PowerShell window, run:

```powershell
wsl --set-default Ubuntu
```

### Step 3: Open Ubuntu and go to your project

Type `wsl` in PowerShell (or just search “Ubuntu” in the Start menu) to open the Ubuntu terminal.

Paste these commands one by one:

```bash
cd /mnt/c/Users/USER/MYPROJECTS/fake_persona_frontend
ls
```

You can type `cd /mnt/c/Users/` then press Tab a few times to autocomplete.

### Step 4: Fix the Husky hooks (the magic part)
Still in the Ubuntu terminal, run these **5 blocks** one by one (copy the whole block each time):

```bash
cat > .husky/pre-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
EOF
```

```bash
cat > .husky/pre-push << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test:headless
EOF
```

```bash
sudo chmod +x .husky/pre-commit .husky/pre-push
```

```bash
sudo apt update && sudo apt install dos2unix -y && dos2unix .husky/pre-commit .husky/pre-push
```

(When it asks for your password, type the one you created in Step 1.)

## How to Use Git From Now On (forever)

Always do this in the Ubuntu terminal (or VS Code in WSL):

```bash
git push
```

It will now run your lint + tests perfectly — no more WSL error!

### Temporary bypass (if you ever need to skip hooks):

```bash
git push --no-verify
```

## Bonus: Make VS Code Perfect (highly recommended)

1. In VS Code, install the extension: **Remote - WSL**.
2. Close your current project folder.
3. Go to **File → Open Folder in WSL…** → choose your project folder.

From now on, the integrated terminal, Git, npm, and Husky all run in real Linux automatically.


You’re Done!
After this setup:

Every teammate only needs to do it once.
All future git commit / git push just work.
No more --no-verify, no more bash errors, no more frustration.



# GitHub Actions CI Setup (one-time)

**No backend needed** - tests generate fake data client-side in the browser.

### Repo Settings:
1. Go to repo Settings > Secrets and variables > Actions.
2. Add `SONAR_TOKEN`: create account at [sonarcloud.io](https://sonarcloud.io), generate token, paste.

### Create CI Workflow:
Create file `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ "main", "develop", "Frontend-CICD-firstbranch" ]
  pull_request:
    branches: [ "main" ]

jobs:
  lint-test:
    timeout-minutes: 15
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: "npm"
    - name: Install deps
      run: npm ci
    - name: Lint
      run: npm run lint
    - name: Cache Playwright
      uses: actions/cache@v4
      with:
        path: ~/.cache/ms-playwright
        key: playwright-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**/*.js') }}
    - name: Install Playwright
      run: npx playwright install --with-deps
    - name: Test
      run: npm run test:headless
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: test-report
        path: test-results/
        retention-days: 30

  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - uses: SonarSource/sonarcloud-github-action@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```
3. Commit & push `.github/workflows/ci.yml` - Actions will run automatically on pushes/PRs.
