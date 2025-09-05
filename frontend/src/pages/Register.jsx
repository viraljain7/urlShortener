import { Mail, Lock, EyeOff, Eye, User } from "lucide-react";
import { useState } from "react";
import { registerUser } from "../api/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "@tanstack/react-router";

export function RegisterForm({ changePage }) {
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const registerHandler = async () => {
    try {
      if (!registerData.name || !registerData.email || !registerData.password) {
        throw new Error("All fields are required");
      }

      const data = await registerUser(
        registerData.email,
        registerData.password,
        registerData.name,
      );

      if (data.status === "success") {
        toast.success(data.message);
        dispatch(login(data.data.user));  
        navigate({to:"/"});
        setRegisterData({ name: "", email: "", password: "" });
      }
      // Handle successful registration (e.g., redirect to login page)
      changePage();
    } catch (error) {
      console.error("Registration error:", error);
    }
    // Handle registration logic here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
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
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <p className="text-sm text-gray-500">Join us and get started today</p>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              name="password"
              value={registerData.password}
              onChange={handleInputChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            onClick={registerHandler}
          >
            Sign Up
          </button>
        </div>

        {/* Social login */}
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-200" />
            <span className="text-sm text-gray-400">Or sign up with</span>
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
          Already have an account?{" "}
          <a className="text-indigo-600 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}
