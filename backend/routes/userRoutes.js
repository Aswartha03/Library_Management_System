let express = require ('express');
const {
  signUp,
  login,
  Profile,
  updateProfile,
  forgotPassword,
  resetPassword,
} = require ('../controllers/userController');
const authMiddleware = require ('../middlewares/authMiddleware');

let userRouter = express.Router ();

// sign up
userRouter.post ('/signup', signUp);
// login
userRouter.post ('/login', login);
// profile
userRouter.get ('/profile', authMiddleware, Profile);
// update profile
userRouter.put ('/update', authMiddleware, updateProfile);
// forgot password 
userRouter.post("/forgot-password",forgotPassword)
// reset password 
userRouter.put("/reset-password/:token",resetPassword)







module.exports = userRouter;
