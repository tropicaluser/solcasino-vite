import React, { useEffect, useState } from 'react';
import { TweenMax } from 'gsap';

// Helper function to get random win amount and token (ensure > 1 SOL)
const getRandomAmountAndToken = () => {
  const tokens = ['SOL', 'USDC', 'PUMP'];
  const amount = (Math.random() * 9 + 1).toFixed(2); // Always > 1 SOL
  const token = 'SOL'; // Force SOL token
  return `${amount} ${token}`;
};

// Helper function to simulate a fixed date that is always > 1 hour ago
const getFixedDate = () => {
  const randomDate = new Date();
  randomDate.setHours(randomDate.getHours() - (Math.random() * 5 + 2)); // Set 2 to 7 hours ago
  return randomDate;
};

// Helper function to generate a random crypto wallet address (only first 6 characters)
const generateWalletAddress = () => {
  const randomAddress = '0x' + Math.random().toString(36).substring(2, 8).toUpperCase(); // Random 6 char address
  return randomAddress;
};

const GameBox = ({ id }) => {
  const [transactionId, setTransactionId] = useState('');
  const [winAmountAndToken, setWinAmountAndToken] = useState('');
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [timeAgo, setTimeAgo] = useState('');
  const [walletAddress, setWalletAddress] = useState(generateWalletAddress()); // Initial random wallet address
  const [backgroundColor, setBackgroundColor] = useState('#e0f7fa'); // Initial background color

  useEffect(() => {
    const randomShake = () => {
      const shakeType = Math.floor(Math.random() * 3); // 0 = no shake, 1 = fast shake, 2 = slow shake
      let duration, distance, direction;

      if (shakeType === 0) {
        // No shake
        return;
      } else if (shakeType === 1) {
        // Fast shake
        duration = Math.random() * 0.05 + 0.05;
        distance = Math.random() * 20 + 10;
      } else {
        // Slow shake
        duration = Math.random() * 0.2 + 0.15;
        distance = Math.random() * 40 + 20;
      }

      direction = Math.random() > 0.5 ? "+=" : "-=";

      if (shakeType !== 0) {
        TweenMax.to(`#${id}`, duration, { x: direction + distance, yoyo: true, repeat: 1 });
        const randomColor = ["#FF5733", "#33FF57", "#3357FF", "#F5D300"][Math.floor(Math.random() * 4)];
        document.getElementById(id).style.backgroundColor = randomColor;

        // Only update transaction info when there is a shake
        setTransactionId(generateTransactionId());
        setWinAmountAndToken(getRandomAmountAndToken());
        setTransactionDate(getFixedDate());
      }
    };

    const interval = setInterval(randomShake, Math.random() * 500 + 500); // Shake interval between 500ms to 1000ms

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [id]);

  useEffect(() => {
    // Function to calculate time ago
    const calculateTimeAgo = () => {
      const now = new Date();
      const diff = now - transactionDate; // Time difference in milliseconds

      const hours = Math.floor(diff / 3600000);

      // Always show hours as greater than 1
      setTimeAgo(`${hours} hour${hours > 2 ? 's' : ''} ago`);
    };

    
    // Recalculate time every minute
    const timeInterval = setInterval(calculateTimeAgo, 60000);

    // Calculate initially
    calculateTimeAgo();

    return () => clearInterval(timeInterval);
  }, [transactionDate]);

  useEffect(() => {
    const changeTextAndColor = () => {
      // Update the transaction info every 30 seconds
      setWalletAddress(generateWalletAddress()); // Set new wallet address
      setTransactionId(generateTransactionId()); // Set new transaction ID
      setWinAmountAndToken(getRandomAmountAndToken()); // Set new win amount
      setBackgroundColor(["#FF5733", "#33FF57", "#3357FF", "#F5D300"][Math.floor(Math.random() * 4)]); // Random background color
    };

    const interval = setInterval(changeTextAndColor, 30000); // Change every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="box" id={id} style={{
      backgroundColor: backgroundColor,
      color: '#212121',
      padding: '8px',
      borderRadius: '3px',
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
    }}>
      <div className="game-info">
        <div className="transaction-id">{walletAddress} won jackpot {winAmountAndToken} {timeAgo}</div>
      </div>
    </div>
  );
};

const ShakingBoxes = () => {
  useEffect(() => {
    // Dynamically load the scripts for jQuery and GSAP
    const scriptJQuery = document.createElement('script');
    scriptJQuery.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js';
    scriptJQuery.async = true;
    document.body.appendChild(scriptJQuery);

    const scriptGSAP = document.createElement('script');
    scriptGSAP.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.11.5/TweenMax.min.js';
    scriptGSAP.async = true;
    document.body.appendChild(scriptGSAP);

    return () => {
      // Cleanup the script tags when the component unmounts
      document.body.removeChild(scriptJQuery);
      document.body.removeChild(scriptGSAP);
    };
  }, []);

  return (
    <div className="shaking-container">
      <GameBox id="element1" />
    </div>
  );
};

export default ShakingBoxes;
