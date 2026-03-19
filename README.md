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
- The project requires Java 21
- start docker desktop
- start the database:
  - in a powershell, run PS C:\Users\USER\MYPROJECTS\fake_persona_backend\mandatory-one> `docker compose -f db\docker-compose.yml up -d`
- run the spring boot application:
  - in a powershell, run PS C:\Users\USER\MYPROJECTS\fake_persona_backend\mandatory-one> `./mvnw spring-boot:run`
- check that the backend works by making these calls in postman:
  - http://localhost:8080/api/name-gender
  - http://localhost:8080/api/person

## to run the frontend:
- run `npm install` (installs devDependencies in package.json)
- run `npx playwright install` (download the required browsers (Chromium by default, as configured in test\\e2e\\playwright.config.js))
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


