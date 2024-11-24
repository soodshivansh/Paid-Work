import React, { useState, useRef, useEffect } from "react";
import Signin from "./signup";
import Login from "./login";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

const LoginPopUp = ({ loginPopup, handleLoginPopup, onLoginSuccess }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  const handleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  const loginPopupRef = useRef();

  useEffect(() => {
    if (loginPopup) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loginPopup]);

  useEffect(() => {
    fetch('/assets/signUpAnimation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === loginPopupRef.current) {
      handleLoginPopup(false);
    }
  };

  return (
    <AnimatePresence>
      {loginPopup && (
        <motion.div
          ref={loginPopupRef}
          className="fixed inset-0 z-[1000] overflow-y-auto bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 relative">
                <button
                  onClick={() => handleLoginPopup(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={showSignIn ? 'signin' : 'login'}
                    initial={{ opacity: 0, x: showSignIn ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: showSignIn ? -100 : 100 }}
                    transition={{ duration: 0.3 }}
                  >
                    {showSignIn ? (
                      <Signin handleSignIn={handleSignIn} onLoginSuccess={onLoginSuccess} />
                    ) : (
                      <Login handleSignIn={handleSignIn} onLoginSuccess={onLoginSuccess} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="hidden md:flex items-center justify-center p-8 bg-gray-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-md"
                >
                  {animationData && (
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      className="w-full h-auto"
                    />
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginPopUp;
