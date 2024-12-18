import Echo from '../components/Echo';
import AddEchoModal from '../components/AddEchoModal';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useEchoContract } from '../hooks/useEchoContract';

function Bulletin() {
  const [showAddModal, setShowAddModal] = useState({ show: false, x: 0, y: 0 });
  const [coordinates, setCoordinates] = useState(null);
  const [message, setMessage] = useState('');

  const {
    echoes,
    createNewEcho,
    isEchoCreating,
    readError,
    writeError
  } = useEchoContract();

  useEffect(() => {
    window.scrollTo(0, Math.floor(Math.random() * 10000))
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY + window.scrollY;
      setCoordinates({ x, y });
    };

    const handleScroll = () => {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
      <Header coordinates={coordinates} />
      <div className="h-bulletin-height relative disable-scroll">
        {echoes.map((echo, index) => (
          <Echo 
            key={index} 
            x={echo.x} 
            y={echo.y} 
            message={echo.message}
            creator={echo.creator} 
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