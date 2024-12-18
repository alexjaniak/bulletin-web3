import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'

Echo.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    important: PropTypes.bool,
}

function Echo({ x, y, message, creator, important }) {
    const [showMessage, setShowMessage] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowMessage(false);
                if (buttonRef.current) {
                    buttonRef.current.blur();
                }
            }
        };

        if (showMessage) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.classList.add('no-scroll');
        } else {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.classList.remove('no-scroll');
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.classList.remove('no-scroll');
        };
    }, [showMessage]);
    

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
                ref={buttonRef}
                tabIndex={-1}
                className="absolute w-6 h-6 rounded-full bg-transparent border-none p-0 flex justify-center items-center group"
                style={{ left, top }}
                onClick={handleClick}
            >
                {(important === "yes")? 
                    <div className="z-49 bg-green-500 w-2 h-2 transform transition-transform duration-300 ease-in-out group-hover:scale-150"></div> 
                    : 
                    <div className="bg-white w-2 h-2 transform transition-transform duration-300 ease-in-out group-hover:scale-150"></div>
                }
            </button>
            {showMessage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={handleClose}
                >
                    <div className="text-black bg-white p-2 w-1/2 max-w-4xl max-h-[40%] overflow-auto">
                        <p className='text-center p-2'>@ x: {x.toFixed(2)} y: {y}</p>
                        <p className='text-center text-sm text-gray-500'>by: {creator}</p>
                        <hr className="mx-2 my-2"></hr>
                        <div className='p-2 flex flex-col break-words break whitespace-pre-wrap'>
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Echo;