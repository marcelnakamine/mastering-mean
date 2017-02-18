const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require('./helper.mongoose');

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    set: helper.toLower
  },
  username: {
    type: String,
    set: helper.toLower,
    trim: true
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
});

//This will force Mongoose to include getters when converting the MongoDB document to a JSON representation and will allow the output of documents using res.json() in order to include the getter's behavior. If you didn't include this, you would have your document's JSON representation ignoring the getter modifiers.
UserSchema.set('toJSON', {getters: true})

mongoose.model('User', UserSchema);
