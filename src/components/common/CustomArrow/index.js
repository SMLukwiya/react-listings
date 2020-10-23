import React from 'react';
import { Image } from 'antd';

const dropdownArrow = require('../../../assets/icons/arrow.svg');

export default () => (
  <div style={{ marginTop: '-10px', marginLeft: '-10px',height: '20px', width: '20px', backgroundColor: ''}}>
    <Image preview={false} src={dropdownArrow} height="100%" width="100%" style={{transform: `rotate(-90deg)`}}/>
  </div>
);
