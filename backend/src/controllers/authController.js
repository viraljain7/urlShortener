import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";
import { AppError } from "../errors/AppError.js";
import { createUser, findUserByEmail } from "../dao/userDAO.js";
import { comparePassword, hashPassword, signToken, } from "../utils/helper.js";
import { cookieOptions } from "../config/cookieOptions.js";



const authController = {
  // ✅ Register User
  registerUser: tryCatchWrapper(async (req, res, next) => {
    const { name, email, password } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    // 2. Check if user already exists
    const existingUser = await findUserByEmail( email );
    if (existingUser) {
      return next(new AppError("User already exists", 400));
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password, 12);

    // 4. Create user
    const { token, user } = await createUser( name, email, hashedPassword );
    if (!user) {
      return next(new AppError("Failed to create user", 500));
    }

    // 5. Generate JWT
    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    

    // 6. Send response
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  }),

  // ✅ Login User
  loginUser: tryCatchWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    // 2. Find user
    const user = await findUserByEmail( email );
    const token = signToken({ id: user._id.toString() });
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    // 3. Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid email or password", 401));
    }

    req.user = user;


    res.cookie("accessToken", token, cookieOptions);

    // 5. Send response
    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,

      },
    });
  }),
};

export default authController;