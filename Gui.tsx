// src/App.tsx
import React, { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // POST to local Ollama server
    const res = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "dolphin3",   // or llama3.1:8b etc.
        messages: newMessages,
        stream: false
      }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.message.content }]);
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">🦙 Local Ollama Chat</h1>
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl p-4 shadow-lg flex-1 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.role === "user" ? "text-blue-300" : "text-green-300"}`}>
            <b>{m.role === "user" ? "You" : "AI"}:</b> {m.content}
          </div>
        ))}
        {loading && <p className="italic text-gray-400">Thinking…</p>}
      </div>
      <div className="w-full max-w-2xl mt-4 flex">
        <input
          className="flex-1 p-2 rounded-l-lg bg-gray-700 text-gray-100 outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
