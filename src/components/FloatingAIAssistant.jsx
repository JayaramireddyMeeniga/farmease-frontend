import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bot, Sparkles } from "lucide-react";

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
      className={`ai-assistant-fab fixed right-6 bottom-4 z-50 flex shrink-0 items-center gap-3 ${visible ? "ai-assistant-fab-visible" : "ai-assistant-fab-hidden"
        }`}
      style={{ willChange: "transform, opacity" }}
      aria-label="Open FarmEase AI Assistant"
    >
      <span className="relative inline-flex p-4 shrink-0 items-center justify-center rounded-full bg-[#fff8e8] text-[#1f6f4d] shadow-[inset_0_-8px_18px_rgba(216,155,37,0.18)] ring-1 ring-white/80">
        <Bot className="h-8 w-8" />
        <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#f5c66a] text-[#17251e] ring-2 ring-[#17251e]">
          <Sparkles className="h-3 w-3" />
        </span>
      </span>
    </button>
  );
};

export default FloatingAIAssistant;
