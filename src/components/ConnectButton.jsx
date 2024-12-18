import { ConnectButton } from '@rainbow-me/rainbowkit';

const CustomConnectButton = () => {
  return (
    <ConnectButton 
      chainStatus="icon"
      showBalance={true}
    />
  );
};

export default CustomConnectButton; 