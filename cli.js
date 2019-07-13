#!/usr/bin/env node
const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');
const emptyDir = require('empty-dir');

const Logo = importJsx('./components/Logo.jsx');
const Cook = importJsx('./commands/Cook.jsx');

process.stdout.write('\u001bc');

function cook(projectName) {
  render(React.createElement(Cook, { projectName }));
}

function mainFlow() {
  switch (process.argv[2]) {
    case 'cook':
      cook(process.argv[3]);
      break;

    default:
      render(React.createElement(Logo));
      break;
  }
}

if (emptyDir.sync('./')) {
  mainFlow();
} else {
  process.stdout.write('Directory Not Empty\n');
}
