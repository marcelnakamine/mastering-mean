process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureExpress = require('./config/express');

let port = 4040;
const app = configureExpress();
app.listen(port);
module.exports = app;

console.log(`Server running at http://localhost:${port}`);
