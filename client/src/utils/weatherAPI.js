import axios from "axios";

export const fetchWeatherData = async (lat, lon) => {
  try {
    const res = await axios.get("http://localhost:8787/api/weather", {
      params: { lat, lon },
    });

    return res.data; // { current, forecast }
  } catch (error) {
    console.error("Weather API error:", error.message);
    throw error;
  }
};
