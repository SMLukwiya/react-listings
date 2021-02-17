import React, {useState, useEffect} from 'react';
import { Row, Col, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import './finish.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Button from '../../components/common/Button';
import Background from '../../components/common/Background';

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setShowPage(true)
  }, [])

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="finishPage-"
      unmountOnExit>
      <div className='finishPageContainer'>
        <Background />
        <Header color='#C1839F' version='post' />
        <Row className='finishPageRow'>
          <Col span={4}>
            <Menu history={props.history} />
          </Col>
          <Col span={2} className='finishPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={18} className='finishPageConfirmCol'>
            <div className='finishPageTitle'>Your Payment is Complete</div>
            <div className='finishPageVerificationContainer'>
              <p className='finishPageText'>Verification Code</p>
              <p className='finishPageVerificationCode'>dgrtfbcv4dfs5gd9701fb8re46db861664g</p>
            </div>
            <div className='finishPageViewReceiptContainer'>
              <button className='finishPageViewReceiptText'>View Receipt</button>
            </div>
            <div className='finishPageTextContainer'>
              <Checkbox className='finishPageText'>& I accept the Terms of Use and Privacy Policy</Checkbox>
            </div>
            <div className='finishPageButtonContainer'>
              <Link>
                <Button title='all done' small color='#C1839F' />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
