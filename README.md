# DOCUMENTAION 🤖
A simple application of the knowledge acquired about Node.js using Express.js as main framework
## Development dependencies 💻
- Node.js;
- Docker Engine
## Local dependencies 🛠️
- Express.js (main web dev framework);
- nodemon (for server run validantions);
- mongoose (DB client for MongoDB);
- jest (tests framework);
- dotenv (abolute imports);
- bcryptjs (hash for passwords);
- joi (simple forms validation)
# RUNNING THE APPLICATION ▶️
Firt off all, you need to clone the repository:
```
git clone https://github.com/carlos-asj/simple-login-auth.git
```
After that, on a text editor, install de local dependencies running:
```
npm install
```
Now you need to get the MongoDB URI to connect the database correctly.<br/>
Go to [MongoDB page](https://www.mongodb.com/), sign up with a account and follow the instructions to create a cluster and save de URI<br/>
With the URI, insert that link on the `.env` with the variable name, just like that:
```
MONGO_URI=uri_acquired_on_the_mongo_page
```
Now we're going to run the services on the docker engine. Run the command:
```
npm run services:up
```
Finally, run the server:
```
npm run dev
```
## Routes 🛤️
GET request:
- http://localhost:3000/users
  Show all the users register on the database
POST request:
- http://localhost:3000/users<br/>
  json object {<br/>
    "name": "username",<br/>
    "password": "password_example",<br/>
    "email": "emailtest@email.com"<br/>
  }<br/>
## Validations for user register 🛅
Name: Needs to be more than two characters;
Email: Don't accept duplicate emails and the input is required;
Password: More than six characters.
