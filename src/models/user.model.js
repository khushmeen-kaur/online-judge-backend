const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function () {
    if (!this.isModified || !this.isModified('password')) {
        return;
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

userSchema.methods.generateJWT = function () {
    const token = jwt.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    return token;
};

userSchema.methods.comparePassword=async function (password){
    console.log(password,this.password)
    return bcrypt.compare(password,this.password)
}

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;