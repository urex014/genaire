import mongoose from "mongoose"


const authSchema = new mongoose.Schema(
  {
    fullName:{
      type:String,
      required:[false],
      trim:true,
    },
    email:{
      type:String,
      required:[true,'email cannot be left blank'],
      trim:true,
    },
    password:{
      type:String,
      required:true,
      trim:true
    },
    phone:{
      type:String,
      trim:true,
      required:true,
    }
  },
  {
    timestamps:true,
  }
);

const Auth = mongoose.model("Auth", authSchema);
export default Auth;