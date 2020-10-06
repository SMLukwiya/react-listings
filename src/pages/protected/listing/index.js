import React, {useState, useEffect} from 'react';
import { Row, Col, Checkbox } from 'antd';
import {Link, Route, Redirect} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import './listing.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Button from '../../../components/common/Button';
import Background from '../../../components/common/Background';

const Listing = (props) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setShowPage(true)
  }, [React])

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="eachListing-"
      unmountOnExit>
      <div className='eachListingContainer'>
        <Background />
        <Header color='#C1839F' />
        <Row className='eachListingRow'>
          <Col span={4} xl={4} lg={4} md={4} sm={4} xs={4}>
            <Menu />
          </Col>
          <Col xl={2} lg={2} md={2} sm={2} xs={2} className='eachListingBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col xl={18} lg={18} md={18} sm={18} xs={18} className='eachListingConfirmCol'>
            <div className='eachListingTitle'>Each Listing Page</div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

const ListingProtected = ({isUserAuthenticated, ...rest}) => {
  return (
    <Route {...rest}
      render={props => isUserAuthenticated ? <Listing {...props} /> : <Redirect to='/signin' />}
    />
  );
}

export default ListingProtected;
