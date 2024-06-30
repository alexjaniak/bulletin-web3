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

    const left = `calc(${x * 100}vw - 12px)`;
    const top = `calc(${y}px - 12px)`;

    return (
        <div className="relative">
            <button
                className="absolute w-6 h-6 rounded-full bg-transparent border-none p-0 flex justify-center items-center group"
                style={{ left, top }}
                onClick={handleClick}
            >
                <div className="bg-white w-2 h-2 transform transition-transform duration-300 ease-in-out group-hover:scale-150"></div>
            </button>
            {showMessage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={handleClose}
                >
                    <div className="text-black bg-white p-4 w-1/4 h-1/4">
                        <p className='text-center p-2'>@ x: {x.toFixed(2)} y: {y}</p>
                        <hr className></hr>
                        <div className='p-2 flex flex-col'>
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default Echo;