import React from 'react';
import { Row, Col, Checkbox } from 'antd';
import {Link} from 'react-router-dom';

import classes from './finding.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Input from '../../components/common/Input';

const Confirm = (props) => (
  <div className={classes.Container}>
    <Header color='#00A8E8' />
    <Row className={classes.Row}>
      <Col span={4} style={{marginTop: '40px'}}>
        <Menu />
      </Col>
      <Col span={2} className={classes.BackButton}>
        <BackButton history={props.history} />
      </Col>
      <Col span={18} className={classes.FindingCol}>
        <div className={classes.Title}>Subscribe to Listings Project</div>
        <div className={classes.Text}>You will receive our email with new listings every Friday</div>
        <div className={classes.Email}>enter your email here</div>
        <div className={classes.InputContainer}>
          <Input />
        </div>
        <div className={classes.Text}>
          <Checkbox className={classes.Text}><span style={{color: '#00A8E8'}}>read</span> & I accept the Terms of Use and Privacy Policy</Checkbox>
        </div>
        <div className={classes.ButtonContainer}>
          <Link to="/finding/congrats">
            <button className={classes.Button}>
              <p className={classes.ButtonText}>subscribe</p>
            </button>
          </Link>
        </div>
      </Col>
    </Row>
  </div>
)

export default Confirm;
