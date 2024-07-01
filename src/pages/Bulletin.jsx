import Echo from '../components/Echo';
import AddEchoModal from '../components/AddEchoModal';
import { useEffect, useState } from 'react';
import { pushEcho, pullEchos } from '../db';
import { v4 as uuidv4 } from 'uuid';

function Bulletin({ db }) {
  const [echoData, setEchoData] = useState([])
  const [showAddModal, setShowAddModal] = useState({ show: false, x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [message, setMessage] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      const echoes = await pullEchos(db);
      setEchoData(echoes);
    };
    fetchData();
  }, [db])

  useEffect(() => {
    window.scrollTo(0, Math.floor(Math.random() * 10000))
  }, [])


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
    console.log(window.scrollY);
    setShowAddModal({ show: true, x, y });
  };

  const handleAddEcho = async (message) => {
    setEchoData([...echoData, { x: showAddModal.x, y: showAddModal.y, message }]);
    setShowAddModal({ show: false, x: 0, y: 0 });
    await pushEcho(db, uuidv4(), showAddModal.x, showAddModal.y, message);
  };

  const handleAddEchoClose = () => {
    setShowAddModal(false);

  }

  return (
    <div className="relative h-screen disable-scroll" onClick={handleBackgroundClick}>
      <div className="h-bulletin-height relative disable-scroll">
        <div className={`fixed top-0 left-0 text-xl text-black px-1 bg-white z-50 text-center cursor-default ${scrollY === 0 ? 'hidden' : ''}`} onClick={(e) => e.stopPropagation()}>
          {scrollY}
        </div>

        {echoData.map((button, index) => (
          <Echo key={index} x={button.x} y={button.y} message={button.message} />
        ))}
      </div>
      {showAddModal.show && (
        <AddEchoModal
          onClose={handleAddEchoClose}
          onAddEcho={handleAddEcho}
          message={message}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}

export default Bulletin;