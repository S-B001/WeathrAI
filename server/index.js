import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// Groq client init
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Health check (optional)
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Generate AI Weather Tips
app.post('/api/ai-tips', async (req, res) => {
  try {
    // Jo bhi API ka raw data aa raha hai usko le lo
    const weatherData = req.body;

    if (!weatherData || Object.keys(weatherData).length === 0) {
      return res.status(400).json({ error: 'Weather data required in body' });
    }

    const prompt = `
      You are a friendly yet professional Indian weather advisor.
      Write output in this exact format:
      - Start with ONE introductory line that naturally introduces 3 tips 
        (e.g., "I offer the following three tips for [city], [country]:")
        BUT you may rephrase it in a polite, casual, yet professional way.
      - After that line, provide exactly 3 bullet tips.
      - Use single bullet (•) for each tip.
      - Each tip ≤ 18 words.
      - Tone: casual + approachable, but advice must feel sincere & reliable.
      - Use Celsius, km/h.
      - Focus on clothing, outdoor plans, commute, and safety.
      - If rain/snow/haze/heatwave, include relevant caution.
      - Do NOT mention data, JSON, analysis, or that you are generating tips.

      Weather Data (JSON):
      ${JSON.stringify(weatherData, null, 2)}
    `.trim();

    const ai = await client.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }]
    });

    const text = (ai.choices[0]?.message?.content || '').trim();

    const fallback = [
      '• Light layers pehno, hydrated raho.',
      '• Bahar nikalne se pehle forecast check karo.',
      '• Commute/umbrella/raincoat ready rakho agar weather unstable ho.'
    ].join('\n');

    res.json({ tips: text || fallback });
  } catch (err) {
    console.error('AI Tips error:', err);
    res.status(500).json({ error: 'AI tips generation failed' });
  }
});

// Get weather data
app.get("/api/weather", async (req, res) => {
  const { lat, lon, q } = req.query;

  if (!q && (!lat || !lon)) {
    return res.status(400).json({ error: "City (q) or lat/lon required" });
  }

  try {
    // Current weather
    const currentRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q,
          lat,
          lon,
          units: "metric",
          appid: process.env.OPENWEATHER_API_KEY,
        },
      }
    );

    // Forecast
    const forecastRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q,
          lat,
          lon,
          units: "metric",
          appid: process.env.OPENWEATHER_API_KEY,
        },
      }
    );

    res.json({
      current: currentRes.data,
      forecast: forecastRes.data.list,
    });
  } catch (err) {
    console.error("Weather API error:", err.message);
    res.status(500).json({ error: "Weather API failed" });
  }
});

// Server listen
const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`AI Tips server running on http://localhost:${PORT}`);
});