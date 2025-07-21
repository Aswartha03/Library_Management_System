let mongoose = require ('mongoose');
let userSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true, lowercase: true},
  password: {type: String, required: true, minlength: 6},
  role: {
    type: String,
    required: true,
    enum: ['user', 'librarian'],
    default: 'user',
  },
  createdAt: {type: Date, default: Date.now ()},
  isVerified: {type: Boolean, default: false},
  contact : {type:Number,default:null} 
});

let UserModel = mongoose.model ('users', userSchema);

module.exports = UserModel;
