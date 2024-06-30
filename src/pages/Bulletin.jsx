import Echo from '../components/Echo';
import AddEchoModal from '../components/AddEchoModal';
import { useState } from 'react';

function Bulletin() {
  const [echoData, setEchoData] = useState([
    { x: 0.1, y: 50, message: 'Echo 1' },
    { x: 0.2, y: 100, message: 'Echo 2' },
    { x: 0.5, y: 150, message: 'Echo 3' },
    { x: 0.3, y: 1050, message: 'Bony' },
  ])

  const [showAddModal, setShowAddModal] = useState(false);

  const handleBackgroundClick = () => {
    console.log('Background clicked');
    setShowAddModal(true);
  };

  const handleAddEcho = (message) => {
    const newX = 0.5
    const newY = 300
    setEchoData([...echoData, { x: newX, y: newY, message }]);
  };


  return (
    <div className="relative h-screen" onClick={handleBackgroundClick}>
      <div className="h-bulletin-height relative">
        {echoData.map((button, index) => (
          <Echo key={index} x={button.x} y={button.y} message={button.message} />
        ))}
      </div>
      {showAddModal && (
        <AddEchoModal
          onClose={() => setShowAddModal(false)}
          onAddEcho={handleAddEcho}
        />
      )}
    </div>
  );
}

export default Bulletin;