import React from 'react';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';

import classes from './payment.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Button from '../../components/common/Button';

const Confirm = (props) => (
  <div className={classes.Container}>
    <Header color='#C1839F' />
    <Row className={classes.Row}>
      <Col span={4}>
        <Menu />
      </Col>
      <Col span={2} className={classes.BackButton}>
        <BackButton history={props.history} />
      </Col>
      <Col span={18} className={classes.ConfirmCol}>
        <div className={classes.Title}>manage payments</div>
        <div className={classes.ButtonContainer}>
          <Link to="/post/howitworks/create/confirm/payment/finish">
            <Button title='next' small color='#C1839F' />
          </Link>
        </div>
      </Col>
    </Row>
  </div>
)

export default Confirm;
