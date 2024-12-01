import React from 'react'

import { useChart } from '../../context/chart-context'

export default function SidebarPlay() {
    return (
        <>
            <MainSidebar />
        </>
    )
}

function MainSidebar() {
    return (
      <div className="grid gap-4 h-fit w-fit mx-auto mt-20">
        <div className="w-full md:w-[350px] grid gap-4">
          <div

          style={{
            background: '#2e303a'
          }}
          
          className="p-4 rounded-lg border border-none text-gray-400 grid gap-4">
            <SidebarTop />
            <SidebarSetMax />
            <SidebarMiddle />
            <SidebarTrade />
          </div>
        </div>
        sidebar
      </div>
    );
  }
  
  function SidebarMiddle() {
    return (
      <>
        <div className="flex flex-col">
          <div className="flex items-center rounded-md relative bg-[#2e303a]">
            <input
              className="flex h-10 rounded-md border border-slate-200 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 bg-transparent text-white outline-none w-full pl-3"
              id="amount"
              placeholder="0.0"
              type="number"
            />
            <div className="flex items-center ml-2 absolute right-2">
              <span className="text-white mr-2">SOL</span>
              <img
                alt="SOL"
                loading="lazy"
                width="32"
                height="32"
                decoding="async"
                className="w-8 h-8 rounded-full"
                srcSet="https://pump.fun/_next/image?url=%2Fsolana-logo-square.png&amp;w=32&amp;q=75 1x, https://pump.fun/_next/image?url=%2Fsolana-logo-square.png&amp;w=64&amp;q=75 2x"
                src="https://pump.fun/_next/image?url=%2Fsolana-logo-square.png&amp;w=64&amp;q=75"
                style={{ color: 'transparent' }}
              />
            </div>
          </div>
          <div className="flex mt-2 bg-[#2e303a] p-1 rounded-lg">
            <button className="text-xs py-1 -ml-1 px-2 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300">
              reset
            </button>
            <button className="text-xs py-1 px-2 ml-1 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300">
              0.1 SOL
            </button>
            <button className="text-xs py-1 px-2 ml-1 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300">
              0.5 SOL
            </button>
            <button className="text-xs py-1 px-2 ml-1 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300">
              1 SOL
            </button>
          </div>
        </div>
      </>
    );
  }
  
  function SidebarTrade() {
    const { multiplier, isCrashed, crashPoint, chartData, resetGame } = useChart();
    return (
      <>
        <div className="flex flex-col gap-2">
          {isCrashed ? (
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 bg-green-400 text-primary w-full py-3 rounded-md hover:bg-green-200"
              onClick={resetGame}
            >
              play
            </button>
          ) : (
            <p className="text-sm">Multiplier: {multiplier.toFixed(1)}x</p>
          )}
  
          <div className="flex items-center space-x-2">
            <button
              type="button"
              role="checkbox"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              className="peer h-4 w-4 shrink-0 rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-gray-500 data-[state=checked]:bg-transparent border-gray-500 text-gray-500 focus:ring-gray-500 focus:ring-offset-gray-800"
              id="add-comment"
            ></button>
            <label
              htmlFor="add-comment"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400"
            >
              add comment
            </label>
          </div>
        </div>
      </>
    );
  }
  
  function SidebarSetMax() {
    return (
      <>
        <div className="flex justify-between w-full gap-2">
          <button className="text-xs py-1 px-2 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300">
            switch to LTTRY
          </button>
          <button
            className="text-xs py-1 px-2 rounded text-gray-400 hover:bg-gray-800 bg-primary"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:rs:"
            data-state="closed"
          >
            set max slippage
          </button>
        </div>
      </>
    );
  }
  
  function SidebarTop() {
    return (
      <>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button className="p-2 text-center rounded bg-green-400 text-primary">
            buy
          </button>
          <button className="p-2 text-center rounded bg-gray-800 text-grey-600">
            sell
          </button>
        </div>
      </>
    );
  }