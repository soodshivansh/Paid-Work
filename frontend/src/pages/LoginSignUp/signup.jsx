import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register, googleSignup } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Signup = ({ handleSignIn, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "India",
    state: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignup = async (response) => {
    try {
      await googleSignup(response.credential);
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
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignup,
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
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userData = new FormData();
      userData.append('name', formData.name);
      userData.append('email', formData.email);
      userData.append('password', formData.password);
      userData.append('country', formData.country);
      userData.append('state', formData.state);
      userData.append('zipCode', formData.zipCode);

      await register(userData);
      toast.success("Registration successful!");
      onLoginSuccess();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter your password",
      required: true,
      icon: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: showPassword ? "text" : "password",
      placeholder: "Confirm your password",
      required: true,
      icon: true,
    },
    {
      label: "Country",
      name: "country",
      type: "text",
      placeholder: "Enter your country",
      required: true,
      value: "India",
      disabled: true,
    },
    {
      label: "State",
      name: "state",
      type: "text",
      placeholder: "Enter your state",
      required: true,
    },
    {
      label: "ZIP Code",
      name: "zipCode",
      type: "text",
      placeholder: "Enter your ZIP code",
      required: true,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      {formFields.map((field, index) => (
        <motion.div
          key={field.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <div className="mt-1 relative">
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              disabled={field.disabled}
              placeholder={field.placeholder}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            />
            {field.icon && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            )}
          </div>
        </motion.div>
      ))}

      <div className="space-y-4">
        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white py-1.5 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? "Signing up..." : "Sign up"}
        </motion.button>

        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div> */}

        {/* <div id="googleSignupButton" className="w-full"></div> */}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={handleSignIn}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};

export default Signup;