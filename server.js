process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');

let port = 4040;
// Make sure that Mongoose configuration file is loaded before any other configuration is performed
// This is important since any module that is loaded after this module will be able to use the User model without loading it by itself.
const db = configureMongoose();
const app = configureExpress();
app.listen(port);
module.exports = app;

console.log(`Server running at http://localhost:${port}`);
