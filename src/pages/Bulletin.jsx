import Echo from '../components/Echo';
import AddEchoModal from '../components/AddEchoModal';
import WalletConnectButton from '../components/WalletConnectButton';
import { useEffect, useState } from 'react';
import { useEchoContract } from '../hooks/useEchoContract';

function Bulletin() {
  const [showAddModal, setShowAddModal] = useState({ show: false, x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [message, setMessage] = useState('');

  const {
    echoes,
    createNewEcho,
    isEchoCreating,
    readError,
    writeError
  } = useEchoContract();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBackgroundClick = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY + window.scrollY;
    setShowAddModal({ show: true, x, y });
  };

  const handleAddEcho = async (message) => {
    try {
      await createNewEcho(message, showAddModal.x, showAddModal.y);
    } catch (error) {
      console.error('Error creating echo:', error);
    }
    setShowAddModal({ show: false, x: 0, y: 0 });
  };

  const handleAddEchoClose = () => {
    setShowAddModal(false);
  };

  // Display any contract errors
  useEffect(() => {
    if (readError) {
      console.error('Error reading echoes:', readError);
    }
    if (writeError) {
      console.error('Error writing echo:', writeError);
    }
  }, [readError, writeError]);

  return (
    <div className="relative h-screen disable-scroll cursor-pointer" onClick={handleBackgroundClick}>
      <div className="fixed top-4 right-4 z-50" onClick={(e) => e.stopPropagation()}>
        <WalletConnectButton />
      </div>
      <div className="h-bulletin-height relative disable-scroll">
        <div className={`fixed top-0 left-0 text-xl text-black px-1 bg-white z-50 text-center cursor-default ${scrollY === 0 ? 'hidden' : ''}`} onClick={(e) => e.stopPropagation()}>
          {scrollY}
        </div>

        {echoes.map((echo, index) => (
          <Echo 
            key={index} 
            x={echo.x} 
            y={echo.y} 
            message={echo.message} 
            important={echo.important}
          />
        ))}
      </div>
      {showAddModal.show && (
        <AddEchoModal
          onClose={handleAddEchoClose}
          onAddEcho={handleAddEcho}
          message={message}
          setMessage={setMessage}
          isLoading={isEchoCreating}
        />
      )}
    </div>
  );
}

export default Bulletin;