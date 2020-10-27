import React, {useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import {CSSTransition} from 'react-transition-group';

import './confirm.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Button from '../../components/common/Button';
import Background from '../../components/common/Background';

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {setShowPage(true)}, []);

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="confirmPage-"
      unmountOnExit>
      <div className='confirmPageContainer'>
        <Background />
        <Header color='#00A8E8' />
        <Row className='confirmPageRow'>
          <Col span={4}>
            <Menu history={props.history} />
          </Col>
          <Col span={2} className='confirmPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={18} className='confirmPageCol'>
            <div className='ConfirmText'>We just sent you an email with a link to sign in to:<br/>.........................@gmail.com</div>
            <div className='confirmPageResendContainer'>
              <div className='confirmPageResendText'>Didn't get the link?</div>
              <div className='confirmPageButtonContainer'>
                <Button title="resend link" color='#00A8E8' small />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
