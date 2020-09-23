import React, {useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import './payment.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import AnimatedButton from '../../components/common/Button/Animated';
import Background from '../../components/common/Background';

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {setShowPage(true)}, []);

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="paymentPage-"
      unmountOnExit>
      <div className='paymentPageContainer'>
        <Background />
        <Header color='#C1839F' />
        <Row className='paymentPageRow'>
          <Col span={4}>
            <Menu />
          </Col>
          <Col span={2} className='paymentPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={18} className='paymentPageConfirmCol'>
            <div className='paymentPageTitle'>manage payments</div>
            <div className='paymentPageButtonContainer'>
              <Link to="/post/howitworks/create/confirm/payment/finish">
                <AnimatedButton title='next' small color='#C1839F' />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
