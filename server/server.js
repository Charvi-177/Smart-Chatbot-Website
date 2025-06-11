const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const responses = require('./responses');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  const reply = getSmartReply(userMessage);
  res.json({ reply });
});

function getSmartReply(message) {
  for (let keyword in responses) {
    const variations = responses[keyword].patterns;
    for (let pattern of variations) {
      if (message.includes(pattern)) {
        return responses[keyword].response;
      }
    }
  }
  return "I'm sorry, I couldn't understand that. Can you rephrase?";
}

app.listen(PORT, () => console.log(`🤖 Smart Chatbot Backend running at http://localhost:${PORT}`));
