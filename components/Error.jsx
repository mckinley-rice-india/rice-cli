const React = require('react');
const PropTypes = require('prop-types');
const { Box, Color } = require('ink');

function Error({ errorMessage, oneline }) {
  return (
    <Box>
      <Color hex="#D8000C">✗</Color>
      {` Error: ${oneline ? errorMessage : ''}`}
      {oneline ? '' : errorMessage}
    </Box>
  );
}

Error.propTypes = {
  oneline: PropTypes.bool,
  errorMessage: PropTypes.string.isRequired,
};

Error.defaultProps = {
  oneline: false,
};

module.exports = Error;
