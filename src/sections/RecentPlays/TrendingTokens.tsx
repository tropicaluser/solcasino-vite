import React, { useState, useEffect } from 'react';

// Define a type for the token object
interface Token {
  id: string;
  symbol: string;
  name: string;
  large: string;
  currentPrice: number;
  priceChange24h: number;
}

function TrendingTokens() {
  const [tokens, setTokens] = useState<Token[]>([]); // Use the Token type for the state

  // Function to generate a random gradient color
  const getRandomGradientColor = () => {
    const colors = [
      '#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c',
      '#FF5733', '#900C3F', '#C70039', '#8E44AD', '#F39C12'
    ];
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(145deg, ${color1}, ${color2})`; // Random gradient
  };

  useEffect(() => {
    async function fetchTrendingTokens() {
      try {
        const trendingResponse = await fetch('https://api.coingecko.com/api/v3/search/trending');
        const trendingData = await trendingResponse.json();

        // Fetch the price and 24-hour % change for each trending coin
        const coinIds = trendingData.coins.slice(0, 15).map(coin => coin.item.id);
        const marketsResponse = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}`);
        const marketsData = await marketsResponse.json();

        // Combine both data sources (trending data and market data)
        const updatedTokens = trendingData.coins.slice(0, 15).map(coin => {
          const marketData = marketsData.find(market => market.id === coin.item.id);
          return {
            ...coin.item,
            currentPrice: marketData ? marketData.current_price : 0,
            priceChange24h: marketData ? marketData.price_change_percentage_24h : 0,
          };
        });

        setTokens(updatedTokens);
      } catch (error) {
        console.error('Error fetching trending tokens:', error);
      }
    }

    fetchTrendingTokens();
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[rgba(168,168,168,0.10)] bg-[#171919] p-4" style={{scrollbarColor: '#50d593 transparent'}}>
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-1">
          <img alt="" loading="lazy" width="36" height="30" decoding="async" className="w-[20px]" src="https://www.guacamole.gg/images/v3/Flaming_Onion_Guacamole.svg" style={{ color: 'transparent' }} />
          <h2 className="text-[#ADD951] text-[16px] font-bold leading-[96.875%] tracking-[-0.48px]">Trending Tokens</h2>
        </div>
        <a className="text-[#ADD951] hover:underline" href="https://pump.fun/board">Trade Now</a>
      </div>
      <div className="overflow-x-auto scrollbar-black">
        <div className="flex min-w-max gap-1 pb-4" id="trending-tokens">
          {tokens.map((coin) => {
            // Apply random gradient color to each token box section
            const randomGradient = getRandomGradientColor();

            // Conditional color for price change (green for positive, red for negative)
            const priceChangeColor = coin.priceChange24h > 0 ? 'text-[#29D300]' : 'text-[#F44336]';
            const priceChangeSign = coin.priceChange24h > 0 ? '+' : ''; // Add '+' for positive values

            return (
              <div
                key={coin.id}
                className="flex-shrink-0 flex flex-col items-center gap-1 w-[147px] h-[160px] border border-[rgba(168,168,168,0.10)] mr-4 overflow-hidden p-[3px] transition-all duration-500"
                style={{
                  backgroundColor: '#1a1f2d', // Apply fixed background color to the main container
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adding box shadow for better visibility
                  borderRadius: '8px', // Ensure rounded corners
                }}
              >
                {/* Token image and symbol with random gradient background */}
                <div className="w-full p-2 h-[64px] flex gap-2 rounded-[8px]" style={{ background: `${randomGradient} !important`}}>
                  <img alt={coin.name} loading="lazy" width="40" height="40" decoding="async" className="rounded-full w-[40px] h-[40px]" src={coin.large} style={{ color: 'transparent' }} />
                  <div className="flex flex-col">
                    <span className="text-[#EDE1CE] font-urbanist text-[12px] font-bold leading-tight tracking-[-0.32px]">{coin.symbol.toUpperCase()}</span>
                  </div>
                </div>
                {/* Token price and change with fixed background */}
                <div className="flex flex-col items-start w-full mt-2 pl-[15px]" style={{ backgroundColor: 'transparent' }}>
                  <span className="text-[#EDE1CE] font-urbanist text-[14px] font-bold leading-tight tracking-[-0.4px]">${coin.currentPrice.toFixed(7)}</span>
                  <span className={`font-urbanist text-[12px] font-bold leading-tight tracking-[-0.24px] ${priceChangeColor}`}>
                    {priceChangeSign}{coin.priceChange24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TrendingTokens;
