import * as Dialog from '@radix-ui/react-dialog';
import React, { useState } from 'react';

const MyDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Trigger button to open the dialog */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
        <button
          className="text-sm text-slate-50 hover:bg-transparent hover:text-slate-50"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:r6:"
          data-state="closed"
        >
          [connect wallet]
        </button>
        </Dialog.Trigger>

        {/* Dialog overlay */}
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />

          {/* Dialog content */}
          <Dialog.Content
          style={{
            backgroundColor: '#0b0b0e',
          }}
          
          className="fixed bg-white p-6 rounded-lg shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:max-w-md bg-[#0b0b0e] text-white">
            
            <DialogMain />

            {/* Close button */}
            <Dialog.Close asChild>
              <button className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

function DialogMain() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col items-center">
        <h2 className="text-lg">Log in or sign up</h2>
        <div className="mt-2 w-full max-w-[400px]">
          <label className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <span className="px-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                ></path>
              </svg>
            </span>

            <input
              id="email-input"
              placeholder="enter solano"
              autoComplete="email"
              className="flex-1 min-w-0 w-full p-2 text-white bg-transparent outline-none [@media(max-width:350px)]:text-xs"
              type="email"
              value=""
            />

            <button className="px-4 py-2 text-green-300 [@media(max-width:350px)]:text-xs">
              submit
            </button>
          </label>
          <div className="mt-2 flex justify-end">
            <a
              href="https://docs.privy.io/guide/react/wallets/overview"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://pump.fun/privy.svg"
                alt="Protected by Privy"
                className="filter brightness-0 invert mt-1"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDialog;
