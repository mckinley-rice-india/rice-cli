const shell = require('shelljs');
const path = require('path');

/**
 * getTypeOfProject: Returns the type of project cooked
 * by checking the `keywords` field of package.json.
*/

module.exports = function getTypeOfProject() {
  const keywordsString = shell
    .grep('-i', 'keywords', path.join(process.env.PWD, 'package.json'))
    .stdout
    .split(':')[1];

  const types = ['react', 'react-native', 'node'];

  const typesSpecified = types
    .filter(type => keywordsString.includes(type));


  if (typesSpecified.length !== 1) {
    return null;
  }

  return typesSpecified[0];
};
