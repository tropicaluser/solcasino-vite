import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import styled from 'styled-components';
import { useUserStore } from '../../hooks/useUserStore';

const Buttons = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%; /* Ensure it doesn’t exceed the viewport width */

  @media (min-width: 800px) {
    height: 100%;
  }

  @media (max-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding-top: 0 !important;
  }

  & > button {
    border: none;
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    background: #ffffffdf;
    transition: background-color 0.2s ease;
    color: black;
    cursor: pointer;
    &:hover {
      background: white;
    }
  }
`;

const Welcome = styled.div`
  overflow-x: hidden; /* Prevent horizontal scrolling */
  width: 100%; /* Ensure it doesn’t exceed the viewport width */
  @keyframes welcome-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes backgroundGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  background: linear-gradient(-45deg, #ffb07c, #ff3e88, #2969ff, #ef3cff, #ff3c87);
  background-size: 300% 300%;
  animation: welcome-fade-in 0.5s ease, backgroundGradient 30s ease infinite;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  filter: drop-shadow(0 4px 3px rgba(0,0,0,0.07)) drop-shadow(0 2px 2px rgba(0,0,0,0.06));

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 0;
    & > div {
      padding: 40px;
    }
  }
`;

export function WelcomeBanner() {
  const wallet = useWallet();
  const walletModal = useWalletModal();
  const store = useUserStore();

  const copyInvite = () => {
    store.set({ userModal: true });
    if (!wallet.connected) {
      walletModal.setVisible(true);
    }
  };

  const getRandomSol = () => (Math.random() * 0.1).toFixed(3); // Generate random SOL values between 0 and 0.1
  
  // Define image names and their corresponding game paths
  const gameLinks: { [key: string]: string } = {
    'Dice_Guacamole_Full_Size-Photoroom.png': '/dice',
    'Flip_Guacamole_Full_Size-Photoroom.png': '/flip',
    'Plinko_Guacamole_Full_Size-Photoroom.png': '/plinko',
    'Hilo_Guacamole_Full_Size-Photoroom.png': '/hilo',
    'Mines_Guacamole_Full_Size-Photoroom.png': '/mines',
    'Roulette_Guacamole_Full_Size-Photoroom.png': '/roulette',
  };

  // Array of images used for games
  const imageArray = [
    '/games/Dice_Guacamole_Full_Size-Photoroom.png',
    '/games/Flip_Guacamole_Full_Size-Photoroom.png',
    '/games/Plinko_Guacamole_Full_Size-Photoroom.png',
    '/games/Hilo_Guacamole_Full_Size-Photoroom.png',
    '/games/Mines_Guacamole_Full_Size-Photoroom.png',
    '/games/Roulette_Guacamole_Full_Size-Photoroom.png',
  ];

  const getRandomImage = () => {
    const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];
    const imageName = randomImage.split('/').pop(); // Extract image name from the path
    const gameLink = gameLinks[imageName || '']; // Get the dynamic link from the gameLinks mapping
    return { image: randomImage, link: gameLink };
  };
  
  return (
    <div className="flex min-h-[150px] flex-col gap-4 px-6 py-6 rounded-xl border border-[rgba(168,168,168,0.1)] bg-[#171919] shadow-lg overflow-hidden relative">
      {/* Badge for Live Games */}
      <div className="bg-[#ADD951] rounded-xl absolute inline-flex mt-3 px-4 py-1 items-center z-10 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M6 10.9998C7.32603 10.9998 8.59775 10.473 9.53539 9.53538C10.473 8.59773 10.9998 7.32601 10.9998 5.99998C10.9998 4.67395 10.473 3.40224 9.53539 2.46459C8.59775 1.52695 7.32603 1.00018 6 1.00018C4.67397 1.00018 3.40225 1.52695 2.46461 2.46459C1.52696 3.40224 1.0002 4.67395 1.0002 5.99998C1.0002 7.32601 1.52696 8.59773 2.46461 9.53538C3.40225 10.473 4.67397 10.9998 6 10.9998ZM6 7.99978C6.26266 7.99978 6.52274 7.94805 6.7654 7.84753C7.00807 7.74702 7.22856 7.59969 7.41428 7.41397C7.60001 7.22824 7.74734 7.00775 7.84785 6.76509C7.94836 6.52243 8.0001 6.26234 8.0001 5.99968C8.0001 5.73703 7.94836 5.47694 7.84785 5.23428C7.74734 4.99161 7.60001 4.77113 7.41428 4.5854C7.22856 4.39967 7.00807 4.25235 6.7654 4.15183C6.52274 4.05132 6.26266 3.99958 6 3.99958C5.46954 3.99958 4.96081 4.21031 4.58571 4.5854C4.21062 4.96049 3.9999 5.46922 3.9999 5.99968C3.9999 6.53014 4.21062 7.03888 4.58571 7.41397C4.96081 7.78906 5.46954 7.99978 6 7.99978Z" fill="black"></path>
        </svg>
        <span className="text-black font-bold text-xs ml-2">LIVE WINS</span>
      </div>

      {/* Game Cards Container */}
      <div className="flex justify-between gap-5 overflow-y-auto max-h-[300px]">
        {/* Sample Game Card with Randomized Data */}
        {[...Array(8)].map((_, index) => {
          const { image, link } = getRandomImage(); // Get random image and corresponding link
          return (
            <div key={index} className="flex flex-col items-center justify-between py-4 flex-shrink-0">
              <a href={link}>
                <img alt="Game" loading="lazy" className="w-[80px] h-[80px] rounded-lg mb-4" src={image} />
              </a>
              <span className="text-sm text-[#EDE1CE] mb-2">8ZYy...{Math.floor(1000 + Math.random() * 9000)}</span>
              <span className="text-xs text-[#F3632F]">{getRandomSol()} SOL</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
