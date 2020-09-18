import React from 'react';
import { Row, Col, Image } from 'antd';
import {Link} from 'react-router-dom';

import classes from './signin.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Input from '../../components/common/Input';

const arrow = require('../../assets/icons/arrow-white.png');

const Signin = (props) => (
  <div className={classes.Container}>
    <Header color='#00A8E8' />
    <Row className={classes.Row}>
      <Col span={4}>
        <Menu />
      </Col>
      <Col span={2} className={classes.BackButton}>
        <BackButton history={props.history} />
      </Col>
      <Col span={18} className={classes.SiginCol}>
        <div className={classes.SigninTitle}>Sign in</div>
        <div className={classes.SigninText}>You will receive our email with new listings every Friday</div>
        <div className={classes.SigninEmailText}>email</div>
        <div className={classes.InputContainer}>
          <Input />
        </div>
        <div className={classes.CreateAccount}>create account</div>
      </Col>
    </Row>
    <div className={classes.NextContainer}>
      <Link to="/confirm">
        <button className={classes.ButtonContainer}>
          <p className={classes.ButtonText}>next</p>
          <div className={classes.Arrow} />
          <Image preview={false} src={arrow} className={classes.Image} />
        </button>
      </Link>
    </div>
  </div>
)

export default Signin;
