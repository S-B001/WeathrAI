import moment from 'moment';

const WeatherHeader = ({ currentTime, temp, location }) => {
  return (
    <div className="w-full lg:w-[70%] p-6 lg:p-8 flex flex-col justify-between text-white relative">

      {/* Top-right Time */}
      <div className="absolute top-4 right-4 text-xl lg:text-3xl font-bold">
        {currentTime}
      </div>

      {/* Middle empty space */}
      <div className="flex-1"></div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 absolute bottom-16 sm:bottom-32 left-1/2 sm:left-40 transform -translate-x-1/2 sm:translate-x-0">
        
        {/* Temperature */}
        <div className="text-5xl sm:text-7xl font-extrabold leading-none">
          {Math.round(temp)}°C
        </div>

        {/* Vertical line */}
        <div className="hidden sm:block h-16 w-[2px] bg-white/60"></div>

        {/* Location and Date */}
        <div className="text-center sm:text-left">
          <div className="text-2xl sm:text-4xl font-semibold">{location}</div>
          <div className="text-sm sm:text-xl text-gray-200">
            {moment().format('dddd, MMMM Do YYYY')}
          </div>
        </div>

      </div>

    </div>
  );
};

export default WeatherHeader;