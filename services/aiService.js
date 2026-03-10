const axios = require("axios");

async function getAIResponse(message) {

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const response = await axios.post(url, {
    contents: [
      {
        role: "user",
        parts: [
          { text: message }
        ]
      }
    ]
  });

  return response.data.candidates[0].content.parts[0].text;

}

module.exports = getAIResponse;