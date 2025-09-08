import { useEffect, useState } from 'react';
import SplashScreen from './pages/SplashScreen';
import WeatherMain from './pages/WeatherMain';

const App = () => {
  const [coords, setCoords] = useState(null);

  console.log('🧭 Coords state:', coords);

  return coords
    ? <WeatherMain coords={coords} />
    : <SplashScreen onLocationDetected={(lat, lon) => {
        setCoords({ lat, lon });
      }} />;
}

export default App;