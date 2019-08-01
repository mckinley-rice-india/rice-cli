const React = require('react');
const PropTypes = require('prop-types');
const importJsx = require('import-jsx');
const { Box } = require('ink');

const moduleCreators = require('../moduleCreators');
const moduleDestroyers = require('../moduleDestroyers');

const Error = importJsx('../components/Error.jsx');

const getTypeOfProject = require('../utils/getTypeOfProject');

const availableOptions = {
  component: ['react', 'react-native'],
  screen: ['react-native'],
  container: ['react', 'react-native'],
  route: ['node'],
  api: ['node'],
  schema: ['node'],
};

function Update({ command, moduleType, moduleName }) {
  const projectType = getTypeOfProject();

  // Check if moduleType or moduleName are valid, else output Add help
  if (!moduleType || !moduleName
    || !(moduleType in availableOptions)
    || !/[A-Z][a-zA-Z]+/.test(moduleName)
  ) {
    process.stdout.write('add Help');
  }

  // Project Type is invalid
  if (projectType === null) {
    return (<Error oneline errorMessage="Invalid Project" />);
  }

  // Module not compatible with current Project
  if (availableOptions[moduleType].indexOf(projectType) === -1) {
    // Print `add` Help
    return (<Error oneline errorMessage="Incompatible module type" />);
  }

  // Creates module
  try {
    if (command === 'add') {
      moduleCreators[projectType][moduleType](moduleName);
      return (<Box>{`Created ${moduleType}/${moduleName}.jsx!`}</Box>);
    }

    if (command === 'delete') {
      const result = moduleDestroyers[projectType][moduleType](moduleName);
      return (<Box>{`${result}:Deleted ${moduleType}s/${moduleName}.jsx!`}</Box>);
    }
  } catch (error) {
    return (<Error oneline errorMessage={error.message} />);
  }
}

Update.propTypes = {
  command: PropTypes.oneOf(['add', 'delete']),
  moduleType: PropTypes.string.isRequired,
  moduleName: PropTypes.string.isRequired,
};

module.exports = Update;
