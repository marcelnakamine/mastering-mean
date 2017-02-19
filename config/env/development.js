module.exports = {
  db: 'mongodb://localhost/mean-book',
  sessionSecret: 'developmentSessionSecret',
  facebook: {
    clientID: 'Facebook Application ID',
    clientSecret: 'Facebook Application Secret',
    callbackURL: 'http://localhost:4040/oauth/facebook/callback'
  },
  twitter: {
    clientID: 'Twitter Application ID',
    clientSecret: 'Twitter Application Secret',
    callbackURL: 'http://localhost:4040/oauth/twitter/callback'
  },
  google: {
    clientID: 'Google Application ID',
    clientSecret: 'Google Application Secret',
    callbackURL: 'http://localhost:4040/oauth/google/callback'
  }
};
