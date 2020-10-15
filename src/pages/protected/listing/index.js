import React, {useState, useEffect, useCallback} from 'react';
import { Row, Col, Checkbox } from 'antd';
import {Link, Route, Redirect} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';

import './listing.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Button from '../../../components/common/Button';
import Background from '../../../components/common/Background';
import { fetchsinglelisting } from '../../../store/actions';

const Listing = (props) => {
  const [showPage, setShowPage] = useState(false);
  const state = useSelector(state => state.listings);
  const { listings } = state;

  const dispatch = useDispatch();
  useEffect(() => {
    setShowPage(true)
  }, [React]);

  const fetchListing = useCallback(() => {
    if (listings.length) {
      listings.find(item => item.property_id === props.match.params.id)
    } else {
      dispatch(fetchsinglelisting(props.match.params.id, error => {
        if (error) return console.log(error);
      }))
      }
    }, [dispatch, props.match.params.id]);

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
            <div className='eachListingTitle'>Each Listing Page {props.match.params.id}</div>
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
