import React from "react";

const VoiceInput = ({ onActivate }) => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
      <div className="mb-2 font-semibold text-slate-900">Voice Assistant</div>
      <p className="mb-3 leading-6">
        Voice control is coming soon. For now, type your request in the chat box and the AI will act as your central gateway across FarmEase.
      </p>
      <button
        type="button"
        onClick={onActivate}
        className="rounded-full bg-green-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
      >
        Launch Voice Demo
      </button>
    </div>
  );
};

export default VoiceInput;
