import React, { useState, useRef, useEffect } from "react";
import Signin from "./signup";
import Login from "./login";
import { motion, AnimatePresence } from "framer-motion";

const LoginPopUp = ({ loginPopup, handleLoginPopup, onLoginSuccess }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const handleBackdropClick = (e) => {
    if (e.target === loginPopupRef.current) {
      handleLoginPopup(false);
    }
  };

  const bgImage = {
    width: "100%",
    height: "100%",
    backgroundImage: "url(https://picsum.photos/800/800)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "0 1rem 1rem 0",
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
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full"
            style={{ maxWidth: "1000px" }}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2">
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
              <div className="hidden sm:block relative h-full">
                <motion.div
                  className="absolute inset-0"
                  style={bgImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 mix-blend-overlay" />
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
