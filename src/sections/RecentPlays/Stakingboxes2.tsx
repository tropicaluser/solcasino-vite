import React, { useEffect, useState } from 'react';
import { TweenMax } from 'gsap';

// Helper function to get random win amount and token
const getRandomAmountAndToken = () => {
  const tokens = ['SOL', 'USDC', 'PUMP'];
  const amount = (Math.random() * 0.1).toFixed(3);
  const token = tokens[Math.floor(Math.random() * tokens.length)];
  return `${amount} ${token}`;
};

// Helper function to get random date
const getRandomDate = () => {
  const randomDate = new Date();
  return randomDate.toLocaleTimeString();
};

// Helper function to generate a random crypto transaction ID
const generateTransactionId = () => {
  return '0x' + Math.random().toString(36).substring(2, 8); // Random 6 char transaction id
};

const GameBox = ({ id }) => {
  const [transactionId, setTransactionId] = useState('');
  const [winAmountAndToken, setWinAmountAndToken] = useState('');
  const [transactionDate, setTransactionDate] = useState('');

  useEffect(() => {
    const randomShake = () => {
      const duration = Math.random() * 0.05 + 0.05;
      const distance = Math.random() * 25 + 15;
      const direction = Math.random() > 0.5 ? "+=" : "-=";

      const shakeLeft = Math.random() > 0.5;
      const shakeRight = !shakeLeft;

      if (shakeLeft || shakeRight) {
        TweenMax.to(`#${id}`, duration, { x: direction + distance, yoyo: true, repeat: 1 });
        const randomColor = ["#FF5733", "#33FF57", "#3357FF", "#F5D300"][Math.floor(Math.random() * 4)];
        document.getElementById(id).style.backgroundColor = randomColor;
        
        // Set transaction ID, win amount and token, and date
        setTransactionId(generateTransactionId());
        setWinAmountAndToken(getRandomAmountAndToken());
        setTransactionDate(getRandomDate());
      }
    };

    const interval = setInterval(randomShake, 200);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [id]);

  return (
    <div className="box" id={id} style={{
        backgroundColor: '#e0f7fa', 
        color: '#212121', 
        padding: '8px',       
        borderRadius: '3px', 
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',             
    }}>
      <div className="game-info">
        <div className="transaction-id">{transactionId} won {winAmountAndToken} Just Now</div>
      </div>
    </div>
  );
};

const ShakingBoxes2 = () => {
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
      <GameBox id="element2" />
    </div>
  );
};

export default ShakingBoxes2;
