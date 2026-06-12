const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));
app.use(express.json());
app.post('/chat', (req, res) => {
    console.log('Received:', req.body.message);
    const replies = [
        "I'm here for you! Remember, small steps lead to big changes. 😊",
        "That's a great question. Staying hydrated and taking breaks helps a lot!",
        "I appreciate you asking. Have you tried deep breathing for a minute?",
        "Wellness is a journey – you're doing great by seeking support.",
        "If you're feeling stressed, a short walk can work wonders.",
        "Remember to consult a doctor for personal health advice, but I'm here to encourage you!"
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    res.json({ reply: reply });
});
app.listen(3001, () => console.log('✅ WellNest AI running on http://localhost:3001'));
