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
        <Header color='#C1839F' />
        <Row className='finishPageRow'>
          <Col span={4}>
            <Menu />
          </Col>
          <Col span={2} className='finishPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={18} className='finishPageConfirmCol'>
            <div className='finishPageTitle'>finish</div>
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
