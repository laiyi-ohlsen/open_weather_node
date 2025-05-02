import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/weather', async (req, res) => {
    const city = req.query.city || 'London';
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    console.log(url)

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(res.statusText);
      const data = await response.json();
      res.json(data);
     
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });