import React from "react";
import { samplePrompts } from "./aiService";

const Suggestions = ({ onClick }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 text-sm font-semibold text-slate-900">Try these</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {samplePrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onClick(prompt)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:border-green-900 hover:bg-green-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
