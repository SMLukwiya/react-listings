import React, {useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import { useSelector } from 'react-redux';

import './congrats.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Background from '../../components/common/Background';
import Button from '../../components/common/Button';

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);
  const user = useSelector(state => state.user)
  console.log(user.user);

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
            <Menu history={props.history} />
          </Col>
          <Col span={2} className='congratsPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={18} className='congratsPageCol'>
            <div className='congratsPageTitle'>Congratulations!</div>
            <div className='congratsPageText'>You are now on the list.</div>
            <div className='congratsPageButtonContainer'>
              <Link to="/getListings/listings">
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
