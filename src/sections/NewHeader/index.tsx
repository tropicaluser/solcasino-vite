import React from 'react'
import styled from 'styled-components'

import MyDialog from './Dialog';
import ShakingBoxes from '../RecentPlays/ShakingBoxes';
import ShakingBoxes2 from '../RecentPlays/Stakingboxes2';
import TokenSelect from '../TokenSelect';

// Media query for mobile (adjust the max-width as needed)
const mobileQuery = '@media (max-width: 768px)';

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  ${mobileQuery} {
    display: none;  // Hide on mobile
  }
`;

export default function Nav() {
  return (
    <nav className="flex flex-wrap justify-between w-full p-2 items-center h-fit">
      <div className="flex items-center flex-wrap mr-4">
        <a className="flex items-center" href="/board">
          <img
            alt="Pump"
            loading="lazy"
            width="25"
            height="25"
            decoding="async"
            data-nimg="1"
            style={{ color: 'transparent' }}
            srcSet="https://pump.fun/_next/image?url=%2Flogo.png&amp;w=32&amp;q=75 1x, https://pump.fun/_next/image?url=%2Flogo.png&amp;w=64&amp;q=75 2x"
            src="https://pump.fun/_next/image?url=%2Flogo.png&amp;w=64&amp;q=75"
          />
        </a>

        <div className="flex flex-col gap-0.4 ml-6">
          <div className="flex gap-2">
            <button
              className="text-sm text-slate-50 hover:font-bold hover:bg-transparent hover:text-slate-50"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r0:"
              data-state="closed"
            >
              [how it works]
            </button>
            <a
              className="text-sm text-white hover:underline hover:font-bold"
              rel="noopener noreferrer"
              href="/advanced"
            >
              [advanced]
            </a>
          </div>
          <div className="flex gap-2 items-center">
            <a
              className="text-sm text-white hover:underline hover:font-bold"
              href="https://t.me/pumpfunsupport"
              target="_blank"
              rel="noopener noreferrer"
            >
              [support]
            </a>
            <a
              className="text-sm text-white hover:underline hover:font-bold"
              href="https://twitter.com/pumpdotfun"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="X"
                loading="lazy"
                width="16"
                height="16"
                decoding="async"
                data-nimg="1"
                style={{ color: 'transparent' }}
                srcSet="https://pump.fun/_next/image?url=%2Fx-logo.png&amp;w=16&amp;q=75 1x, https://pump.fun/_next/image?url=%2Fx-logo.png&amp;w=32&amp;q=75 2x"
                src="https://pump.fun/_next/image?url=%2Fx-logo.png&amp;w=32&amp;q=75"
              />
            </a>
            <a
              className="text-sm text-white hover:underline hover:font-bold"
              href="https://t.me/launchonpump"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="Telegram"
                loading="lazy"
                width="16"
                height="16"
                decoding="async"
                data-nimg="1"
                style={{ color: 'transparent' }}
                srcSet="https://pump.fun/_next/image?url=%2Ftelegram-logo.png&amp;w=16&amp;q=75 1x, https://pump.fun/_next/image?url=%2Ftelegram-logo.png&amp;w=32&amp;q=75 2x"
                src="https://pump.fun/_next/image?url=%2Ftelegram-logo.png&amp;w=32&amp;q=75"
              />
            </a>
            <a
              className="text-sm text-white hover:underline hover:font-bold"
              href="https://www.instagram.com/pumpdotfun_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="Instagram"
                loading="lazy"
                width="16"
                height="16"
                decoding="async"
                data-nimg="1"
                style={{ color: 'transparent' }}
                srcSet="https://pump.fun/_next/image?url=%2Finstagram-logo.png&amp;w=16&amp;q=75 1x, https://pump.fun/_next/image?url=%2Finstagram-logo.png&amp;w=32&amp;q=75 2x"
                src="https://pump.fun/_next/image?url=%2Finstagram-logo.png&amp;w=32&amp;q=75"
              />
            </a>
            <a
              className="text-sm text-white hover:underline hover:font-bold"
              href="https://www.tiktok.com/@pump.fun"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="TikTok"
                loading="lazy"
                width="16"
                height="16"
                decoding="async"
                data-nimg="1"
                style={{ color: 'transparent' }}
                srcSet="https://pump.fun/_next/image?url=%2Ftiktok-logo.png&amp;w=16&amp;q=75 1x, https://pump.fun/_next/image?url=%2Ftiktok-logo.png&amp;w=32&amp;q=75 2x"
                src="https://pump.fun/_next/image?url=%2Ftiktok-logo.png&amp;w=32&amp;q=75"
              />
            </a>
          </div>
        </div>
        <SocialLinks>
          <ShakingBoxes />
          <ShakingBoxes2 />
        </SocialLinks>
      </div>
      <div className="flex flex-row items-center gap-0.4 items-end order-2 lg:order-3">
        <TokenSelect />
        <MyDialog />
      </div>
    </nav>
  );
}

function StaticShakeBoxes() {
  return (
    <div className="hidden md:flex gap-2 ml-4">
          <div className="p-2 rounded flex items-center gap-1 text-sm bg-red-300">
            <a href="/profile/HBtHLHazVe8P98tm4gFc6tGr6jik7xGKJwGUTFJfPYDg">
              <span className="flex gap-1 items-center">
                <img
                  alt=""
                  loading="lazy"
                  width="16"
                  height="16"
                  decoding="async"
                  data-nimg="1"
                  className="rounded w-4 h-4"
                  src="https://pump.fun/ipfs/QmY392dVKJXHg8kFsfzTrEuGJAw4qGYByBmJabwxhi3sUM?img-width=16&amp;img-dpr=2&amp;img-onerror=redirect"
                  style={{ color: 'transparent', display: 'block' }}
                />
                <span
                  className="px-1 rounded hover:underline flex gap-1"
                  style={{ backgroundColor: 'transparent' }}
                >
                  HBtHLH
                </span>
              </span>
            </a>
            sold 0.0100 SOL of
            <a
              className="hover:underline flex gap-2"
              href="/coin/EmfM2DhqDmjEPL7zr3oKh8v35TZyr4nMzhkoSzrJpump"
            >
              XMASAPE
              <img
                alt=""
                loading="lazy"
                width="20"
                height="20"
                decoding="async"
                data-nimg="1"
                className="h-5 w-5 rounded-full"
                src="https://pump.fun/ipfs/QmV4ayZs5dDV41e16HcK3vS9zFLgY7AmKaAiL9FNQ8WaMy?img-width=20&amp;img-dpr=2&amp;img-onerror=redirect"
                style={{ color: 'transparent', display: 'block' }}
              />
            </a>
          </div>
        </div>
  )
}
