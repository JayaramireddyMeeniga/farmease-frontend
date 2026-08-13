import React from "react";

const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";
  const bubbleClass = isUser
    ? "self-end rounded-3xl rounded-br-none bg-green-900 text-white"
    : "self-start rounded-3xl rounded-bl-none bg-white text-gray-900 shadow-lg";

  if (message.type === "text") {
    return (
      <div className={`mb-4 max-w-xl px-4 py-3 ${bubbleClass}`}>
        <p className="whitespace-pre-wrap text-sm leading-6">{message.text}</p>
      </div>
    );
  }

  const renderCard = (card) => {
    if (message.type === "product_card") {
      return (
        <div key={card.id} className="rounded-3xl border border-green-100 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-green-900">{card.title}</div>
          <div className="mt-1 text-xs text-slate-500">{card.subtitle}</div>
          <div className="mt-3 flex items-center justify-between text-sm text-slate-700">
            <span>{card.price}</span>
            <button className="rounded-full bg-green-900 px-3 py-1 text-white transition hover:bg-green-800">
              {card.action}
            </button>
          </div>
        </div>
      );
    }

    if (message.type === "warehouse_card") {
      return (
        <div key={card.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">{card.name}</div>
          <div className="mt-1 text-xs text-slate-500">{card.distance}</div>
          <div className="mt-2 flex items-center justify-between text-sm text-slate-700">
            <span>{card.availability}</span>
            <button className="rounded-full bg-green-900 px-3 py-1 text-white transition hover:bg-green-800">
              {card.action}
            </button>
          </div>
        </div>
      );
    }

    if (message.type === "transport_card") {
      return (
        <div key={card.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">{card.vehicle}</div>
          <div className="mt-1 text-xs text-slate-500">Capacity: {card.capacity}</div>
          <div className="mt-1 text-xs text-slate-500">ETA: {card.eta}</div>
          <div className="mt-3 flex items-center justify-between text-sm text-slate-700">
            <span>{card.price}</span>
            <button className="rounded-full bg-green-900 px-3 py-1 text-white transition hover:bg-green-800">
              {card.action}
            </button>
          </div>
        </div>
      );
    }

    if (message.type === "worker_card") {
      return (
        <div key={card.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">{card.name}</div>
          <div className="mt-1 text-xs text-slate-500">{card.role}</div>
          <div className="mt-2 text-xs text-slate-500">{card.experience} · {card.distance}</div>
          <div className="mt-2 flex items-center justify-between text-sm text-slate-700">
            <span>{card.wage}</span>
            <button className="rounded-full bg-green-900 px-3 py-1 text-white transition hover:bg-green-800">
              {card.action}
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mb-4 w-full max-w-2xl">
      <div className="mb-3 text-sm font-semibold text-slate-500">AI suggestions</div>
      <div className="grid gap-3 sm:grid-cols-2">{message.cards.map(renderCard)}</div>
    </div>
  );
};

export default MessageBubble;
