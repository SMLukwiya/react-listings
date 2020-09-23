import React, {useState, useEffect} from 'react';
import { Row, Col, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import './finding.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Input from '../../components/common/Input';
import Background from '../../components/common/Background';
import Button from '../../components/common/Button';

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {setShowPage(true)}, []);

  return (
    <CSSTransition
      in={showPage}
      classNames="findingPage-"
      timeout={800}
      unmountOnExit>
      <div className='findingPageContainer'>
        <Background />
        <Header color='#00A8E8' />
        <Row className='findingPageRow'>
          <Col span={4} style={{marginTop: '40px'}}>
            <Menu />
          </Col>
          <Col span={2} className='findingPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={18} className='findingPageFindingCol'>
            <div className='findingPageTitle'>Subscribe to Listings Project</div>
            <div className='findingPageText'>You will receive our email with new listings every Friday</div>
            <div className='findingPageEmail'>enter your email here</div>
            <div className='findingPageInputContainer'>
              <Input />
            </div>
            <div className='findingPageText'>
              <Checkbox className='findingPageText'><span style={{color: '#00A8E8'}}>read</span> & I accept the Terms of Use and Privacy Policy</Checkbox>
            </div>
            <div className='findingPageButtonContainer'>
              <Link to="/finding/congrats">
                <Button small title="subscribe" color="#00A8E8" />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
