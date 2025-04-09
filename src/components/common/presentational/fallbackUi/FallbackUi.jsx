import PropTypes from 'prop-types';

const FallbackUi = ({ error }) => {
    return (
        <div>
            <h1>{error}</h1>
            <button
                type="submit"
                color="primary"
                onClick={() => window.location.reload()}
            >
                Reload
            </button>
        </div>
    );
};

FallbackUi.propTypes = {
    error: PropTypes.string.isRequired,
};

export default FallbackUi;
