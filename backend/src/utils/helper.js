import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const generateNanoId = (length) => {
    return nanoid(length); // Generates a short code of specified length
}

export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"60m"});
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export const hashPassword = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

