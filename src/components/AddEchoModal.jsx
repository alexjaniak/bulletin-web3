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

    const handleClose = (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50" onClick={handleClose}>
            <div className="bg-white rounded shadow-lg w-1/2 max-w-4xl h-1/4 flex flex-col justify-center items-center">
                <textarea
                    placeholder="Echo something to the internet..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="p-2 rounded w-full h-full bg-white text-black"
                    style={{ resize: 'none' }}
                />
                <button
                    onClick={handlePost}
                    className="bg-[#333] text-white px-4 py-2 w-full"
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
