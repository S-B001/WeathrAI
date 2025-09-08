import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from "axios";
import { fetchWeatherData } from '../utils/weatherAPI';
import TypingPlaceholder from '../component/TypingPlaceholder';
import ForecastCarousel from '../component/ForecastCarousel';
import KeyMetrics from '../component/KeyMetrics';
import AIWeatherTips from '../component/AIWeatherTips';
import WeatherHeader from '../component/WeatherHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// weather videos import 
import ThunderstormVideo from '../assets/weather-video/thunderstorm.mp4';
import DrizzleVideo from '../assets/weather-video/drizzle.mp4';
import RainVideo from '../assets/weather-video/rain.mp4';
import SnowVideo from '../assets/weather-video/snow.mp4';
import AtmosphereVideo from '../assets/weather-video/fog.mp4';
import ClearVideo from '../assets/weather-video/clear.mp4';
import CloudsVideo from '../assets/weather-video/cloud.mp4';


const videoMap = {
  thunderstorm: ThunderstormVideo,
  drizzle: DrizzleVideo,
  rain: RainVideo,
  snow: SnowVideo,
  atmosphere: AtmosphereVideo,
  clear: ClearVideo,
  clouds: CloudsVideo,
};
// For Atmosphere types like Mist, Fog, Dust etc.
const atmosphereTypes = ['mist', 'fog', 'dust', 'smoke', 'haze', 'sand', 'ash', 'squall', 'tornado'];


const WeatherMain = ({ coords }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [currentTime, setCurrentTime] = useState(moment().format('hh:mm:ss A'));
  const [timezone, setTimezone] = useState(0);
  const [aiTips, setAiTips] = useState([]);
  const typingText = TypingPlaceholder("Check weather in");
  const [bgVideo, setBgVideo] = useState(videoMap.clear);
  const [fadeVideo, setFadeVideo] = useState(null);

  useEffect(() => {
  if (weather) {
    fetchAITips();
  }
}, [weather]);

  useEffect(() => {
    if (coords?.lat && coords?.lon) {
      fetchWeatherData(coords.lat, coords.lon).then(setWeather);
    }
  }, [coords]);

    // Update live time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (timezone) {
        const localTime = moment.utc().add(timezone, 'seconds').format('hh:mm:ss A');
        setCurrentTime(localTime);
      } else {
        setCurrentTime(moment().format('hh:mm:ss A')); // Default to local time if no timezone data
      }
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [timezone]);


    const currentWeather = weather?.current?.weather?.[0] || {};
  const currentWeatherType = (currentWeather.main || 'clear').toLowerCase();

  useEffect(() => {
  if (!currentWeatherType) return;

  let nextVideo = videoMap[currentWeatherType] || videoMap.clear;
  if (atmosphereTypes.includes(currentWeatherType)) {
    nextVideo = videoMap.atmosphere;
  }

  if (nextVideo === bgVideo) return;

  setFadeVideo(nextVideo);

  const timeout = setTimeout(() => {
    setBgVideo(nextVideo);
    setFadeVideo(null);
  }, 800);

  return () => clearTimeout(timeout);
}, [currentWeatherType]);

// AI tips 
const fetchAITips = async () => {
  if (!weather) return;

  try {
    const { 
      name, 
      weather: weatherArr, 
      main, 
      wind, 
      visibility, 
      sys, 
      coord, 
      timezone 
    } = weather.current;

    const payload = {
      // Location info
      city: name,
      country: sys?.country,
      latitude: coord?.lat,
      longitude: coord?.lon,
      timezone,

      // Weather info
      condition: weatherArr[0]?.main,
      description: weatherArr[0]?.description,
      tempC: main?.temp,
      feelsLikeC: main?.feels_like,
      tempMinC: main?.temp_min,
      tempMaxC: main?.temp_max,
      humidity: main?.humidity,
      pressure: main?.pressure,

      // Wind/visibility
      windMps: wind?.speed,
      windDeg: wind?.deg,
      windGust: wind?.gust,
      visibilityKm: visibility / 1000,

      // Sunrise/Sunset
      sunrise: sys?.sunrise,
      sunset: sys?.sunset,

      // Placeholder for now
      uvIndex: 5
    };

    const response = await axios.post("http://localhost:8787/api/ai-tips", payload, {
      headers: { "Content-Type": "application/json" },
    });

    setAiTips(response.data.tips.split("\n").filter(t => t.trim() !== ""));
  } catch (err) {
    console.error("❌ Error fetching AI Tips:", err);
  }
};

// end AItips 

const handleSearch = async () => {
  if (!city.trim()) {
    toast.error("Please enter a city name!");
    return;
  }

  try {
    const response = await axios.get("http://localhost:8787/api/weather", {
      params: { q: city },
    });

    const fullWeather = response.data;

    if (fullWeather?.current) {
      setWeather(fullWeather);
      setTimezone(fullWeather.current.timezone || 0);
    } else {
      toast.error("City not found! Please enter a valid city.");
    }
  } catch (err) {
    console.error("Error fetching weather by city:", err);
    toast.error("City not found. Check the spelling and try again.");
  }
};

if (!weather || !weather.current || !weather.forecast) return null;

const { 
  name, 
  weather: weatherArr = [], 
  main = {}, 
  wind = {}, 
  visibility = 0
} = weather.current || {};

console.log("🌤️ currentWeather.main:", currentWeather.main);

const forecastByDay = (weather?.forecast || []).reduce((acc, item) =>  {
  const date = moment(item.dt_txt).format("YYYY-MM-DD");
  if (!acc[date]) {
    acc[date] = item;
  }
  return acc;
}, {});

const forecastdaily = Object.values(forecastByDay).slice(1, 5); // sirf 5 din

  return (
    <div className="w-screen h-screen relative overflow-hidden">

        {/* Wrong city name handler  */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {/* Base video */}
        <video
          key={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-700 opacity-100"
          src={bgVideo}
        />

        {/* Fade transition video */}
        {fadeVideo && (
          <video
            key={fadeVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 opacity-100"
            src={fadeVideo}
          />
        )}

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col lg:flex-row w-full h-full text-white">
        <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Left Section */}
          <WeatherHeader
              currentTime={currentTime}
              temp={main.temp}
              location={name}
            />

        {/* Right Section */}
        <div className="w-full lg:w-[30%] bg-black/50 p-4 sm:p-6 text-white flex flex-col gap-4 sm:gap-4 overflow-y-auto lg:overflow-y-auto custom-scrollbar">

          {/* Search Bar */}
          <div className="flex items-center bg-gray-800/50 rounded-full px-3 sm:px-4 py-2 border border-gray-600">
            <i className="bx bx-search text-gray-400 text-lg sm:text-xl mr-2"></i>
            <input
              type="text"
              placeholder={typingText}  // ✅ ab placeholder me typing effect hoga
              className="w-full bg-transparent text-white placeholder:text-gray-400 outline-none text-sm sm:text-base"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </div>

          {/* Current Weather */}
          <div className="text-center">
            <p className="text-lg sm:text-xl font-semibold mt-1 capitalize">
              {currentWeather.description}
            </p>
          </div>

          {/* Key Metrics */}
          <KeyMetrics 
            metrics={[
              { label: "Temperature", value: `${Math.round(main.temp)}°C` },
              { label: "Humidity", value: `${main.humidity}%` },
              { label: "Wind Speed", value: `${wind.speed} m/s` },
              { label: "Visibility", value: visibility ? `${(visibility / 1000).toFixed(2)} km` : "N/A" },
            ]}
          />
          
          {/* Forecast */}
          <div className="">
            <ForecastCarousel forecastdaily={forecastdaily} />
          </div>
        
          {/* AI Weather Tips */}
          <AIWeatherTips tips={aiTips} />
        </div>
      </div>

      </div>
    </div>
  
  );
};

export default WeatherMain;