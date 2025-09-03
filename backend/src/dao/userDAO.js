import User from "../models/userModel.js";
import { signToken } from "../utils/helper.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async (name, email, hashedPassword) => {
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const token = signToken({ id: newUser._id.toString() });

  return { token, user: newUser };
};

export const findUserById = async (id) => {
  return await User.findById(id);
};
