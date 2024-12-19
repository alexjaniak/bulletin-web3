import Echo from '../components/Echo';
import AddEchoModal from '../components/AddEchoModal';
import Header from '../components/Header';
import { useEffect, useState, useCallback } from 'react';
import { useEchoContract } from '../hooks/useEchoContract';

function Bulletin() {
  const [showAddModal, setShowAddModal] = useState({ show: false, x: 0, y: 0 });
  const [coordinates, setCoordinates] = useState(null);
  const [message, setMessage] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const {
    echoes,
    createNewEcho,
    isEchoCreating,
    isLoadingEchoes,
    readError,
    writeError
  } = useEchoContract();

  useEffect(() => {
    window.scrollTo(0, Math.floor(Math.random() * 10000))
  }, []);

  const updateCoordinates = useCallback(() => {
    const x = mousePosition.x / window.innerWidth;
    const y = mousePosition.y + window.scrollY;
    setCoordinates({ x, y });
  }, [mousePosition]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
      }
      updateCoordinates();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateCoordinates]);

  // Update coordinates when mouse position changes
  useEffect(() => {
    updateCoordinates();
  }, [mousePosition, updateCoordinates]);

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
    <div className="min-h-screen w-full cursor-pointer" onClick={handleBackgroundClick}>
      <Header coordinates={coordinates} />
      <div className="h-bulletin-height w-full relative">
        {isLoadingEchoes ? (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-4">
              <div className="w-2 h-2 bg-white animate-pulse"></div>
              <span className="text-white/50 font-mono text-sm">loading echoes...</span>
            </div>
          </div>
        ) : (
          echoes.map((echo, index) => (
            <Echo 
              key={index} 
              x={echo.x} 
              y={echo.y} 
              message={echo.message}
              creator={echo.creator} 
              important={echo.important}
            />
          ))
        )}
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