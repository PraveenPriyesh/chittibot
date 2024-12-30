const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware to handle JSON requests and CORS
app.use(express.json());
app.use(cors());

// Endpoint to handle the chatbot requests
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  const url = "https://wsapi.simsimi.com/190410/talk";
  const apiKey = "oVhR~MwtfE4Lb8giDZLodOmVCsYNCV8Dtby0MNIG"; // Replace with your SimSimi API key

  try {
    const response = await axios.post(
      url,
      {
        utext: message,
        lang: "en",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    const botResponse = response?.data?.atext;

    if (botResponse) {
      res.json({ response: botResponse });
    } else {
      res.status(500).json({ error: "SimSimi did not provide a response." });
    }
  } catch (error) {
    console.error("Error with SimSimi API:", error);
    res.status(500).json({ error: "Failed to fetch response from SimSimi." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
