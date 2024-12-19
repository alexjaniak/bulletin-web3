import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function AddEchoModal({ onClose, onAddEcho, message, setMessage, isLoading }) {
    const [errorMessage, setErrorMessage] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
        }
        document.body.classList.add('no-scroll'); 
    
        return () => {
            document.body.classList.remove('no-scroll'); 
        };
    }, []);

    const handlePost = () => {
        if (message.trim().length > 280) {
            setErrorMessage('Message is too long :(');
            return;
        }
        if (message.trim()) {
            onAddEcho(message.trim());
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
            <div className="bg-white w-1/2 max-w-4xl flex flex-col">
                <textarea
                    ref={textareaRef}
                    placeholder="Echo something to the internet..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="p-4 w-full h-32 bg-white text-black font-mono outline-none resize-none border-b text-base"
                />
                {errorMessage && <p className="text-red-500 text-sm font-mono px-4 py-2">{errorMessage}</p>}
                <button
                    onClick={handlePost}
                    disabled={isLoading}
                    className="bg-gray-100 text-black font-mono text-base px-4 py-3 hover:bg-gray-200 text-center disabled:opacity-50 transition-colors"
                >
                    {isLoading ? 'Posting...' : 'Post'}
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
    isLoading: PropTypes.bool,
};

export default AddEchoModal;
