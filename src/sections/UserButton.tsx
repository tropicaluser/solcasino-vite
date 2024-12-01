import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { GambaUi } from 'gamba-react-ui-v2';
import { truncateString } from '../utils';

export function UserButton() {
  const walletModal = useWalletModal();
  const wallet = useWallet();
  const [showPopup, setShowPopup] = useState(false);

  const connect = () => {
    setShowPopup(true); // Show the popup
    setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds

    // Original connect logic preserved below:
    // if (wallet.wallet) {
    //   wallet.connect();
    // } else {
    //   walletModal.setVisible(true);
    // }
  };

  return (
    <>
      {showPopup && (
        <div style={popupStyles.container}>
          <div style={popupStyles.popup}>
            <h2 style={popupStyles.title}>⚠️ Out of Capacity</h2>
            <p style={popupStyles.message}>
              We are currently at full capacity. Please try again later. Thank you for your patience and understanding!
            </p>
          </div>
        </div>
      )}
      {wallet.connected ? (
        <div style={{ position: 'relative' }}>
          <GambaUi.Button
            onClick={() => alert('Show user modal or other actions')}
          >
            <div style={{ display: 'flex', gap: '.5em', alignItems: 'center' }}>
              <img src={wallet.wallet?.adapter.icon} height="20px" />
              {truncateString(wallet.publicKey?.toBase58(), 3)}
            </div>
          </GambaUi.Button>
        </div>
      ) : (
        <GambaUi.Button onClick={connect}>
          {wallet.connecting ? '[Connecting]' : '[Connect]'}
        </GambaUi.Button>
      )}
    </>
  );
}

// Styles for the popup
const popupStyles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#1b1f2d', // Background color provided
    color: '#ffffff',
    borderRadius: '20px', // Softer rounded edges
    border: '3px solid white', // White border for clean contrast
    padding: '30px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)', // Depth for elegance
    animation: 'fadeIn 0.5s ease-out', // Smooth fade-in animation
  },
  title: {
    fontSize: '1.8em',
    margin: '0 0 15px',
    color: '#ffcc00', // Accent color for the title
  },
  message: {
    fontSize: '1.2em',
    margin: 0,
    lineHeight: '1.6',
    fontWeight: '300',
  },
};

// Add fade-in animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`, styleSheet.cssRules.length);
