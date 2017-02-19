const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const helper = require('./helper.mongoose');

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    set: helper.toLower,
    index: true,
    match: /.+\@.+\..+/
  },
  username: {
    type: String,
    set: helper.toLower,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    get: helper.toObfuscate,
    validate: [helper.validatePassword,
      'Password should be longer'
    ]
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerId: String,
  providerData: {},
  created: {
    type: Date,
    default: Date.now
  },
  website: {
    type: String,
    set: helper.fixUrl
  },
  role: {
    type: String,
    enum: ['Admin', 'Owner', 'User']
  }
});

UserSchema.virtual('fullName').get(function(){
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  const splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

UserSchema.statics.findOneByUsername = function(username, callback) {
    this.findOne({ username: new RegExp(username, 'i') },
  callback);
};

UserSchema.post('save', function(next){
    console.log('The user "' + this.username +  '" details were saved.');
});

UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password  = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000,
        64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix,
    callback) {
    var possibleUsername = username + (suffix || '');
    this.findOne({
        username: possibleUsername
    }, (err, user) => {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return this.findUniqueUsername(username, (suffix || 0) +
                    1, callback);
            }
        } else {
            callback(null);
        }
    });
};

//This will force Mongoose to include getters when converting the MongoDB document to a JSON representation and will allow the output of documents using res.json() in order to include the getter's behavior. If you didn't include this, you would have your document's JSON representation ignoring the getter modifiers.
UserSchema.set('toJSON', {getters: true})

mongoose.model('User', UserSchema);
