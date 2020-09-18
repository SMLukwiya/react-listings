import React from 'react';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';

import classes from './congrats.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';

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
      <Col span={18} className={classes.CongratsCol}>
        <div className={classes.Title}>Congratulations!</div>
        <div className={classes.Text}>You are now on the list.</div>
        <div className={classes.ButtonContainer}>
          <Link>
            <button className={classes.Button}>
              <p className={classes.ButtonText}>Find a space</p>
            </button>
          </Link>
        </div>
      </Col>
    </Row>
  </div>
)

export default Confirm;
