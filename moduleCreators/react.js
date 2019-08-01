const shell = require('shelljs');
const path = require('path');

const [componentsDir, containersDir] = ['components', 'containers'].map(type => path.join(process.env.PWD, type));

exports.component = function createComponent(name) {
  if (!shell.test('-d', componentsDir)) {
    shell.mkdir(componentsDir);
  }
  shell.cd(path.join(process.env.PWD, 'components'));
  shell.touch(`${name}.jsx`);
};

exports.container = function createContainer(name) {
  if (!shell.test('-d', containersDir)) {
    shell.mkdir(containersDir);
  }
  shell.cd(path.join(process.env.PWD, 'containers'));
  shell.touch(`${name}.jsx`);
};
