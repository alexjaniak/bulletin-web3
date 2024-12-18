import Echo from '../components/Echo';
import AddEchoModal from '../components/AddEchoModal';
import CustomConnectButton from '../components/ConnectButton';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Bulletin({ db }) {
  const [echoData, setEchoData] = useState([])
  const [showAddModal, setShowAddModal] = useState({ show: false, x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [message, setMessage] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      let echoes = [];
      querySnapshot.forEach((doc) => {
        echoes.push(None);
      });
      setEchoData(echoes);
    }
    fetchData();
  }, []);

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
    setShowAddModal({ show: true, x, y });
  };

  const handleAddEcho = async (message) => {
    setEchoData([...echoData, { x: showAddModal.x, y: showAddModal.y, message }]);
    setShowAddModal({ show: false, x: 0, y: 0 });
  };

  const handleAddEchoClose = () => {
    setShowAddModal(false);

  }

  return (
    <div className="relative h-screen disable-scroll cursor-pointer" onClick={handleBackgroundClick}>
      <div className="fixed top-4 right-4 z-50" onClick={(e) => e.stopPropagation()}>
        <CustomConnectButton />
      </div>
      <div className="h-bulletin-height relative disable-scroll">
        <div className={`fixed top-0 left-0 text-xl text-black px-1 bg-white z-50 text-center cursor-default ${scrollY === 0 ? 'hidden' : ''}`} onClick={(e) => e.stopPropagation()}>
          {scrollY}
        </div>

        {echoData.map((button, index) => (
          <Echo key={index} x={button.x} y={button.y} message={button.message} important={button.important}/>
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