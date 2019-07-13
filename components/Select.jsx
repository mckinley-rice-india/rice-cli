const React = require('react');
const PropTypes = require('prop-types');
const { Color, StdinContext } = require('ink');

const { useState, useEffect } = React;

const ARROW_UP = '\u001B[A';
const ARROW_DOWN = '\u001B[B';
const ENTER = '\r';

function Select({ stdin, setRawMode, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(0);

  const projectTypes = [
    {
      label: 'React',
      value: 'React',
    },
    {
      label: 'React-Native',
      value: 'React-Native',
    },
    {
      label: 'Node',
      value: 'Node',
    },
  ];

  const handleInput = (data) => {
    const str = String(data);
    if (str === ARROW_UP || str === 'k') {
      setSelectedOption(selectedOption > 0 ? selectedOption - 1 : projectTypes.length - 1);
    }

    if (str === ARROW_DOWN || str === 'j') {
      setSelectedOption(selectedOption < projectTypes.length - 1 ? selectedOption + 1 : 0);
    }

    if (str === ENTER) {
      onSelect(projectTypes[selectedOption]);
    }
  };


  useEffect(() => {
    stdin.on('data', handleInput);
    setRawMode(true);
    return () => {
      stdin.removeListener('data', handleInput);
      setRawMode(false);
    };
  });

  return (
    <React.Fragment>
      {projectTypes.map(({ label, value }, index) => (
        <Color key={value} hex={selectedOption === index ? '#F79C06' : undefined}>
          {selectedOption === index ? '❯ ' : '  '}
          {label}
        </Color>
      ))}
    </React.Fragment>
  );
}

Select.propTypes = {
  stdin: PropTypes.shape({
    on: PropTypes.func,
    removeListener: PropTypes.func,
  }).isRequired,
  setRawMode: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

module.exports = function SelectInputWithStdin(props) {
  return (
    <StdinContext.Consumer>
      {({ stdin, setRawMode }) => (
        <Select stdin={stdin} setRawMode={setRawMode} {...props} />
      )}
    </StdinContext.Consumer>
  );
};
