# WeathrAI 🌤️🤖

**WeathrAI** is a modern, AI-powered weather web application built with **React, Vite, and Tailwind CSS**. It delivers **live weather updates**, **forecasts**, and **personalized AI tips** for better planning your day.  

---

## 🔹 Features

- **Splash Screen with Location Detection**: Automatically detects your current location and fetches weather data.  
- **Live Animated Clock**: Shows live time, day, and date in real-time.  
- **Dynamic Weather Search**: Type any city name with a **typing-animation placeholder** and get instant weather info.  
- **Modern UI**:  
  - Glassmorphism cards for **temperature, wind speed, humidity, and visibility**.  
  - Forecast displayed in a **modern carousel style** for 5 days.  
- **AI-Powered Weather Tips**:  
  - Integrated with **Groq AI**.  
  - Generates **3 dynamic, user-friendly tips** based on real-time weather data.  
  - Tips focus on clothing, commute, outdoor plans, and safety.  
- **Dynamic Video Background**: Animated video backgrounds based on current weather condition.  
- **Responsive Design**: Fully responsive layout suitable for desktop and mobile devices.  
- **Professional Toast Notifications**: Alerts for invalid city searches or errors.  

---

## 🔹 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Moment.js, Swiper.js  
- **Backend:** Node.js, Express, Groq SDK, Axios, CORS  
- **APIs:** OpenWeatherMap API for weather & forecast data, Groq API for generating dynamic tips 
- **AI Integration:** Groq AI for personalized weather tips  

---

## 🔹 Project Structure

### Frontend (`/client`)

frontend/
├─ node_modules/
├─ public/
│  └─ assets/
├─ src/
│  ├─ component/
│  │  ├─ AIWeatherTips.jsx
│  │  ├─ ForecastCarousel.jsx
│  │  ├─ KeyMetrics.jsx
│  │  ├─ TypingPlaceholder.jsx
│  │  ├─ WeatherHeader.jsx
│  │  ├─ SplashScreen.jsx
│  │  └─ WeatherMain.jsx
│  ├─ utils/
│  │  └─ weatherAPI.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package.json
├─ package-lock.json


**Frontend Environment Variables (`.env`):**

```env
GROQ_API_KEY=your_groq_api_key

### Backend (`/server`)

server/
├─ node_modules/
├─ .env
├─ .gitignore
├─ index.js
├─ package.json
└─ package-lock.json

**Backend Environment Variables (`.env`):**

```env
GROQ_API_KEY=your_groq_api_key
OPENWEATHER_API_KEY=your_openweather_api_key

### Installation
cd client
npm install
npm run dev

cd server
npm install
npm start


## 🔹Usage

- Open the app in your browser.
- Allow location access on the splash screen.
- Explore current weather, forecast, and AI-generated tips.
- Use the search bar to check weather in any city.

## 🔹Future Improvements

Add multiple themes for day/night.
Allow custom locations & favorites.
Enhance AI tips with seasonal recommendations.
Add alerts for severe weather conditions.
Add a live clock for multiple cities worldwide.

WeathrAI – Making weather forecasting smarter, friendlier, and interactive! 🌦️🤖