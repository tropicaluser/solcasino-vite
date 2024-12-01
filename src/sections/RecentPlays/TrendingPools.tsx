import React, { useState, useEffect } from 'react';

// Define a type for the pool object
interface Pool {
  id: string;
  name: string;
  liquidity: number;
  volume24h: number;
  change24h: number;
  logo: string;
}

function TrendingPools() {
  const [pools, setPools] = useState<Pool[]>([]); // State to hold pool data

  // Function to generate dynamic background color for each box
  const getDynamicColor = () => {
    const colors = [
      '#3E4D8E', '#3498db', '#FF7F50', '#FF6347', '#28B463', // Some base colors
      '#D35400', '#8E44AD', '#F39C12', '#2980B9', '#2ECC71',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(145deg, ${randomColor}, ${randomColor}80)`; // Applying gradient with a slight brightness
  };

  useEffect(() => {
    async function fetchTrendingPools() {
      try {
        // Using CoinGecko API to fetch trending data
        const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
        const data = await response.json();

        // Map data to your Pool type
        const trendingPools: Pool[] = data.coins.slice(0, 15).map((coin: any) => ({
          id: coin.item.id,
          name: coin.item.name,
          liquidity: coin.item.market_cap_rank,  // Example field: Market rank as liquidity
          volume24h: coin.item.market_cap_rank * 1000, // Example field for volume24h
          change24h: coin.item.market_cap_change_percentage_24h || 0,  // 24h market cap change
          logo: coin.item.small,
        }));

        setPools(trendingPools);
      } catch (error) {
        console.error('Error fetching trending pools:', error);
      }
    }

    fetchTrendingPools();
    const interval = setInterval(fetchTrendingPools, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[rgba(168,168,168,0.10)] bg-[#171919] p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-1">
          <img
            alt="Trending Pools"
            loading="lazy"
            width="36"
            height="30"
            decoding="async"
            className="w-[20px]"
            style={{ color: 'transparent' }}
            src="https://www.guacamole.gg/images/Guacamole_Avocado_Icon_New.png"
          />
          <h2 className="text-[#ADD951] text-[16px] font-bold leading-[96.875%] tracking-[-0.48px]">Trending Pools</h2>
        </div>
        <a className="text-[#ADD951] hover:underline" href="/pools">View more</a>
      </div>

      <div className="overflow-x-auto" style={{ scrollbarColor: '#50d593 transparent' }}>
        <div className="flex gap-4">
          {pools.map((pool) => {
            const backgroundColor = getDynamicColor(); // Dynamic background for each box

            // Conditional color for 24h change (green for positive, red for negative)
            const priceChangeColor = pool.change24h > 0 ? 'text-[#29D300]' : 'text-[#F44336]';

            return (
              <div
                key={pool.id}
                className="flex-shrink-0 flex flex-col items-start gap-2 rounded-[10px] p-[3px] border border-[rgba(168,168,168,0.10)] overflow-hidden"
                style={{
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add some shadow for better visual appearance
                  minWidth: '200px', // Dynamic box size, width will be flexible based on content
                  minHeight: '180px', // Adjust minimum height to avoid being too tall or too low
                }}
              >
                {/* Logo and token name side by side */}
                <div className="w-full h-[64px] flex items-center p-2 rounded-[8px]" style={{ background: getDynamicColor() }}>
                  <img
                    alt={pool.name}
                    loading="lazy"
                    width="40"
                    height="40"
                    decoding="async"
                    className="rounded-full w-[40px] h-[40px]"
                    src={pool.logo}
                    style={{ color: 'transparent' }}
                  />
                  <span className="text-white font-urbanist text-[16px] font-bold ml-3">
                    {pool.name}
                  </span>
                </div>

                {/* Liquidity and other data */}
                <div className="mt-2 pl-[10px] pr-[10px] text-[#ADD951] text-[12px]">
                  <span>Rank: #{pool.liquidity}</span> {/* Change Liquidity to Rank */}
                </div>
                <div className="mt-1 pl-[10px] pr-[10px] text-[12px]">
                  {pool.change24h !== 0 && (
                    <span className={`${priceChangeColor}`}>
                      {pool.change24h > 0 ? `+${pool.change24h.toFixed(2)}%` : `${pool.change24h.toFixed(2)}%`}
                    </span>
                  )}
                </div>
                <div className="mt-1 pl-[10px] pr-[10px] text-[#ADD951] text-[12px]">
                  <span>24h Volume: ${pool.volume24h.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TrendingPools;
