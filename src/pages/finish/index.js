import React from 'react';
import { Row, Col, Checkbox } from 'antd';
import {Link} from 'react-router-dom';

import classes from './finish.module.css';
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
        <div className={classes.Title}>finish</div>
        <div className={classes.TextContainer}>
          <Checkbox className={classes.Text}>& I accept the Terms of Use and Privacy Policy</Checkbox>
        </div>
        <div className={classes.ButtonContainer}>
          <Link to="/post/howitworks/create/confirm/payment">
            <Button title='all done' small color='#C1839F' />
          </Link>
        </div>
      </Col>
    </Row>
  </div>
)

export default Confirm;
