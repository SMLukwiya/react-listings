import React from 'react';
import { Image } from 'antd';

import classes from './back.module.css';
const arrow = require('../../../assets/icons/arrow.svg');
const rectangle = require('../../../assets/icons/rectangle.png');

const backButton = ({history, click}) => {
  if (!click) {
    click = () => history.goBack()
  }
  
  return (
    <div className={classes.Container} onClick={click}>
      <Image src={arrow} preview={false} className={classes.ArrowImage} />
      <Image src={rectangle} preview={false} className={classes.RectangleImage} />
      <span className={classes.back} />
    </div>
  )
}

export default backButton;
