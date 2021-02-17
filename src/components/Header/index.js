import React from 'react';
import { Row, Col, Image } from 'antd';
import { Link } from 'react-router-dom';

import LOGO from '../../assets/LOGO.svg';
import LOGOBLUE from '../../assets/LOGO_blue.png';
import LOGOPINK from '../../assets/LOGO_pink.png';

import classes from './header.module.css';

const Header = ({color, fontSize, center, version}) => {
  const date = new Date();
  const style = {
    marginRight: center ? 0 : '5%',
    marginTop: center ? 0 : '40px',
    marginBottom: center ? null : '-40px',
    fontSize: fontSize ? fontSize : '40px',
    fontFamily: 'ITCAvantGardeStdBold',
    color: color ? color : null
  }

  return(
    <div className={classes.Container}>
      <Link to="/" className={classes.Image}>
        <Image src={version === 'find' ? LOGOBLUE : version === 'post' ? LOGOPINK : LOGO} preview={false} />
      </Link>
      {!center ? <h1 style={style}>The Property Listings</h1> :
      <div style={{display: 'flex', alignItems: 'center', marginRight: '30px'}}>
        <h1 style={style}>The Property Listings</h1>
        <div style={{width: '2px', height: '25px', backgroundColor: '#000', margin: '0 12px'}}/>
        <p style={{fontSize: '10px', fontFamily: 'ITCAvantGardeNormal'}}>Week of {date.toLocaleString('default', {month: 'short'})} {date.getDate()}, {date.getFullYear()}</p>
      </div>
      }

    </div>
  );
}
export default Header;
