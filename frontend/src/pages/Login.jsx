import { Mail, Lock, EyeOff, Eye, User } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../api/userApi";
import { toast } from "react-toastify";
import { useDispatch,  } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "@tanstack/react-router";

export function LoginForm({ changePage }) {
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // const auth=useSelector((state)=>state.auth);
const navigate=useNavigate();

  const dispatch=useDispatch();

  const loginHandler = async () => {
    try {
      if (!loginData.email || !loginData.password) {
        throw new Error("All fields are required");
      }
      const data = await loginUser(loginData.email, loginData.password);
      if (data.status === "success") {
        toast.success(data.message);
        dispatch(login(data.data.user));
        setLoginData({ email: "", password: "" });
        navigate({to:"/"});
      }

      
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="  bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="bg-indigo-600 p-3 rounded-full text-white mb-3">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm text-gray-500">
            Please sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            onClick={loginHandler}
          >
            Sign In
          </button>
        </div>

        {/* Social login (Google only) */}
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-200" />
            <span className="text-sm text-gray-400">Or continue with</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <div className="flex justify-center mt-4">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition w-full">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p
          className="text-center text-sm text-gray-600 mt-6"
          onClick={changePage}
        >
          Don’t have an account?{" "}
          <a className="text-indigo-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
