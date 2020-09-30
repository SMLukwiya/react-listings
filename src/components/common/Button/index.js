import React from 'react';

import classes from './button.module.css';

const button = ({title, color, small, click, enabled}) => {
  const style = {
    height: '100%',
    width: '100%',
    border: 0,
    borderRadius: '30px',
    width: '220px',
    padding: '15px 5px',
    backgroundColor: color ? color : null,
    display: 'flex',
    justifyContent: 'center',
    outline: 'none',
    cursor: 'pointer'
  }

  const smallStyle = {
    height: '100%',
    width: '100%',
    border: 0,
    borderRadius: '30px',
    width: '100%',
    padding: '5px 50px',
    backgroundColor: color ? color : null,
    display: 'flex',
    justifyContent: 'center',
    outline: 'none',
    cursor: 'pointer'
  }

  let clickButton = () => {}

  if (enabled) {
    clickButton = click
  }

  return (
    <div className={classes.Container} onClick={clickButton}>
      <button style={small ? smallStyle : style}>
        <p className={classes.ButtonText}>{title}</p>
      </button>
    </div>
  );
};

export default button;
