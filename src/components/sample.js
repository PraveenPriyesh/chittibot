const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow all origins (you can restrict it later)
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { input } = req.body;
  const url = "https://wsapi.simsimi.com/190410/talk";
  const apiKey = "oVhR~MwtfE4Lb8giDZLodOmVCsYNCV8Dtby0MNIG";

  try {
    const response = await axios.post(url, {
      utext: input,
      lang: "en",
      cf_info: [
        "qtext",
        "country",
        "atext_bad_prob",
        "atext_bad_type",
        "regist_date",
      ],
    }, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });
    
    res.json({ response: response.data.atext });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
