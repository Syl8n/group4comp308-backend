process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('./config/express');
const app = express();
const port = 5000;

app.listen(port);

console.log(`Server running at http://localhost:${port}/`);