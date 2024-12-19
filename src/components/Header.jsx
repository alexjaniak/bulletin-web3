import WalletConnectButton from './WalletConnectButton';
import PropTypes from 'prop-types';
import { useState } from 'react';

function Header({ coordinates }) {
  const [showAbout, setShowAbout] = useState(false);

  const handleAboutClick = (e) => {
    e.stopPropagation();
    setShowAbout(true);
  };

  const handleAboutClose = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setShowAbout(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-3 pointer-events-none">
        <div className="text-white font-mono text-sm pointer-events-auto">
          {coordinates && (
            <span>x: {coordinates.x.toFixed(2)} y: {coordinates.y}</span>
          )}
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={handleAboutClick}
            className="bg-transparent text-white font-mono text-sm border border-white px-3 py-1 hover:bg-white hover:bg-opacity-10"
          >
            About
          </button>
          <WalletConnectButton />
        </div>
      </header>

      {showAbout && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleAboutClose}
        >
          <div className="text-black bg-white p-2 w-1/2 max-w-4xl max-h-[40%] overflow-auto">
            <div className='p-2 flex flex-col break-words break whitespace-pre-wrap'>
              <p>
                Bulletin is a decentralized message board where anyone can leave a message anywhere on an infinite canvas.
                {'\n\n'}
                Each message is stored on the Arbitrum blockchain as an Echo - a permanent, immutable record of your thoughts.
                {'\n\n'}
                To create an Echo, simply click anywhere on the canvas and type your message.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Header.propTypes = {
  coordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default Header; 