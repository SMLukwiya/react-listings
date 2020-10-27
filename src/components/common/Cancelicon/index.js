import React from 'react';
import { Image } from 'antd';

import './cancelicon.css';
const arrow_white = require('../../../assets/icons/arrow-white.svg');
const cancel_white = require('../../../assets/icons/cancel-white.png');
const arrow = require('../../../assets/icons/arrow.svg');
const cancel = require('../../../assets/icons/cancel.png');


const CancelIcon = ({click, white}) => (
  <div className='cancelIconClose' onClick={click}>
    <Image preview={false} src={white ? arrow_white : arrow} className='cancelIconArrow1' />
    <Image preview={false} src={white ? cancel_white : cancel} className='cancelIcon' />
    <Image preview={false} src={white ? arrow_white : arrow} className='cancelIconArrow2' />
  </div>
)

export default CancelIcon;
