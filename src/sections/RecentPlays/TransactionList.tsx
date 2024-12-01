import React, { useState, useEffect, useRef } from 'react';

interface Transaction {
  transactionId: string;
  game: string;
  player: string;
  time: string;
  wager: string;
  multiplier: string;
  payout: string;
  token: string;
  tokenLogo: string;
}

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false); // State for mobile detection
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const tokenLogos: { [key: string]: string } = {
    'PUMP': 'https://pump.fun/_next/image?url=%2Flogo.png&w=32&q=75',
    'SOL': 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    'USDC': 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    'Wormhole': 'https://wormhole.com/token.png',
    'H8C': 'https://cdn0.iconfinder.com/data/icons/tokens/500/nim1058_10_gold_bonus_token-1024.png',
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Set as mobile if width is 640px or less
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check the initial window size

    const interval = setInterval(() => {
      setTransactions((prev) => [createRandomTransaction(), ...prev].slice(0, isMobile ? 5 : 15));
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [isMobile]);

  useEffect(() => {
    // Generate initial transactions based on device type
    const initialTransactionCount = isMobile ? 5 : 15;
    const initialTransactions = Array.from({ length: initialTransactionCount }, createRandomTransaction);
    setTransactions(initialTransactions);
  }, [isMobile]);

  const createRandomTransaction = (): Transaction => {
    const gameImages = [
      '/games/Dice_Guacamole_Full_Size-Photoroom.png',
      '/games/Flip_Guacamole_Full_Size-Photoroom.png',
      '/games/Plinko_Guacamole_Full_Size-Photoroom.png',
      '/games/Hilo_Guacamole_Full_Size-Photoroom.png',
      '/games/Mines_Guacamole_Full_Size-Photoroom.png',
      '/games/Roulette_Guacamole_Full_Size-Photoroom.png',
    ];

    const tokens = ['PUMP', 'SOL', 'USDC', 'Wormhole', 'H8C'];
    const token = tokens[Math.floor(Math.random() * tokens.length)];
    const tokenLogo = tokenLogos[token];

    const wagerAmount = getRandomWager(token);
    const isWin = Math.random() > 0.5;
    const multiplier = isWin ? (Math.random() > 0.5 ? 2 : 0.5) : 0;
    const payout = multiplier > 0 ? (parseFloat(wagerAmount) * multiplier).toFixed(2) : `-${wagerAmount}`;

    return {
      transactionId: Math.random().toString(36).substring(2, 15),
      game: gameImages[Math.floor(Math.random() * gameImages.length)],
      player: `0x${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
      time: new Date().toLocaleTimeString(),
      wager: `${wagerAmount} ${token}`,
      multiplier: multiplier > 0 ? `${multiplier}x` : '0x',
      payout: `${payout} ${token}`,
      token,
      tokenLogo,
    };
  };

  const getRandomWager = (token: string): string => {
    switch (token) {
      case 'PUMP':
        return (Math.random() * 2 + 1).toFixed(2);
      case 'SOL':
        return (Math.random() * 0.2 + 0.05).toFixed(2);
      case 'USDC':
        return (Math.random() * 0.8 + 0.2).toFixed(2);
      default:
        return (Math.random() * 2 + 1).toFixed(2);
    }
  };

  return (
    <div className="overflow-hidden max-h-80">
      {/* Header */}
      <div className="hidden sm:flex items-center mb-4 p-3 rounded-xl border border-[rgba(168,168,168,0.1)] bg-[#171919]">
        {!isMobile && ['Transaction', 'Game', 'Player', 'Time', 'Wager', 'Multiplier', 'Payout', 'Token'].map((header, index) => (
          <div key={index} className="flex-1 flex items-center justify-center text-[#EDE1CE] text-[14px] font-normal leading-[21px]">
            {header}
          </div>
        ))}
        {isMobile && ['Transaction', 'Wager', 'Multiplier', 'Payout'].map((header, index) => (
          <div key={index} className="flex-1 flex items-center justify-center text-[#EDE1CE] text-[14px] font-normal leading-[21px]">
            {header}
          </div>
        ))}
      </div>

      {/* Scrollable Transaction List */}
      <div
        ref={scrollContainerRef}
        className="overflow-y-auto max-h-64 transition-all duration-500 ease-out scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className={`flex items-center mb-4 p-3 rounded-xl border border-[rgba(168,168,168,0.1)] ${
              index % 2 === 0 ? 'bg-[#171919]' : 'bg-[#171919]/50'
            }`}
          >
            {(!isMobile || isMobile) && (
              <div className="flex-1 flex items-center justify-center text-[#EDE1CE] text-[14px] font-normal leading-[21px]">{transaction.transactionId}</div>
            )}
            {!isMobile && (
              <div className="flex-1 flex items-center justify-center text-[#EDE1CE] text-[14px] font-normal leading-[21px]">
                <img alt="game icon" className="w-10 h-10 rounded-full" src={transaction.game} />
              </div>
            )}
            {!isMobile && (
              <div className="flex-1 flex items-center justify-center text-[#EDE1CE] text-[14px] font-normal leading-[21px]">{transaction.player}</div>
            )}
            {!isMobile && (
              <div className="flex-1 flex items-center justify-center text-[#EDE1CE] text-[14px] font-normal leading-[21px]">{transaction.time}</div>
            )}

            {/* Wager Amount with Token Icon */}
            <div className="flex-1 flex items-center justify-center text-[#EDE1CE] text-[14px] font-normal leading-[21px]">
              {parseFloat(transaction.wager.split(' ')[0]).toFixed(2)} {/* Show only amount without token name */}
              <img src={transaction.tokenLogo} alt={`${transaction.token} logo`} className="w-5 h-5 inline ml-2" />
            </div>

            {/* Multiplier */}
            <div className="flex-1 flex items-center justify-center text-[#EDE1CE] text-[14px] font-normal leading-[21px]">{transaction.multiplier}</div>

            {/* Payout Amount with Token Icon */}
            <div
              className="flex-1 flex items-center justify-center text-[14px] font-normal leading-[21px]"
              style={{
                color: transaction.payout.startsWith('-') ? 'red' : 'green',
              }}
            >
              {parseFloat(transaction.payout.split(' ')[0]).toFixed(2)} {/* Show only amount without token name */}
              <img src={transaction.tokenLogo} alt={`${transaction.token} logo`} className="w-5 h-5 inline ml-2" />
            </div>

            {!isMobile && (
              <div className="flex-1 flex items-center justify-center text-[#EDE1CE] text-[14px] font-normal leading-[21px]">{transaction.token}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
