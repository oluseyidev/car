

import React, { useState, useEffect, useRef } from 'react';

export default function ChatAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:5050/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }), // ✅ Fixed line
      });

      if (!res.ok) throw new Error('Failed to fetch AI response');

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: 'user', text: userMessage },
        { from: 'ai', text: data.reply },
      ]);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white shadow-xl rounded-xl w-full h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-3 text-blue-700">Ask CarNest Assistant</h2>

      <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-2 max-h-60">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded text-sm ${
              msg.from === 'ai'
                ? 'bg-gray-100 text-left text-gray-800'
                : 'bg-blue-100 text-right text-blue-900'
            }`}
          >
            <strong>{msg.from === 'ai' ? 'AI:' : 'You:'}</strong> {msg.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          className="flex-1 p-2 border border-gray-300 rounded"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
