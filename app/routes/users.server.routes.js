const users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
  app.route('/users')
  	.post(users.create)
  	.get(users.list);

  app.route('/users/:userId')
  	.get(users.read)
    .put(users.update)
    .delete(users.delete);

  // it's a middleware to be executed before any other middleware that uses userId as a parameter
  // in this case, the users.read controller
  app.param('userId', users.userByID);
};
