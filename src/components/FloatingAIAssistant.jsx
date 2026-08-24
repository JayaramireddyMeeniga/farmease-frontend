import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FloatingAIAssistant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  if (location.pathname === "/ai-assistant") {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => navigate("/ai-assistant")}
      className={`ai-assistant-fab fixed right-6 z-50 flex items-center gap-3 rounded-full bg-green-800 px-4 py-3 text-white shadow-[0_18px_48px_rgba(34,115,65,0.28)] ${visible ? "ai-assistant-fab-visible" : "ai-assistant-fab-hidden"
        }`}
      style={{ top: "1.5rem", willChange: "transform, opacity" }}
      aria-label="Open FarmEase AI Assistant"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fffaf2] text-green-900 shadow-inner">
        AI
      </span>
    </button>
  );
};

export default FloatingAIAssistant;
