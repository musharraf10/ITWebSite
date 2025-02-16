import User from "../models/users.model.js";
import httpStatus from 'http-status';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const validateEmail = async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await User.findOne({ email }); // This is First step of Our Login page
      // Validating the Email before entering Password
      
      if (user) {
        return res.status(200).json({ exists: true }); // Here Exists we are using in frontend User Context file to verify 
      } else {
        return res.status(200).json({ exists: false }); //if Exists return true then moving next step otherwise contactus
      }
    } catch (error) {
      return res.status(500).json({ message: error.message})
    }
  };


export const Login = async ( req,res ) =>{

    try{

      const { email, password } = req.body;

      // connsole.log(email, password) debuggng purpose

      if(!email || !password){
          return res.status(httpStatus.BAD_REQUEST).json({message : "Please Enter All Fields"})
      }

        const user = await User.findOne({email});

        // console.log(user) debugging purpose
        
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message : "Invalid Credentials"})
        }

        // const isMatch = await bcrypt.compare(password,user.password);

        if(user){

            const token = jwt.sign(
                {id : user._id, email : user.email, role : user.role},
                process.env.JWT_SECRET || "default_secret",
                { expiresIn: "3h" }
            )

            console.log(token)

            res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "Strict",
              maxAge: 2 * 60 * 60 * 1000,
            });

            res.status(httpStatus.OK).json({
                message : "Login Successfully",
                token : token,
                user : {id: user._id, email: user.email, role : user.role}
            });

        }else{
            res.status(httpStatus.UNAUTHORIZED).json({message : 'Invalid Credentials'}); //401
        }

    }catch(e){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message : `Error occured : ${e.name}`})
    }
}


export const forgotPassword = async (req, res) => {

  try {
      const { email, password } = req.body;

      if (!email) {
          return res.status(httpStatus.BAD_REQUEST).json({ message: "Enter email to reset password" });
      }

      const user = await User.findOne({ email });

      if (!user) {
          return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
      }

      if (!password) {
          return res.status(httpStatus.BAD_REQUEST).json({ message: "Please provide a new password" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;

      await user.save();  

      res.status(httpStatus.OK).json({ message: "Password updated successfully" });

  } catch (e) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error occurred: ${e.message}` });
  }
};

export const Logout = async (req, res) =>{

  res.clearCookie("token");
  res.status(httpStatus.OK).json({ message: 'Logged out successfully ' });

}