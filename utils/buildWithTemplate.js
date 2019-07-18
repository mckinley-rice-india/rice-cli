const path = require('path');
const shell = require('shelljs');

/**
 * buildWithTemplate: Replaces placeholder variable with actual values
 * inside the created project repository.
 */

module.exports = function buildWithTemplate(projectName) {
  shell.sed(
    '-i', // Make changes in-place
    'react-boilerplate', // Placeholder Project Name
    projectName, // Actual Project Name
    path.join(process.env.PWD, projectName, '**/*.{html,js,jsx,json}'), // File Glob to go through every file
  );
};
