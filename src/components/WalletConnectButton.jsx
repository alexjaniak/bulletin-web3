import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnectButton = () => {
  const handleClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        openAccountModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account;

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
            className="flex items-center gap-2"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={(e) => handleClick(e, openConnectModal)}
                    className="bg-transparent text-white font-mono text-sm border border-white px-3 py-1 hover:bg-white hover:bg-opacity-10"
                  >
                    Connect
                  </button>
                );
              }

              return (
                <button
                  onClick={(e) => handleClick(e, openAccountModal)}
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