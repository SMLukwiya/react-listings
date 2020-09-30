import React, {useState, useEffect} from 'react';
import { Row, Col, Input } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import './create.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Background from '../../../components/common/Background';
import AnimatedButton from '../../../components/common/Button/Animated';
const defaultImage = require('../../../assets/default.png');

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {setShowPage(true)}, []);

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="createPage-"
      unmountOnExit>
      <div className='createPageContainer'>
        <Background />
        <Header color='#C1839F' />
        <Row className='createPageRow'>
          <Col span={4}>
            <Menu history={props.history} />
          </Col>
          <Col span={2} className='createPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={18} className='createPageCol'>
            <div className='createPageTitle'>describe your space</div>
            <Row>
              <Col span={12}>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>name/title</Col>
                  <Col className='createPageInputContainer'><input className='createPageInput'/></Col>
                </Row>
                <Row>
                  <div className='createPageEntryTitle'>description</div>
                  <div className='createPageInputContainer'><textarea row={10} className='createPageTextBox' /></div>
                </Row>
              </Col>
              <Col span={12}>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>images</Col>
                  <Col className='createPageImageContainer'>
                    {[1,2,3,4].map((item) => <img src={defaultImage} key={item} className='createPageImageInput' />)}
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className='createPageButtonContainer'>
              <Link to="/posting/howitworks/create/confirm">
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
