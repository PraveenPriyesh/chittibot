import React, { useState } from "react";
import axios from "axios"; 
import "./bot.css"; 

const fetchResponse = async (input) => {
  const data = { input }; // Send the user input to your server

  try {
    const response = await axios.post("http://localhost:5000/api/chat", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.response || "I'm sorry, I didn't understand that.";
  } catch (error) {
    console.error("Axios error:", error);
    return "There was an error communicating with the server: " + error.message;
  }
};

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);

      // Fetch the bot's response from your server
      const botResponseText = await fetchResponse(input);
      const botMessage = { text: botResponseText, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);

      // Clear input
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">ChatBot</div>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-bubble ${message.sender === "bot" ? "bot" : "user"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
