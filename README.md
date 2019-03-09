CSE 510 or 526 - Blockchain Application Development Project Lab - 1

Team Members:
- Ankit Kumar Sinha (50286874) (ankitsin)
- Parth Rasikkumar Patel (50290764) (parthras)

-> We are currently only submitting Part 1 (web application) and Part 2 (Smart contract solidity file)

Web Application Part 1 Setup:
1. There are two folders: frontend and backend. Frontend hosts the Angular frontend files and backend hosts the NodeJS server files.
	NOTE: Angular CLI version: 7.3.4, Node version: 10.15.2, npm version: 6.4.1

2. Install NodeJS node package management (npm) and MongoDB on whichever machine you are trying to execute the application.
 (Make sure the MongoDB is running in the background and listening on port 27017.)

3. Create three databases named "items", "users", and "transactions" in the MongoDB database using any tool or mongo's CLI.

3. Go to the "BACKEND" folder and install the dependencies of the NodeJS server backend by running the following commands:
	- cd backend
	- npm install -g @angular/cli
	- npm install --save-dev babel-cli babel-preset-env
	- npm install --save-dev babel-watch
	- npm install express
	- npm install mongoose
	- npm install cors
	- npm install --save-dev @babel/core
	- npm install --save-dev @babel/preset-env
	- npm install --save body-parser

4. Go to the "FRONTEND" folder and nstall the dependencies of the Angular frontend application by running the following commands:
	- cd frontend
	- ng add @angular/material
	NOTE: We've selected the indigo theme while setting up angular material package and recommend doing that. Feel free to try out new themes though :)

5. Use Robo3T or mongo command line to create a SUPERUSER with username: "superuser" in the users database. The schema and field names are important here so please follow the JSON document EXACTLY as template for creating the superuser:
	- {
		"username":"superuser",
		"password":"super",
		"balance":5555
	  }

6. Go to the "backend" application folder and run the following command to start the NodeJS backend server:
	- cd backend
	- npm run dev

7. Go to the "frontend" application folder and run the following command to start the angular frontend server:
	- ng serve --open

8. After angular has successfully compiled, you should be greeted with the login page where register yourself as user, create a listing for an item by clicking on "Sell New Item" and start using the web application. You can create multiple users and have multiple listings per user.

-> Rules/Characteristics of Angular Marketplace:
	- Only Superuser is able to add (register) new users to marketplace.
	- Each user is able to edit his/her own item listing.
	- User cannot buy his/her own item.
	- After buying an item, user becomes the owner of the item and can choose to delete it from the marketplace.
	- User can deposit money into their account out of thin air in USD.
	- Currently, the application only supports single quantity items i.e. after buying the item appears sold out and no other user can buy it afterwards till the item's owner chooses to again sell it by selecting it's status to "Available" again.

-> There is also a USE CASE diagram which is stored in "Marketplace Lab-1 Use Case diagram.png" file in the root directory of the folder. This is based on our current implementation and may change in our final submission on 21st March.

-> For Part 2, we have the Solidity code in "MarketPlace.sol" file in the project's root directory (the parent directory which has frontend and backend folders). We will submit the whole integrated part 1 and part 2 (part 3 or Lab 2) before 21st March deadline.

-> If any further explanation is required in the project, feel free to contact us at our email IDs: parthras@buffalo.edu or ankitsin@buffalo.edu.


References for Part 1:
- https://medium.com/codingthesmartway-com-blog/angular-6-mean-stack-crash-course-part-1-front-end-project-setup-and-routing-89bec8332cea
- https://codingthesmartway.com/mean-stack-crash-course/
- https://material.angular.io/
- https://material.angular.io/components/
- https://dzone.com/articles/angular-5-material-design-login-application
- https://stackoverflow.com/questions/41949461/how-to-get-value-from-specific-key-in-nodejs-json
- https://angular.io/guide/lifecycle-hooks
- https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript

References for Part 2: 
- https://solidity.readthedocs.io/en/v0.5.3/introduction-to-smart-contracts.html
- https://medium.com/coinmonks/ethereum-land-marketplace-dapp-tutorial-part-1-create-and-deploy-a-smart-contract-351bc0d62be2
- https://cse.buffalo.edu/~bina/cse426/spring2019/Lectures/Ballot.sol
- https://solidity.readthedocs.io/en/v0.5.4/solidity-by-example.html#safe-remote-purchase