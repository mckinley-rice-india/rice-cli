const React = require('react');
const PropTypes = require('prop-types');
const importJsx = require('import-jsx');
const { Box } = require('ink');

const Select = importJsx('../components/Select.jsx');

const { useState } = React;

function Cook({ projectName }) {
  const [
    { isSelected, selectedValue },
    setCurrentProject,
  ] = useState({ isSelected: false, selectedValue: null });

  const handleSelect = ({ value }) => {
    setCurrentProject({ isSelected: true, selectedValue: value });
  };

  return (
    isSelected
      ? <Box>{`Created ${selectedValue} project: ${projectName} at ${process.env.PWD}\n`}</Box>
      : <Select onSelect={handleSelect} />
  );
}

Cook.propTypes = {
  projectName: PropTypes.string.isRequired,
};

module.exports = Cook;
