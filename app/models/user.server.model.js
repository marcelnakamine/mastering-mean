const mongoose = require('mongoose');
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
    get: helper.toObfuscate
  },
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

//This will force Mongoose to include getters when converting the MongoDB document to a JSON representation and will allow the output of documents using res.json() in order to include the getter's behavior. If you didn't include this, you would have your document's JSON representation ignoring the getter modifiers.
UserSchema.set('toJSON', {getters: true})

mongoose.model('User', UserSchema);
