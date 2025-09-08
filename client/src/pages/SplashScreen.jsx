import { useEffect } from 'react';
import bgImage from '../assets/bg.jpg';
import loadingGif from '../assets/loading.gif';

const SplashScreen = ({ onLocationDetected }) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('✅ Location received:', latitude, longitude); // add this
        onLocationDetected(latitude, longitude);
      },
      (error) => {
        console.error('❌ Location error:', error);
      }
    );
  }, []);

  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }} >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative text-white text-center flex flex-col items-center">
        <img src={loadingGif} alt="loading" className="w-24 mb-4" />
        <p className="text-lg max-w-md">
          Detecting your location<br/>
          Your current location will be displayed on the App<br/>
          & used for calculating Real time weather.
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;