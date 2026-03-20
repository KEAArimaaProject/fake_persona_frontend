The Problem (in 10 seconds)
The .husky/pre-commit and .husky/pre-push files are Linux scripts.
Windows Git + the default docker-desktop WSL distro can’t run them → you get this error:
text<3>WSL (2111 - Reley) ERROR: CreateProcessCommon:640: execvpe(/bin/bash) failed
husky - pre-push script failed (code 1)
We fix it by installing a real Ubuntu environment (one-time) and rewriting the hooks correctly for modern Husky (v9+).

One-Time Setup (takes 5–10 minutes total)
Step 1: Install Ubuntu WSL (do this once on any Windows PC)

Open PowerShell (normal user is fine).
Paste this exact command and press Enter:

PowerShellwsl --install -d Ubuntu

Wait for the download (~500 MB). A new blue/black Ubuntu window will open automatically.
When asked, create a simple username (e.g. cml) and a password.
(Password typing is invisible — normal.)

Step 2: Set Ubuntu as default (one command)
In the same PowerShell window, run:
PowerShellwsl --set-default Ubuntu
Step 3: Open Ubuntu and go to your project

Type wsl in PowerShell (or just search “Ubuntu” in the Start menu) to open the Ubuntu terminal.
Paste these commands one by one:

Bashcd /mnt/c/Users/CMLyk/WebstormProjects/fake_persona_frontend
ls
Tip: Replace CMLyk and fake_persona_frontend with your username and folder name.
You can type cd /mnt/c/Users/ then press Tab a few times to autocomplete.
Step 4: Fix the Husky hooks (the magic part)
Still in the Ubuntu terminal, run these 5 blocks one by one (copy the whole block each time):
Bashcat > .husky/pre-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
EOF
Bashcat > .husky/pre-push << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test:headless
EOF
Bashsudo chmod +x .husky/pre-commit .husky/pre-push
Bashsudo apt update && sudo apt install dos2unix -y && dos2unix .husky/pre-commit .husky/pre-push
(When it asks for your password, type the one you created in Step 1.)

How to Use Git From Now On (forever)
Always do this in the Ubuntu terminal (or VS Code in WSL):
Bashgit push
It will now run your lint + tests perfectly — no more WSL error!
Temporary bypass (if you ever need to skip hooks):
Bashgit push --no-verify

Bonus: Make VS Code Perfect (highly recommended)

In VS Code, install the extension: Remote - WSL
Close your current project folder.
Go to File → Open Folder in WSL… → choose your project folder.
From now on, the integrated terminal, Git, npm, and Husky all run in real Linux automatically.


You’re Done!
After this setup:

Every teammate only needs to do it once.
All future git commit / git push just work.
No more --no-verify, no more bash errors, no more frustration.

Just forward this message to your Windows-using comrades — they can follow it word-for-word and be fixed in under 10 minutes.
You already tested it successfully, so you know it works 100%.