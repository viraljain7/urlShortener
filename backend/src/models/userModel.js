import mongoose from "mongoose";
import { generateAvatar } from "../utils/avatarGenerator.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
     
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to auto-generate avatar if not provided
userSchema.pre("save", function (next) {
    if (!this.avatar && this.email) {
      this.avatar = generateAvatar(this.email);
    }
    next();
  });

// // Generate JWT Token
// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     { _id: this._id, email: this.email },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }// token valid for 7 days
//   );
//   return token;
// };

const User = mongoose.model("User", userSchema);

export default User;
