import React, { useState } from "react";
import { Input } from "../../components/ui/input";

const ChatInput = ({ onSend }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex rounded-xl border border-slate-200 bg-white shadow-sm">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask FarmEase AI anything..."
        className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="bg-green-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
