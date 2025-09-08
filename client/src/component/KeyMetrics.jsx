const KeyMetrics = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 text-center shadow-lg"
        >
          <p className="text-xs sm:text-sm text-gray-300">{metric.label}</p>
          <p className="text-lg sm:text-2xl font-bold">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KeyMetrics;
