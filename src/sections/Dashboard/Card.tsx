import React, { useEffect, useState } from 'react';
import './Card.css'; // Optional: Include additional CSS if needed

// Helper function to format numbers in the 100K style
const formatNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

const Card = () => {
  // Array of games and corresponding links (game name will be extracted dynamically from the image name)
  const gameLinks = {
    'Dice_Guacamole_Full_Size-Photoroom.png': '/dice',
    'Flip_Guacamole_Full_Size-Photoroom.png': '/flip',
    'Plinko_Guacamole_Full_Size-Photoroom.png': '/Plinko',
    'Hilo_Guacamole_Full_Size-Photoroom.png': '/hilo',
    'Mines_Guacamole_Full_Size-Photoroom.png': '/mines',
    'Roulette_Guacamole_Full_Size-Photoroom.png': '/roulette',
  };

  // Array of game images used for games
  const imageArray = [
    '/games/Dice_Guacamole_Full_Size-Photoroom.png',
    '/games/Flip_Guacamole_Full_Size-Photoroom.png',
    '/games/Plinko_Guacamole_Full_Size-Photoroom.png',
    '/games/Hilo_Guacamole_Full_Size-Photoroom.png',
    '/games/Mines_Guacamole_Full_Size-Photoroom.png',
    '/games/Roulette_Guacamole_Full_Size-Photoroom.png',
  ];

  // Default game data (initial values, these will be stored in localStorage)
  const initialGameData = [
    {
      name: 'Dice',
      image: '/games/Dice_Guacamole_Full_Size-Photoroom.png',
      link: '/dice',
      totalWinAmount: 300000,
      totalWager: 600000,
      players: 5200, // Start player count above 5000
    },
    {
      name: 'Flip',
      image: '/games/Flip_Guacamole_Full_Size-Photoroom.png',
      link: '/flip',
      totalWinAmount: 500000,
      totalWager: 1000000,
      players: 5500, // Start player count above 5000
    },
    {
      name: 'Plinko',
      image: '/games/Plinko_Guacamole_Full_Size-Photoroom.png',
      link: '/Plinko',
      totalWinAmount: 100000,
      totalWager: 200000,
      players: 6000, // Start player count above 5000
    },
    {
      name: 'Roulette',
      image: '/games/Roulette_Guacamole_Full_Size-Photoroom.png',
      link: '/roulette',
      totalWinAmount: 400000,
      totalWager: 800000,
      players: 7000, // Start player count above 5000
    },
    {
      name: 'Mines',
      image: '/games/Mines_Guacamole_Full_Size-Photoroom.png',
      link: '/mines',
      totalWinAmount: 250000,
      totalWager: 500000,
      players: 6200, // Start player count above 5000
    },
  ];

  // State to keep track of the current game and its data
  const [gameData, setGameData] = useState(() => {
    // Load data from localStorage or use the initial values
    const storedData = JSON.parse(localStorage.getItem('gameData'));
    return storedData || initialGameData;
  });
  
  const [currentGame, setCurrentGame] = useState(gameData[0]);

  // Function to update localStorage with the latest game data
  const updateLocalStorage = (newGameData) => {
    localStorage.setItem('gameData', JSON.stringify(newGameData));
  };

  // Dynamically inject external CSS into the head tag
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://pump.fun/_next/static/css/d73a77dd9d4fbf54.css';
    document.head.appendChild(link);

    // Set interval to switch the game every 10 seconds (you can change this to your preferred interval)
    const intervalGameSwitch = setInterval(() => {
      setCurrentGame((prevGame) => {
        const nextIndex = (gameData.indexOf(prevGame) + 1) % gameData.length;
        return gameData[nextIndex];
      });
    }, 10000); // Switch game every 10 seconds

    // Set interval to increase totalWinAmount, totalWager, and players every 2 minutes (120,000 ms) by 5%
    const intervalIncreaseValues = setInterval(() => {
      setGameData((prevData) => {
        const updatedData = prevData.map((game) => ({
          ...game,
          totalWinAmount: Math.round(game.totalWinAmount * 1.05), // Increase total win by 5%
          totalWager: Math.round(game.totalWager * 1.05), // Increase total wager by 5%
          players: Math.round(game.players * 1.05), // Increase players by 5%
        }));

        // Update localStorage with the new values
        updateLocalStorage(updatedData);
        return updatedData;
      });
    }, 120000); // Increase values every 2 minutes

    return () => {
      clearInterval(intervalGameSwitch);
      clearInterval(intervalIncreaseValues);
      document.head.removeChild(link);
    };
  }, [gameData]);

  return (
    <div className="flex flex-col items-center w-full mt-4">
      <a
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-10 px-4 py-2 mb-4 text-2xl text-slate-50 hover:font-bold hover:bg-transparent hover:text-slate-50"
        href="https://pump.fun/coin/GSRUfdBHyCuci11EneamfL5E5ZaUgS92Q669mqL7pump"
      >
        [Buy $PCS Token]
      </a>
      <div className="text-white max-w-[800px] grid gap-2">
        <img
          alt="king of the hill"
          loading="lazy"
          width="166"
          height="32"
          decoding="async"
          className="h-8 justify-self-center"
          srcSet="https://pump.fun/_next/image?url=%2Fking-of-the-hill.png&w=256&q=75 1x, https://pump.fun/_next/image?url=%2Fking-of-the-hill.png&w=384&q=75 2x"
          src="https://pump.fun/_next/image?url=%2Fking-of-the-hill.png&w=384&q=75"
          style={{ color: 'transparent', marginLeft: '2.3rem'}}
        />
        <a href={currentGame.link}>
          <div className="p-2 flex border hover:border-white gap-2 w-full max-h-[300px] overflow-hidden border-transparent">
            <div className="min-w-20">
              <img
                alt={currentGame.name}
                loading="lazy"
                width="200"
                height="200"
                decoding="async"
                className="mr-4 w-20 h-auto"
                src={currentGame.image} // This is the dynamic game image
                style={{ color: 'transparent', display: 'block' }}
              />
            </div>
            <div className="gap-1 grid h-fit">
              <div className="text-xs text-blue-200 flex items-center gap-2">
                <span>Game name: {currentGame.name}</span>
              </div>
              <div className="text-xs text-green-500 flex gap-1">
                Total win: ${formatNumber(currentGame.totalWinAmount)} {/* Use the helper function */}
              </div>
              <div className="text-xs text-yellow-400 flex gap-1">
                Total wager: ${formatNumber(currentGame.totalWager)} {/* Use the helper function */}
              </div>
              <p className="text-xs flex items-center gap-2">Played by {currentGame.players.toLocaleString()} players</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Card;
