import React from 'react';
import { Row, Col, Image } from 'antd';
import { Link } from 'react-router-dom';

import LOGO from '../../assets/LOGO.svg';
import classes from './header.module.css';

const Header = ({color}) => {
  const style = {
    marginRight: '5%',
    marginTop: '40px',
    marginBottom: '-40px',
    fontSize: '40px',
    fontFamily: 'ITCAvantGardeStdBold',
    color: color ? color : null
  }

  return(
    <div className={classes.Container}>
      <Link to="/" className={classes.Image}>
        <Image src={LOGO} preview={false} />
      </Link>
      <h1 style={style}>The Property Listings</h1>
    </div>
  );
}
export default Header;
