const React = require('react');
const importJsx = require('import-jsx');
const { Box } = require('ink');

const Logo = importJsx('../components/Logo.jsx');

const help = `
Usage: rice <command>

Commands:

  cook        rice cook <project-name>

  add         rice add [component|screen|container|route|api|schema] <module-name>

  delete      rice delete [component|screen|container|route|api|schema] <module-name>
`;

module.exports = () => (
  <Box flexDirection="column">
    <Logo />
    <Box>
      {help}
    </Box>
  </Box>
);
