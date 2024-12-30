import React, { useState } from "react";
import axios from "axios";
import "./bot.css"; // Style your bot in this CSS file

const ChatBot = () => {
  const [messages, setMessages] = useState([]); // Store chat messages
  const [input, setInput] = useState(""); // Store user input

  const sendMessageToBot = async (inputMessage) => {
    if (!inputMessage.trim()) return; // Don't send empty messages

    // Add user's message to the state
    const userMessage = { sender: "user", text: inputMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chat",
        { message: inputMessage }
      );

      const botResponseText = response?.data?.response;

      if (botResponseText) {
        // Add bot's response to the state
        const botMessage = { sender: "bot", text: botResponseText };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        throw new Error("No response from the bot");
      }
    } catch (error) {
      console.error("Error communicating with backend:", error.message);
      const errorMessage = { sender: "bot", text: "Sorry, something went wrong. Please try again." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setInput(""); // Clear input after sending the message
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
          onKeyDown={(e) => e.key === "Enter" && sendMessageToBot(input)} // Send message on Enter key press
        />
        <button className="send-button" onClick={() => sendMessageToBot(input)}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
