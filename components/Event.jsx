const React = require('react');
const PropTypes = require('prop-types');
const { Box, Color } = require('ink');
const importJsx = require('import-jsx');

const Spinner = importJsx('../components/Spinner.jsx');

const Event = ({
  isFulfilled,
  hasErrored,
  activeText,
  fulfilledText,
  errorMessage,
}) => {
  if (isFulfilled) {
    return (
      <Box>
        <Color green>✓</Color>
        {` ${fulfilledText}`}
      </Box>
    );
  }

  if (hasErrored) {
    return (
      <Box>
        <Color hex="#D8000C">✗</Color>
        {` Error while ${activeText}:\n`}
        <Color hex="#D8000C">{errorMessage}</Color>
      </Box>
    );
  }

  return (
    <Box>
      <Spinner type="dots12" />
      {' Cloning...'}
    </Box>
  );
};

Event.propTypes = {
  isFulfilled: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  activeText: PropTypes.string.isRequired,
  fulfilledText: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

Event.defaultProps = {
  errorMessage: '',
};

module.exports = Event;
