import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';

// Define the types for the context
interface ChartContextType {
  multiplier: number;
  isCrashed: boolean;
  crashPoint: number | null;
  chartData: { time: string; multiplier: number }[];
  resetGame: () => void;
}

// Create a Context with default value as undefined
const ChartContext = createContext<ChartContextType | undefined>(undefined);

// Context Provider Props
interface ChartProviderProps {
  children: ReactNode;
}

// Context Provider
export const ChartProvider: React.FC<ChartProviderProps> = ({ children }) => {
  const [multiplier, setMultiplier] = useState<number>(0.0);
  const [isCrashed, setIsCrashed] = useState<boolean>(false);
  const [crashPoint, setCrashPoint] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ time: string; multiplier: number }[]>([]);
  const multiplierRef = useRef<number>(0.0); // Keep track of the current multiplier
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateCrashPoint = (): number =>
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
          if (intervalRef.current) clearInterval(intervalRef.current); // Clear interval
        }
      }, 500);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Cleanup on unmount
    };
  }, [isCrashed, crashPoint]);

  const resetGame = () => {
    if (intervalRef.current) clearInterval(intervalRef.current); // Clear any running intervals
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
export const useChart = (): ChartContextType => {
  const context = useContext(ChartContext);
  if (context === undefined) {
    throw new Error('useChart must be used within a ChartProvider');
  }
  return context;
};
