import React, {useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import './congrats.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Background from '../../components/common/Background';
import Button from '../../components/common/Button';

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {setShowPage(true)}, []);

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="congratsPage-"
      unmountOnExit>
      <div className='congratsPageContainer'>
        <Background />
        <Header color='#00A8E8' />
        <Row className='congratsPageRow'>
          <Col span={4} style={{marginTop: '40px'}}>
            <Menu />
          </Col>
          <Col span={2} className='congratsPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={18} className='congratsPageCol'>
            <div className='congratsPageTitle'>Congratulations!</div>
            <div className='congratsPageText'>You are now on the list.</div>
            <div className='congratsPageButtonContainer'>
              <Link>
                <Button title="Find a space" small color="#00A8E8" />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
