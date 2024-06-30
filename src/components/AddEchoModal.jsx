import { useState } from 'react';
import PropTypes from 'prop-types';

function AddEchoModal({ onClose, onAddEcho }) {
  const [message, setMessage] = useState('');

  const handlePost = () => {
    if (message.trim()) {
      onAddEcho(message);
      onClose();
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-8 border border-gray-300 rounded shadow-lg w-1/4 h-1/4 flex flex-col justify-center items-center" onClick={handleClick}>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          onClick={handlePost}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </div>
    </div>
  );
}

AddEchoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddEcho: PropTypes.func.isRequired,
};

export default AddEchoModal;
