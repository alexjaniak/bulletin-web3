import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnectButton = () => {
  return (
    <ConnectButton 
      chainStatus="icon"
      showBalance={true}
    />
  );
};

export default WalletConnectButton; 