import React from 'react';
import { Row, Col } from 'antd';

import classes from './confirm.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';

const Confirm = (props) => (
  <div className={classes.Container}>
    <Header color='#00A8E8' />
    <Row className={classes.Row}>
      <Col span={4}>
        <Menu />
      </Col>
      <Col span={2} className={classes.BackButton}>
        <BackButton history={props.history} />
      </Col>
      <Col span={18} className={classes.ConfirmCol}>
        <div className={classes.ConfirmText}>We just sent you an email with a link to sign in to:<br/>.........................@gmail.com</div>
        <div className={classes.ResendContainer}>
          <div className={classes.ResendText}>Didn't get the link?</div>
          <button className={classes.ButtonContainer}>
            <p className={classes.ButtonText}>resend link</p>
          </button>
        </div>
      </Col>
    </Row>
  </div>
)

export default Confirm;
