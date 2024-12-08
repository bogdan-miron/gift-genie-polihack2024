"use client";
import React, { useState } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  // Function to handle sending a message
  const handleSend = () => {
    if (!input.trim()) return; // Prevent sending empty messages

    // Add the user's message to the chat
    const newMessage: Message = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Simulate a bot response (can be replaced with actual API calls later)
    setTimeout(() => {
      const botResponse: Message = { sender: "bot", text: "Hello! How can I assist you?" };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);

    setInput(""); 
  };

  return (
    <div >
      <div>
        {messages.map((msg, index) => (
          <div
            key={index}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
