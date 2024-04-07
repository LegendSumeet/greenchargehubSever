
const dotenv = require("dotenv");

dotenv.config();

const http = require('http');

const mongoose = require("mongoose");

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello, Node.js HTTP Server!</h1>');
    res.end();
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

server.listen(process.env.PORT, () => {
    console.log(`Node.js HTTP server is running on port `);
});