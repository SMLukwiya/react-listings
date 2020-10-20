import React, {useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import {Link, Redirect, Route} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import { useSelector } from 'react-redux';

import './regions.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Background from '../../../components/common/Background';
import Button from '../../../components/common/Button';

const Regions = (props) => {
  const [showPage, setShowPage] = useState(false);
  const user = useSelector(state => state.user)
  console.log(user.user);

  useEffect(() => {setShowPage(true)}, []);

  const onSelectRegion = (id) => {
    props.history.push('/getlistings/listings')
  }

  const Region = ({region, total}) => (
    <Col xs={5} sm={5} md={5} lg={5} xl={5} className='regionContainerStyle' onClick={onSelectRegion}>
      <p className='regionTitle'>{region}</p>
      <p className='regionTotal'>{total}</p>
    </Col>
  );

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="regionsPage-"
      unmountOnExit
      >
      <div className='regionsPageContainer'>
        <Background />
        <Header color='#00A8E8' />
        <Row className='regionsPageRow'>
          <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{marginTop: '40px'}}>
            <Menu />
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} xl={2} className='regionsPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col xs={16} sm={16} md={16} lg={16} xl={16} className='regionsPageCol'>
            <div className='regionsHeader'>
              <div className='regionsPageTitle'>Select A Region</div>
              <div className='regionsPageNumber'>589 spaces</div>
            </div>
            <Row  style={{marginTop: '40px', display: 'flex', justifyContent: 'center'}}>
              {Array(16).fill({name: 'Kawempe', total: 53}).map(({name, total}, index) => <Region key={index} region={name.toUpperCase()} total={total} />)}
            </Row>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

const RegionsProtected = ({isUserAuthenticated, ...rest}) => {
  return (
    <Route {...rest}
      render={props => isUserAuthenticated ? <Regions {...props} /> : <Redirect to='/finish' />}
    />
  )
}

export default RegionsProtected;
