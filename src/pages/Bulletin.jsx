import Echo from '../components/Echo';
import AddEchoModal from '../components/AddEchoModal';
import { useEffect, useState } from 'react';
import { pushEcho, pullEchos } from '../db';
import { v4 as uuidv4 } from 'uuid';

function Bulletin({ db }) {
  const [echoData, setEchoData] = useState([])

  const [showAddModal, setShowAddModal] = useState({ show: false, x: 0, y: 0 });

  const [scrollY, setScrollY] = useState(window.scrollY);

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
    const fetchData = async () => {
      const echoes = await pullEchos(db);
      setEchoData(echoes);
      console.log(echoes);
    };
    fetchData();
    console.log(echoData);
  }, [])

  const handleBackgroundClick = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY + window.scrollY;
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
  //window.scrollTo(0, Math.floor(Math.random() * 10000))

  return (
    <div className="relative h-screen" onClick={handleBackgroundClick}>
      <div className="h-bulletin-height relative">
        <div className="fixed top-0 left-0 p-2 text-black bg-white z-50 w-[100px]">
          @ y: {scrollY}
        </div>

        {echoData.map((button, index) => (
          <Echo key={index} x={button.x} y={button.y} message={button.message} />
        ))}
      </div>
      {showAddModal.show && (
        <AddEchoModal
          onClose={handleAddEchoClose}
          onAddEcho={handleAddEcho}
        />
      )}
    </div>
  );
}

export default Bulletin;