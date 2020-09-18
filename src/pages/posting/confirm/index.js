import React from 'react';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';

import classes from './confirm.module.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Button from '../../../components/common/Button';

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
        <div className={classes.Title}>confirm my listing</div>
        <div className={classes.TextContainer}>
          <p className={classes.Text}>see what its going to look like</p>
          <p className={classes.Text}>
            <Link to="/posting/howitworks/create">
              edit post
            </Link>
          </p>
        </div>
        <div className={classes.ButtonContainer}>
          <Link to="/post/howitworks/create/confirm/payment">
            <Button title='proceed to check out' small color='#C1839F' />
          </Link>
        </div>
      </Col>
    </Row>
  </div>
)

export default Confirm;
