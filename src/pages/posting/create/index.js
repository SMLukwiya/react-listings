import React from 'react';
import { Row, Col, Input } from 'antd';
import {Link} from 'react-router-dom';

import classes from './create.module.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Button from '../../../components/common/Button';

const { TextArea } = Input;

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
        <div className={classes.Title}>describe your space</div>
        <Row>
          <Col span={12}>
            <Row className={classes.EntryRow}>
              <Col className={classes.EntryTitle}>name/title</Col>
              <Col className={classes.InputContainer}><input className={classes.Input}/></Col>
            </Row>
            <Row>
              <div className={classes.EntryTitle}>description</div>
              <div className={classes.InputContainer}><textarea row={10} className={classes.TextBox} /></div>
            </Row>
          </Col>
          <Col span={12}>
            <Row className={classes.EntryRow}>
              <Col className={classes.EntryTitle}>images</Col>
              <Col className={classes.ImageContainer}>
                {[1,2,3,4].map((item) => <div key={item} className={classes.ImageInput}/>)}
              </Col>
            </Row>
          </Col>
        </Row>
        <div className={classes.ButtonContainer}>
          <Link to="/posting/howitworks/create/confirm">
            <Button title='next' small color='#C1839F' />
          </Link>
        </div>
      </Col>
    </Row>
  </div>
)

export default Confirm;
