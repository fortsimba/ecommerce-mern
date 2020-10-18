const mongoose = require("mongoose");

const ThirdParty = new mongoose.Schema({
  provider_name: {
    type: String,
    default: null
  },
  provider_id: {
    type: String,
    default: null
  },
  provider_data:{
    type: {},
    default: null
  }
})

const Address = new mongoose.Schema({
  line1: {
    type: String,
    default: null
  },
  line2: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: null
  },
  country: {
    type: String,
    default: null
  },
  pincode: {
    type: String,
    default: null
  },
})

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  address: [Address],
  email:{
    type: String,
    required: true,
    unique: true
  },
  email_is_verified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String
  },
  thid_party_auth: [ThirdParty],
  date: {
    type: Date,
    default: Date.now
  }
},
{ strict: false}
);

module.exports = User = mongoose.model("users", UserSchema);
