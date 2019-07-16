const React = require('react');
const PropTypes = require('prop-types');
const { Color } = require('ink');
const spinners = require('cli-spinners');


const { useState, useEffect } = React;

function Spinner({ type }) {
  const spinner = spinners[type];

  const [frame, setFrame] = useState(0);

  function switchFrame() {
    const isLastFrame = frame === spinner.frames.length - 1;
    const nextFrame = isLastFrame ? 0 : frame + 1;
    setFrame(nextFrame);
  }

  useEffect(() => {
    const timer = setInterval(switchFrame, 40);
    return () => {
      clearInterval(timer);
    };
  });


  return (
    <Color green>
      {spinner.frames[frame]}
    </Color>
  );
}

Spinner.propTypes = {
  type: PropTypes.string,
};

Spinner.defaultProps = {
  type: 'dots',
};

module.exports = Spinner;
