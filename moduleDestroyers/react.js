const shell = require('shelljs');
const path = require('path');

const [componentsDir, containersDir] = ['components', 'containers'].map(type => path.join(process.env.PWD, type));

exports.component = function createComponent(name) {
  const fileToBeDeleted = path.join(componentsDir, `${name}.jsx`);
  if (shell.test('-f', fileToBeDeleted)) {
    shell.rm(fileToBeDeleted);
    return 0;
  }
  return 1;
};

exports.container = function createContainer(name) {
  if (shell.test('-f', path.join(containersDir, name))) {
    shell.rm(path.join(containersDir, name));
    return 0;
  }
  return 1;
};
