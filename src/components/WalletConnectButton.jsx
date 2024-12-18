import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="bg-transparent text-white font-mono text-sm border border-white px-3 py-1 hover:bg-white hover:bg-opacity-10"
                  >
                    connect
                  </button>
                );
              }

              return (
                <button
                  onClick={openAccountModal}
                  className="bg-transparent text-white font-mono text-sm border border-white px-3 py-1 hover:bg-white hover:bg-opacity-10"
                >
                  {account.displayName}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnectButton; 