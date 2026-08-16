import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";

const TipCarousel = ({ tips }) => {
  const [index, setIndex] = useState(0);
  const activeTip = useMemo(() => tips[index % tips.length], [index, tips]);

  const speakTip = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${activeTip.title}. ${activeTip.description}`));
  };

  return (
    <div className="rounded-lg bg-slate-950 p-5 text-white shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-green-300">Today's Smart Tip</p>
          <h2 className="mt-2 text-2xl font-bold">{activeTip.title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-200">{activeTip.description}</p>
        </div>
        <button
          type="button"
          onClick={speakTip}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-green-200 transition hover:bg-white/20"
          title="Listen Tip"
        >
          <Volume2 size={18} />
        </button>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="rounded-full bg-green-400/15 px-3 py-1 text-xs font-semibold text-green-200">
          {activeTip.category} / {activeTip.crop}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIndex((value) => (value - 1 + tips.length) % tips.length)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
            title="Previous tip"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => setIndex((value) => (value + 1) % tips.length)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
            title="Next tip"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipCarousel;
