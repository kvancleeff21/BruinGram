# BruinGram
CS 35l Final Project - Instagram Clone using MERN Stack

To run this web app locally, first git clone the main branch onto a local 
git repository in your file system

For example, git clone https://github.com/kvancleeff21/BruinGram.git 

Then execute cd BruinGram to change into the root directory of the project. 

Next, make sure you have Node's package manager, npm and NodeJS installed globally on your computer using whatever method you prefer, whether that be homebrew, or any other package manager that your operating system prefers. To check that you have both Node and npm installed, executing node -v and npm -v should output a number. 

For example, when I execute node -v, my output is v16.16.0
when I execute npm -v, my output is 9.6.5

Next, make sure you are in the root directory of this project, and execute 
npm install

npm install will install all of the necessary packages and modules that the backend framework relies on such as mongoose, express, jwt, etc.

Then execute cd client to enter the front end directory of the project, and then again run npm install. This will install all of the necessary packages and modules that the frontend relies on. 

The last step you need to do is, within the client directory, create a .env file with the line SKIP_PREFLIGHT_CHECK=true 

Now, the web app should be set up. Now, open two terminal sessions, one that is in the root directory of the project and the other is in the client directory, and execute npm start in both terminal sessions. 

When you execute npm start in the root directory, output should appear in the terminal saying 'Server running on port 7000' and 'Mongodb connected'

When you execute the react app in the front end with npm start, it should open a web browser for you that takes you to the sign in page of our web application. 

Now, create a profile and enjoy our version of Instagram!

# COMMON BUGS
- If you are a Mac user, you might have Apple airplay on (default). This uses port 7000 which is also what our backend uses, so you would ideally disable it
- If you get version mismatch/dependencies, consider replacing part of /client/package.json with:
> "scripts": {
>   "start": "react-scripts --openssl-legacy-provider start",
>   "build": "react-scripts --openssl-legacy-provider build",
>   "test": "react-scripts test",
>   "eject": "react-scripts eject"
> },