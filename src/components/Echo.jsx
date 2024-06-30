import PropTypes from 'prop-types'

Echo.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
}

function Echo({ x, y, message }) {
    const left = `${x * 100}vw`;

    return (
        <button
            className="absolute"
            style={{ left: left, top: `${y}px` }}
        >
            {message}
        </button>
    );
}

export default Echo;