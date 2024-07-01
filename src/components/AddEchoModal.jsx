import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function AddEchoModal({ onClose, onAddEcho, message, setMessage }) {
    const [errorMessage, setErrorMessage] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
        }
    }, []);

    const handlePost = () => {
        if (message.trim().length > 1000) {
            setErrorMessage('Message is too long :(');
            return;
        }
        if (message.trim()) {
            onAddEcho(message);
            setMessage('');
            onClose();
        }
    };

    const handleClose = (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            handlePost();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleClose}>
            <div className="bg-white shadow-lg w-1/2 max-w-4xl h-1/4 flex flex-col justify-center items-center">
                <textarea
                    ref={textareaRef}
                    placeholder="Echo something to the internet..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="p-2 w-full h-full bg-white text-black outline-none resize-none" // Add hover:bg-gray-200 class
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <button
                    onClick={handlePost}
                    className="bg-[#333] text-white px-4 py-2 w-full hover:bg-[#444] text-xl"
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
    message: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired,
};

export default AddEchoModal;
