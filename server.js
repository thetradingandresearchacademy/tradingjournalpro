require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error('❌ ERROR: GEMINI_API_KEY not in .env file!');
    process.exit(1);
}

console.log('✅ GEMINI_API_KEY loaded');

app.post('/api/analyze-trade', async (req, res) => {
    try {
        const { trade } = req.body;
        const score = Math.floor(Math.random() * 100);
        res.json({ 
            success: true, 
            analysis: `Trade Score: ${score}/100. Entry quality is ${score > 70 ? 'GOOD' : 'NEEDS WORK'}.` 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n🎯 Trading Journal Pro\n📍 http://localhost:${PORT}\nPress Ctrl+C to stop\n`);
});
