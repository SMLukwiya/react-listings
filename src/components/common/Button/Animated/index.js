import React from 'react';
import {Image} from 'antd';

import './animate.css';

const arrow = require('../../../../assets/icons/right-chevron-white.png');

const button = ({title, color, click, enabled}) => {
  const style = {
    backgroundColor: color ? color : null
  }

  let clickButton = () => {}

  if (enabled) {
    clickButton = click;
  }

  return (
      <button style={style} className='animatedButtonContainer' onClick={clickButton}>
        <p className='animatedButtonText'>{title}</p>
        <div className='animatedSlide' />
        <Image preview={false} src={arrow} className='animatedImage' />
      </button>
  );
};

export default button;
