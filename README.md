CSE 510 or 526 - Blockchain Application Development Project

Team Members:
- Ankit Kumar Sinha (50286874) (ankitsin)
- Parth Rasikkumar Patel (50290764) (parthras)

-> We are currently only submitting Part 1 (web application) and Part 2 (Smart contract solidity file)

Web Application Part 1 Setup:
1. There are two folders: frontend and backend. Frontend hosts the Angular frontend files and backend hosts the NodeJS server files.
2. Install NodeJS node package management (npm) and MongoDB on whichever machine you are trying to execute the application. Make sure the MongoDB executes on port 27017.
3. Create database named "items" and "users" in the MongoDB database using any tool or mongo's CLI
3. Install the dependencies of the NodeJS server backend by running the following commands:
	- npm install -g @angular/cli
	- npm install --save-dev babel-cli babel-preset-env
	- npm install --save-dev babel-watch
	- npm install express
	- npm install mongoose
	- npm install cors
	- npm install --save-dev @babel/core
	- npm install --save-dev @babel/preset-env
	- npm install --save body-parser
4. Install the dependencies of the Angular frontend application by running the following commands:
	- ng add @angular/material
5. Go to the "backend" application folder and run the following command to start the NodeJS backend server: 
	- npm run dev
6. Go to the "frontend" application folder and run the following command to start the angular frontend server:
	- ng serve --open
7. After angular has successfully compiled, you should be greeted with the login page where you can also register yourself as user and start using the web application.