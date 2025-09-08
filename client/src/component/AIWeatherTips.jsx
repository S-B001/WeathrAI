const AIWeatherTips = ({ tips }) => {
  return (
    <div>
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        AI Weather Tips
      </h2>
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center shadow-lg">
        {tips && tips.length > 0 ? (
          <ul className="space-y-2 text-sm text-start">
            {tips.map((tip, index) => (
              <li key={index} className="text-gray-200 text-md">
                {tip}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm">Loading AI tips...</p>
        )}
      </div>
    </div>
  );
};

export default AIWeatherTips;
