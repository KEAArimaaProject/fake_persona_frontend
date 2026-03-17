# Fake Data Generator Frontend

## Purpose
Frontent for the [Fake Data Generator](https://github.com/arturomorarioja/fake_info), which generates fake data of nonexistent Danish persons.

## Installation

The backend is expected to be running at `http://localhost:8080`, but this value can be changed at `js/info.js`.

## Tools
JavaScript / CSS3 / HTML5

## Author
Arturo Mora-Rioja

## to run the backend:
- start docker desktop
- in a powershell, run: PS C:\Users\USER\MYPROJECTS\quality_fake_info> docker compose up --build -d
- check that teh backend works by making this call in postman:
  http://localhost:8080/name-gender
  or
-  http://localhost:8080/person


## to run the frontend:
- in a termail, run C:\Users\USER\MYPROJECTS\fake_persona_frontend> python -m http.server 5500
  or, if you just use py:
- in a termail, run C:\Users\USER\MYPROJECTS\fake_persona_frontend> py -m http.server 5500

you should get something like this:
Serving HTTP on :: port 5500 (http://[::]:5500/) ...
- open a browser and go to http://localhost:5500


## Use SonarQube locally for static testing:

### For Jetbrains IDE's:
- donwload the plugin "SonarQube for IDE"
- Restart the IDE
- go to View -> Tool Windows -> SonarQube for IDE
- You now have a tool window that enables you to analyze individual files, or the whole project.
