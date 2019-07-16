const path = require('path');
const shell = require('shelljs');

/**
 * buildWithTemplate: Replaces placeholder variable with actual values
 * inside the created project repository.
 */

module.exports = function buildWithTemplate(projectName) {
  shell.sed(
    '-i', //
    '%PROJECTNAME%',
    projectName,
    path.join(process.env.PWD, projectName, '**/*.{html,js,jsx,json}'),
  );
};
