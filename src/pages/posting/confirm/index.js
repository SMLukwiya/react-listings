import React, {useState, useEffect, useCallback} from 'react';
import { Row, Col, Select, Image, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { postlisting } from '../../../store/actions';

import './confirm.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Button from '../../../components/common/Button';
import Background from '../../../components/common/Background';
const dropdownArrow = require('../../../assets/icons/arrow.svg');
const { Option } = Select;

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [state, setState] = useState({ numberOfWeeks: 1, total: 50000, emailFeatured: false, webFeatured: false, landingFeatured: false, addition: { emailFeatured: 0, webFeatured: 0, landingFeatured: 0 }, checkedBefore: false })

  useEffect(() => {setShowPage(true)}, []);
  const dispatch = useDispatch();

  const onChangeWeeks = (value) => {
    setState({...state, numberOfWeeks: value, total: 50000 * value})
  }

  const onCheckOption = (e, type, rate) => {
    setState({...state, [type]: e.target.checked, checkedBefore: true, addition: {...state.addition, [type]: e.target.checked ? (state.total * rate/100) : 0 } })
  }

  const proceed = () => props.history.push('/post/howitworks/create/confirm/payment');

  const onConfirmListing = useCallback(() => {
    dispatch(postlisting((error) => {
      if(error) return console.log('Error', error);

      sessionStorage.setItem('listingsTotal', state.total + state.addition.emailFeatured + state.addition.webFeatured + state.addition.landingFeatured);

      setTimeout(() => {
        props.history.push('/post/howitworks/create/confirm/payment')
      }, 1000)
    }))
  }, [dispatch]);

  const customArrow = () => (
    <div style={{ marginTop: '-10px', marginLeft: '-10px',height: '20px', width: '20px', backgroundColor: ''}}>
      <Image preview={false} src={dropdownArrow} height="100%" width="100%" style={{transform: `rotate(-90deg)`}}/>
    </div>
  )

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="confirmPost-"
      unmountOnExit>
      <div className='confirmPostContainer'>
        <Background />
        <Header color='#C1839F' />
        <Row className='confirmPostRow'>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <Menu history={props.history} />
          </Col>
          <Col xs={1} sm={1} md={1} lg={1} xl={1} className='confirmPostBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col xs={19} sm={19} md={19} lg={19} xl={19} className='confirmPostCol'>
            <div className='confirmPostTitle'>confirm my listing</div>
            <div className='confirmPostContentContainer'>
              <div className='confirmPostTextContainer'>
                <p className='confirmPostText'>see what its going to look like</p>
                <p className='confirmPostText'>
                  <Link to="/posting/howitworks/create">
                    edit post
                  </Link>
                </p>
              </div>
              <div className='invoiceContainer'>
                <p className='invoiceTitle'>INVOICE</p>
                <div className='invoiceDivider' />
                <div className='invoiceTextContainer'>
                  <p className='invoiceText'>Weekly Listing</p>
                  <p className='invoiceText'>UGX 50,000</p>
                </div>
                <div className='invoiceTextContainer'>
                  <p className='invoiceText'>Number of weeks</p>
                  <Select
                    defaultValue={state.numberOfWeeks}
                    onChange={onChangeWeeks}
                    suffixIcon={customArrow}
                    style={{width: '65px'}}
                    >
                    {[1,2,3,4,5].map((item, i) => <Option value={item}>{item}</Option>)}
                  </Select>
                </div>
                <p className='invoiceTitle'>Feature Listing</p>
                <div className='invoiceDivider' />
                {[{name: 'Email Inbox', rate: 20}, {name: 'Web Page', rate: 10}, {name: 'Landing', rate: 30}].map(({name, rate}) => (
                  <div className='invoiceTextContainer'>
                    <Checkbox onChange={(e) => onCheckOption(e, `${name.split(' ')[0].toLowerCase()}Featured`, rate)} style={{fontFamily: 'ITCAvantGardeNormal', color: '#403D39', fontSize: '12px'}}>{name}</Checkbox>
                    <p className='invoiceText'>+{rate}%</p>
                  </div>
                ))}
              <div className='invoiceDivider' />
              <div className='invoiceTextContainer'>
                <p className='invoiceTotal'>TOTAL</p>
                <p className='invoiceTotal'>UGX {state.total + state.addition.emailFeatured + state.addition.webFeatured + state.addition.landingFeatured}</p>
              </div>
              </div>
            </div>
            <div className='confirmPostButtonContainer'>
              <span to="/post/howitworks/create/confirm/payment">
                <Button title='proceed to check out' small color='#C1839F' click={proceed} enabled />
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
