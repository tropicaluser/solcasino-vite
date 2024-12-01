import React, { useState, useEffect } from 'react';
import TrendingTokens from './sections/RecentPlays/TrendingTokens'; // adjust the path if necessary
import TrendingPools from './sections/RecentPlays/TrendingPools'; // adjust the path if necessary
import TransactionList from './sections/RecentPlays/TransactionList'; // adjust the path if necessary
import Footer from './sections/RecentPlays/Footer'; // adjust the path if necessary
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { GambaUi } from 'gamba-react-ui-v2';
import { useTransactionError } from 'gamba-react-v2';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Modal } from './components/Modal';
import { TOS_HTML } from './constants';
import { useToast } from './hooks/useToast';
import { useUserStore } from './hooks/useUserStore';
import Dashboard from './sections/Dashboard/Dashboard';
import Game from './sections/Game/Game';
import Header from './sections/Header';
//import RecentPlays from './sections/RecentPlays/RecentPlays';
import Toasts from './sections/Toasts';
import { MainWrapper, TosInner, TosWrapper } from './styles';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ErrorHandler() {
  const walletModal = useWalletModal();
  const toast = useToast();
  const [error, setError] = useState(null);

  useTransactionError((error) => {
    if (error.message === 'NOT_CONNECTED') {
      walletModal.setVisible(true);
      return;
    }
    toast({
      title: '❌ Transaction error',
      description: error.error?.errorMessage ?? error.message,
    });
  });

  return (
    <>
      {error && (
        <Modal onClose={() => setError(null)}>
          <h1>Error occurred</h1>
          <p>{error.message}</p>
        </Modal>
      )}
    </>
  );
}

export default function App() {
  const newcomer = useUserStore((state) => state.newcomer);
  const set = useUserStore((state) => state.set);

  return (
    <>
      {newcomer && (
        <Modal>
          <h1>Welcome</h1>
          <TosWrapper>
            <TosInner dangerouslySetInnerHTML={{ __html: TOS_HTML }} />
          </TosWrapper>
          <p>By playing on our platform, you confirm your compliance.</p>
          <GambaUi.Button main onClick={() => set({ newcomer: false })}>
            [I'm ready to Play]
          </GambaUi.Button>
        </Modal>
      )}
      <ScrollToTop />
      <ErrorHandler />
      <Header />
      <Toasts />
      <MainWrapper>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:gameId" element={<Game />} />
        </Routes>

        {/* Game List Section */}
        <div className="flex flex-col items-start gap-8 content-start gap-y-3.5 w-full p-5 rounded-xl border border-[rgba(168,168,168,0.1)] bg-[#171919]" style={{ scrollbarColor: '#50d593 transparent' }}>
          <div className="flex w-full justify-between">
            <div className="flex justify-center items-center gap-2">
              <img alt="" loading="lazy" width="36" height="30" decoding="async" className="w-[20px]" src="https://www.guacamole.gg/images/themes/yellow.png" style={{ color: 'transparent' }} />
              <h2 className="text-[#ADD951] text-[16px] font-bold leading-[96.875%] tracking-[-0.48px]">PumpFun Games</h2>
            </div>
            <a className="text-[#ADD951] hover:underline" href="/play">Play Now</a>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="flex min-w-max gap-1 pb-4">
              {['dice', 'flip', 'roulette', 'hilo', 'mines', 'plinko'].map((game, index) => (
                <div key={index} className="w-[170px]">
                  <div className="flex flex-col items-center justify-center">
                    <a href={`/${game}`}>
                      <img
                        alt={game.toUpperCase()}
                        loading="lazy"
                        width="200"
                        height="282"
                        decoding="async"
                        className="rounded-lg w-full h-auto hover:scale-105 transition-transform duration-200"
                        src={`/games/${game.charAt(0).toUpperCase() + game.slice(1)}_Guacamole_Full_Size.jpg`}
                        style={{ color: 'transparent' }}
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Tokens Section */}
        <TrendingTokens />
        <TrendingPools />
        <TransactionList />
        <Footer />
      </MainWrapper>
    </>
  );
}
