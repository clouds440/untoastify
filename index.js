"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

// Context
const ToastContext = createContext();

// Provider
export const ToastProvider = ({
  children,
  defaultPosition = "top-left",
  defaultDuration = 4000,
}) => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({
    message = "Please provide a message",
    type = "info",
    position,
    duration,
  }) => {
    const id = Date.now();
    setToasts((prev) => [
      ...prev,
      {
        id,
        message,
        type,
        position: position || defaultPosition,
        duration: duration || defaultDuration,
      },
    ]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <PopupMessage
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};

// Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

// PopupMessage Component
export function PopupMessage({
  id,
  message,
  type,
  position,
  duration,
  onClose,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Determine alignment and animation
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };
  const [vertical, horizontal] = position.split("-"); // e.g., "top-right"

  const isRight = horizontal === "right";
  const initialX = isRight ? "100%" : "-100%";
  const exitX = initialX;
  const animateX = 0;

  // Colors and Icon paths
  let iconPath, bgColor;
  switch (type) {
    case "success":
      iconPath =
        "M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z";
      bgColor = "bg-green-600";
      break;
    case "error":
      iconPath =
        "M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z";
      bgColor = "bg-red-600";
      break;
    case "warning":
      iconPath =
        "M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z";
      bgColor = "bg-yellow-600";
      break;
    case "info":
    default:
      iconPath =
        "M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z";
      bgColor = "bg-blue-500";
      break;
  }

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current text-white"
      viewBox="0 0 16 16"
      width="20"
      height="20"
    >
      <path fillRule="evenodd" d={iconPath}></path>
    </svg>
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`toast-container ${positionClasses[position]}`}
          initial={{ x: initialX }}
          animate={{ x: animateX }}
          exit={{ x: exitX }}
          transition={{ duration: 0.3 }}
        >
          {/* Icon */}
          <div className={`toast-icon ${bgColor}`}>{icon}</div>

          {/* Message */}
          <div className="toast-message">
            <span>{message}</span>
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(onClose, 300);
              }}
              className="toast-close-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                ></path>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
