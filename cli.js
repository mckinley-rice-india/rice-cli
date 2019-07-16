#!/usr/bin/env node
const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');
const emptyDir = require('empty-dir');
const fs = require('fs');
const path = require('path');

const Help = importJsx('./commands/Help.jsx');
const Cook = importJsx('./commands/Cook.jsx');

const [command, ...args] = process.argv.slice(2);

function cook(projectName) {
  const projectPath = path.join(__dirname, `./${projectName}`);

  const isDirEmpty = emptyDir.sync(projectPath);
  const DirExists = fs.existsSync(projectPath);
  if (!DirExists || isDirEmpty) {
    render(React.createElement(Cook, { projectName }));
  } else {
    process.stdout.write('Directory Not Empty \n');
  }
}

function add(moduleType, moduleName) {
  process.stdout.write('\u001bc');
  process.stdout.write(`${moduleType}, ${moduleName}\n`);
}

function help() {
  render(React.createElement(Help));
}

function mainFlow() {
  switch (command) {
    case 'cook':
      cook(...args);
      break;

    case 'add':
      add(...args);
      break;

    default:
      process.stdout.write('\u001bc');
      help();
      break;
  }
}

mainFlow();
