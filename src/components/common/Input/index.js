import React from 'react';

import classes from './input.module.css';

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.inputContainer];

  if (props.invalid && props.touched) {
    // inputClasses.push(classes.Invalid);s
  }

  switch(props.elementType) {
    case ('input'):
      inputElement = <input {...props.elementConfig} className={classes.Input} value={props.value} onChange={props.change} />;
      break;

    case ('textarea'):
      inputElement = <textarea {...props.elementConfig} row={10} className='createPageTextBox' value={props.value} onChange={props.change} />;
      break;

    default:
      inputElement = <input {...props.elementConfig} value={props.value} onChange={props.change} />;
  }

  return (
    <div className={inputClasses.join(' ')}>
      {inputElement}
    </div>
  );
}

export default Input;
