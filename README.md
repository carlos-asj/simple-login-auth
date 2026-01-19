# DOCUMENTAION 🤖
A simple application of the knowledge acquired about Node.js using Express.js as main framework
## Development dependencies 💻
- Node.js;
## Local dependencies 🛠️
- Express.js (main web dev framework);
- nodemon (for server run validantions);
- pg (DB client for PostgreSQL);
- jest (tests framework);
- dotenv (abolute imports);
# RUNNING THE APPLICATION ▶️
Firt off all, you need to clone the repository:
```
git clone https://github.com/carlos-asj/simple-login-auth.git
```
After that, on a text editor, install de local dependencies running:
```
npm install
```
Run the server:
```
npm run dev
```
## Routes 🛤️
- GET request:
http://localhost:3000/users<br/>
  Show all the users register on the database<br/>
- POST request:
http://localhost:3000/users<br/>
```
json object {
  "name": "name example",
  "email": "emailtest@email.com",
  "password": "example_password"
}
```
## Validations for user register 🛅
Name: Needs to be more than two characters;<br/>
Email: Don't accept duplicate emails and the input is required;<br/>
Password: More than six characters.
