import React from 'react';
import {Image} from 'antd';

import './animate.css';

const arrow = require('../../../../assets/icons/right-chevron-white.png');

const button = ({title, color, click}) => {
  const style = {
    backgroundColor: color ? color : null
  }

  return (
      <button style={style} className='animatedButtonContainer'>
        <p className='animatedButtonText'>{title}</p>
        <div className='animatedSlide' />
        <Image preview={false} src={arrow} className='animatedImage' />
      </button>
  );
};

export default button;
