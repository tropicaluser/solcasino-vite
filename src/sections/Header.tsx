import { GambaUi, TokenValue, useCurrentPool, useGambaPlatformContext, useUserBalance } from 'gamba-react-ui-v2'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Modal } from '../components/Modal'
import { PLATFORM_JACKPOT_FEE } from '../constants'
import TokenSelect from './TokenSelect'
import { UserButton } from './UserButton'
import ShakingBoxes from './RecentPlays/ShakingBoxes'
import ShakingBoxes2 from './RecentPlays/Stakingboxes2'

// Media query for mobile (adjust the max-width as needed)
const mobileQuery = '@media (max-width: 768px)';

const Bonus = styled.button`
  all: unset;
  cursor: pointer;
  color: #003c00;
  border-radius: 10px;
  background: #03ffa4;
  padding: 2px 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color .2s;
  &:hover {
    background: white;
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background: rgba(33, 34, 51, 0.9);
  position: fixed;
  background: #000000CC;
  backdrop-filter: blur(20px);
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
`

const Logo = styled.a`
  height: 35px;
  margin: 0 10px;
  display: flex;
  align-items: center;

  & > img {
    height: 100%;
    max-height: 35px; // Ensure logo scales to 35px height
    width: auto; // Maintain aspect ratio of logo
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  ${mobileQuery} {
    display: none;  // Hide on mobile
  }
`;

const MobileSocialLinks = styled.div`
  display: none;

  ${mobileQuery} {
    display: flex;
    gap: 15px;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
    }
  }
`;

export default function Header() {
  const pool = useCurrentPool()
  const context = useGambaPlatformContext()
  const balance = useUserBalance()
  const [bonusHelp, setBonusHelp] = React.useState(false)
  const [jackpotHelp, setJackpotHelp] = React.useState(false)

  return (
    <>
      {bonusHelp && (
        <Modal onClose={() => setBonusHelp(false)}>
          <h1>Bonus ✨</h1>
          <p>
            You have <b><TokenValue amount={balance.bonusBalance} /></b> worth of free plays. This bonus will be applied automatically when you play.
          </p>
          <p>
            Note that a fee is still needed from your wallet for each play.
          </p>
        </Modal>
      )}
      {jackpotHelp && (
        <Modal onClose={() => setJackpotHelp(false)}>
          <h1>Jackpot 💰</h1>
          <p style={{ fontWeight: 'bold' }}>
            There{'\''}s <TokenValue amount={pool.jackpotBalance} /> in the Jackpot.
          </p>
          <p>
            The Jackpot is a prize pool that grows with every bet made. As the Jackpot grows, so does your chance of winning. Once a winner is selected, the value of the Jackpot resets and grows from there until a new winner is selected.
          </p>
          <p>
            You will be paying a maximum of {(PLATFORM_JACKPOT_FEE * 100).toLocaleString(undefined, { maximumFractionDigits: 4 })}% for each wager for a chance to win.
          </p>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {context.defaultJackpotFee === 0 ? 'DISABLED' : 'ENABLED'}
            <GambaUi.Switch
              checked={context.defaultJackpotFee > 0}
              onChange={(checked) => context.setDefaultJackpotFee(checked ? PLATFORM_JACKPOT_FEE : 0)}
            />
          </label>
        </Modal>
      )}
      <StyledHeader>
        <div style={{ display: '', gap: '20px', alignItems: 'center' }}>
          <header className="sticky top-5 z-40 w-[calc(100%-30px)] mx-auto rounded-xl bg-[#171919] h-[72px] border max-w-[1379px] mb-4">
            <div className="w-full h-full px-3">
              <div className="flex items-center justify-between w-full h-full">
                <a className="flex items-center gap-2" href="/">
                  <div className="hidden sm:block">
                    {/* Logo displayed in both mobile and desktop */}
                    <Logo href="/">
                      <img src="https://pump.fun/_next/image?url=%2Flogo.png&w=32&q=75" alt="PUMPFUN CASINO Logo" />
                    </Logo>
                  </div>
                  <a href="https://x.com/pumpdotfun" target="_blank" rel="noopener noreferrer">
                    <img src="https://pump.fun/_next/image?url=%2Fx-logo.png&w=16&q=75" alt="Twitter" />
                  </a>
                  <a href="https://t.me/launchonpump" target="_blank" rel="noopener noreferrer">
                    <img src="https://pump.fun/_next/image?url=%2Ftelegram-logo.png&w=16&q=75" alt="Telegram" />
                  </a>
                </a>
                <div className="box flex items-center h-full space-x-4 sm:space-x-6 sm:justify-normal justify-start">
                  {/* Twitter and Telegram logos for mobile */}
                  <MobileSocialLinks>
                    <a href="/" target="/" rel="">
                      <img src="/games/home-4-24.ico" alt="PUMPFUN CASINO Logo" />
                    </a>
                    <UserButton />
                  </MobileSocialLinks>

                  {/* Show ShakingBoxes2 and ShakingBoxes for larger screens */}
                  <SocialLinks>
                    <ShakingBoxes2 />
                    <ShakingBoxes />
                  </SocialLinks>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                  <TokenSelect />
                  <button>
                    <span className="hidden sm:inline"><UserButton /></span>
                  </button>
                </div>
              </div>
            </div>
          </header>
        </div>
      </StyledHeader>
    </>
  )
}
