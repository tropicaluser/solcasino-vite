import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';

// Create a Context
const ChartContext = createContext();

// Context Provider
export const ChartProvider = ({ children }) => {
  const [multiplier, setMultiplier] = useState(0.0);
  const [isCrashed, setIsCrashed] = useState(false);
  const [crashPoint, setCrashPoint] = useState(null);
  const [chartData, setChartData] = useState([]);
  const multiplierRef = useRef(0.0); // Keep track of the current multiplier
  const intervalRef = useRef(null);

  const generateCrashPoint = () =>
    parseFloat((Math.random() * (2.0 - 0.5) + 0.5).toFixed(1));

  useEffect(() => {
    if (!isCrashed) {
      if (!crashPoint) setCrashPoint(generateCrashPoint());

      intervalRef.current = setInterval(() => {
        multiplierRef.current += 0.1; // Update the multiplier ref
        const newMultiplier = parseFloat(multiplierRef.current.toFixed(1));
        const timestamp = new Date().toLocaleTimeString();

        // Add a new data point
        setChartData((prevData) => [
          ...prevData,
          { time: timestamp, multiplier: newMultiplier },
        ]);

        setMultiplier(newMultiplier); // Update state for UI

        // Check if crash happens
        if (newMultiplier >= crashPoint) {
          setIsCrashed(true);
          clearInterval(intervalRef.current); // Clear interval
        }
      }, 500);
    }

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [isCrashed, crashPoint]);

  const resetGame = () => {
    clearInterval(intervalRef.current); // Clear any running intervals
    setMultiplier(0.0);
    setCrashPoint(null);
    setChartData([]);
    setIsCrashed(false);
    multiplierRef.current = 0.0; // Reset the multiplier ref
  };

  return (
    <ChartContext.Provider
      value={{
        multiplier,
        isCrashed,
        crashPoint,
        chartData,
        resetGame,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

// Custom hook for consuming context
export const useChart = () => useContext(ChartContext);
