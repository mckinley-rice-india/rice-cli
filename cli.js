#!/usr/bin/env node
const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');
const emptyDir = require('empty-dir');
const fs = require('fs');
const path = require('path');

const Help = importJsx('./commands/Help.jsx');
const Cook = importJsx('./commands/Cook.jsx');
const Update = importJsx('./commands/Update.jsx');

const Error = importJsx('./components/Error.jsx');

const [cliCommand, ...args] = process.argv.slice(2);

function cook(projectName) {
  if (typeof projectName !== 'string' || !/^[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)) {
    render(React.createElement(Error, { errorMessage: 'Invalid Project Name', oneline: true }));
    return;
  }

  const projectPath = path.join(__dirname, `./${projectName}`);

  const isDirEmpty = emptyDir.sync(projectPath);
  const DirExists = fs.existsSync(projectPath);
  if (!DirExists || isDirEmpty) {
    render(React.createElement(Cook, { projectName }));
  } else {
    render(React.createElement(Error, { errorMessage: 'Directory Not Empty', oneline: true }));
  }
}

function update(command, moduleType, moduleName) {
  render(React.createElement(Update, { command, moduleType, moduleName }));
}

function help() {
  render(React.createElement(Help));
}

function mainFlow() {
  switch (cliCommand) {
    case 'cook':
      cook(...args);
      break;

    case 'add':
    case 'delete':
      update(cliCommand, ...args);
      break;

    default:
      process.stdout.write('\u001bc');
      help();
      break;
  }
}

mainFlow();
