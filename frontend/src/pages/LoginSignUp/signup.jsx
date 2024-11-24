import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register, googleLogin } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios

const Signup = ({ handleSignIn, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // Add confirmPassword field
    country: "India",
    state: "",
    zipCode: "",
    isAdmin: false, // Add isAdmin field
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async (response) => {
    try {
      await googleLogin(response.credential);
      toast.success("Registration successful!");
      onLoginSuccess();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google signup failed");
    }
  };

  useEffect(() => {
    const loadGoogleSignIn = () => {
      window.google.accounts.id.initialize({
        client_id: "848737705738-laneat8dbes0590enbmv0alhcm048g3q.apps.googleusercontent.com",
        callback: handleGoogleLogin,
        auto_select: false,
        context: 'signup'
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignupButton"),
        { 
          theme: "outline", 
          size: "large", 
          width: "100%",
          text: "signup_with"
        }
      );
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = loadGoogleSignIn;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/users",
        formData
      );
      if (response.data) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        toast.success("Registration successful!");
        if (response.data.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { name: "name", label: "Full Name", type: "text", pattern: "^[A-Za-z\\s]+$", title: "Name should only contain letters and spaces", minLength: 3 },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password", pattern: "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", title: "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
    { name: "country", label: "Country", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "zipCode", label: "ZIP Code", type: "text" }
  ];

  return (
    <div className="w-full max-w-md mx-auto py-2">
      <motion.h1 
        className="text-2xl font-bold text-gray-800 text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Create Account
      </motion.h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="relative">
              <input
                id={field.name}
                name={field.name}
                type={field.name === "password" || field.name === "confirmPassword" ? (showPassword ? "text" : "password") : field.type}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                value={formData[field.name]}
                onChange={handleChange}
                required
                pattern={field.pattern}
                title={field.title}
                minLength={field.minLength}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
              {(field.name === "password" || field.name === "confirmPassword") && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ))}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input
              id="isAdmin"
              name="isAdmin"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
            <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900">
              Register as Admin
            </label>
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white py-1.5 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          disabled={loading}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          ) : (
            "Sign up"
          )}
        </motion.button>
      </form>

      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-4">
          <div id="googleSignupButton" className="flex justify-center"></div>
        </div>
      </div>

      <motion.p
        className="mt-4 text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Already have an account?{" "}
        <button
          type="button"
          className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors"
          onClick={handleSignIn}
        >
          Log in
        </button>
      </motion.p>
    </div>
  );
};

export default Signup;