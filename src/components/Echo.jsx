import PropTypes from 'prop-types'
import { useState } from 'react'

Echo.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
}

function Echo({ x, y, message }) {
    const [showMessage, setShowMessage] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        setShowMessage(!showMessage);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            setShowMessage(false);
        }
    };

    const left = `${x * 100}vw`;

    return (
        <div className="relative">
            <button
                className="absolute w-6 h-6 rounded-full bg-transparent border-none p-0 flex justify-center items-center group"
                style={{ left, top: `${y}px` }}
                onClick={handleClick}
            >
                <div className="bg-white rounded-full w-2 h-2 transform transition-transform duration-300 ease-in-out group-hover:scale-150"></div>
            </button>
            {showMessage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={handleClose}
                >
                    <div className="text-black bg-white p-8 border border-gray-300 rounded shadow-lg w-1/4 h-1/4 flex flex-col justify-center items-center">
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </div>
    );

}

export default Echo;