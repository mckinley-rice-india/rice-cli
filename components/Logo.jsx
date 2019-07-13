const React = require('react');
const Gradient = require('ink-gradient');

const logo = `
██████   ██████   ██████                  
██████   ██████   ██████                  
██████   ██████   ██████                  
                                          
                                          
██████         ╭───╮╭───╮                 
██████         │   ╰╮   │  MCKINLEY & RICE
██████         ╰───╯╰───╯                 
                                          
                                          
██████   ██████   ██████                  
██████   ██████   ██████                  
██████   ██████   ██████                  
`;

module.exports = function Logo() {
  return (
    <Gradient colors={['#FF0D4A', '#F79C06']}>
      {logo}
    </Gradient>
  );
};
