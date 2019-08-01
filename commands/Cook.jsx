const React = require('react');
const PropTypes = require('prop-types');
const importJsx = require('import-jsx');
const { Box } = require('ink');
const shell = require('shelljs');
const path = require('path');

const buildWithTemplate = require('../utils/buildWithTemplate');

const Select = importJsx('../components/Select.jsx');
const Event = importJsx('../components/Event.jsx');

const { useState } = React;

function Cook({ projectName }) {
  const [
    {
      isSelected,
      selectedValue,
    },
    setCurrentProject,
  ] = useState({ isSelected: false, selectedValue: null });

  const [isCloned, setIsCloned] = useState(false);
  const [{ hasErrored, errorMessage }, setError] = useState({ hasErrored: false, errorMessage: '' });
  const [isBuilt, setIsBuilt] = useState(false);

  const handleSelect = ({ value }) => {
    setCurrentProject({ isSelected: true, selectedValue: value });
    shell.exec(
      `git clone https://github.com/V1shvesh/react-web-template ${projectName}`,
      { silent: true },
      (code, stdout, stderr) => {
        if (code === 0) {
          setIsCloned(true);
          buildWithTemplate(projectName);
          setIsBuilt(true);
          shell.cd(path.join(process.env.PWD, projectName));
        } else {
          setError({
            hasErrored: true,
            errorMessage: stderr,
          });
        }
      },
    );
  };

  return (
    !isSelected ? (<Select onSelect={handleSelect} />) : (
      <React.Fragment>
        <Event
          isFulfilled={isCloned}
          hasErrored={!isCloned && hasErrored}
          activeText="Cloning"
          fulfilledText="Cloned"
          errorMessage={errorMessage}
        />
        {isCloned && (
          <Event
            isFulfilled={isBuilt}
            hasErrored={false}
            activeText="Building"
            fulfilledText="Built"
          />
        )}
        {isCloned && isBuilt && (
          <Box>
            {`Created ${selectedValue} project at ${process.env.PWD}/${projectName}`}
          </Box>
        )}
      </React.Fragment>
    )
  );
}
Cook.propTypes = {
  projectName: PropTypes.string.isRequired,
};

module.exports = Cook;
