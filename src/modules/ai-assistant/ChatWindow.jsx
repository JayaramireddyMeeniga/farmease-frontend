import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import Suggestions from "./Suggestions";
import VoiceInput from "./VoiceInput";
import { getAiResponse } from "./aiService";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      type: "text",
      text: "Welcome to FarmEase AI. Ask anything from cold storage search and transport booking to crop advice and profit analytics.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      type: "text",
      text,
    };

    setMessages((current) => [...current, userMessage]);
    setTyping(true);

    const responseMessages = await getAiResponse(text);
    setMessages((current) => [...current, ...responseMessages]);
    setTyping(false);
  };

  const handleSuggestionClick = async (text) => {
    await handleSend(text);
  };

  const handleVoiceActivate = () => {
    handleSend("Show nearby cold storage");
  };

  return (
    <div className="mx-auto flex flex-col gap-6 px-4 py-6 px-6">
      <section className="rounded-xl border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(72,187,120,0.08),_transparent_42%)] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-green-900/80">FarmEase AI Assistant</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
              One place to ask, act, and navigate.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Use the AI gateway to fetch products, book transport, search warehouses, hire workers, and view analytics without leaving this chat.
            </p>
          </div>
          <div className="w-full min-w-[240px] sm:w-auto">
            <VoiceInput onActivate={handleVoiceActivate} />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Chat</h2>
                <p className="text-sm text-slate-500">Ask the assistant and it will route your request into the right FarmEase module.</p>
              </div>
              {typing && <span className="text-sm text-green-700">AI is typing…</span>}
            </div>
            <div className="flex max-h-[58vh] flex-col gap-3 overflow-y-auto px-1 pb-3">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <ChatInput onSend={handleSend} />
          </div>

          <div className="flex flex-col gap-6">
            <Suggestions onClick={handleSuggestionClick} />
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">What this assistant can do</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• Find nearby cold storage and warehouses.</li>
                <li>• Recommend products, seeds, and fertilizers.</li>
                <li>• Book transport and find labor.</li>
                <li>• Show profit analytics and market insights.</li>
                <li>• Answer weather and crop advisory requests.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatWindow;
