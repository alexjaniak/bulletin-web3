import WalletConnectButton from './WalletConnectButton';
import PropTypes from 'prop-types';

function Header({ coordinates }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-3">
      <div className="text-white font-mono text-sm">
        {coordinates && (
          <span>x: {coordinates.x.toFixed(2)} y: {coordinates.y}</span>
        )}
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <WalletConnectButton />
      </div>
    </header>
  );
}

Header.propTypes = {
  coordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default Header; 