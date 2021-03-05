import React, {useState, useEffect, useCallback} from 'react';
import { Row, Col, Select, Image, Checkbox, Modal, Input, Spin } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { makePayment, setPaymentDetails, checkPaymentStatus } from '../../../store/actions';
import axios from 'axios';

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
  const [ cookies, setCookie] = useCookies();
  const [state, setState] = useState({ numberOfWeeks: 1, total: 50000, emailFeatured: false, webFeatured: false, landingFeatured: false, addition: { emailFeatured: 0, webFeatured: 0, landingFeatured: 0 }, checkedBefore: false, message: '' })
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const { payment_property_id, loading } = useSelector(state => state.listings);
  const listings = useSelector(state => state.listings);

  useEffect(() => {setShowPage(true)}, []);
  const dispatch = useDispatch();

  const onChangeWeeks = (value) => {
    setState({...state, numberOfWeeks: value, total: 50000 * value})
  }

  const onCheckOption = (e, type, rate) => {
    setState({...state, [type]: e.target.checked, checkedBefore: true, addition: {...state.addition, [type]: e.target.checked ? (state.total * rate/100) : 0 } })
  }

  const onchangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangeFirstname = (e) => {
    setFirstname(e.target.value)
  }

  const onChangeLastname = (e) => {
    setLastname(e.target.value)
  }

  const switchPaymentModal = () => {
    setModalVisible(!modalVisible)
  }

  const proceed = () => props.history.push('/post/howitworks/create/confirm/payment');
  let total = state.total + state.addition.emailFeatured + state.addition.webFeatured + state.addition.landingFeatured;

  const onConfirmListing = () => {
    switchPaymentModal();
    dispatch(makePayment());
  };

  const onCheckPaymentStatus = () => {
    dispatch(checkPaymentStatus(payment_property_id, (err, response) => {
      if (err) {
        return console.log(err)
      } else {
        console.log(response)
        proceed();
      }
    }))
  }

  setInterval(onCheckPaymentStatus, 50000)

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
        <Header color='#C1839F' version='post' />
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
                    {[1,2,3,4,5].map((item, i) => <Option key={i} value={item}>{item}</Option>)}
                  </Select>
                </div>
                <p className='invoiceTitle'>Feature Listing</p>
                <div className='invoiceDivider' />
                {[{name: 'Email Inbox', rate: 20}, {name: 'Web Page', rate: 10}, {name: 'Landing', rate: 30}].map(({name, rate}) => (
                  <div className='invoiceTextContainer' key={name}>
                    <Checkbox onChange={(e) => onCheckOption(e, `${name.split(' ')[0].toLowerCase()}Featured`, rate)} style={{fontFamily: 'ITCAvantGardeNormal', color: '#403D39', fontSize: '12px'}}>{name}</Checkbox>
                    <p className='invoiceText'>+{rate}%</p>
                  </div>
                ))}
              <div className='invoiceDivider' />
              <div className='invoiceTextContainer'>
                <p className='invoiceTotal'>TOTAL</p>
                <p className='invoiceTotal'>UGX {total}</p>
              </div>
              </div>
            </div>
            <div className='confirmPostButtonContainer'>
              <Spin tip='loading..' spinning={listings.loading}>
                <Button title='proceed to check out' small color='#C1839F' click={switchPaymentModal} enabled={true} />
              </Spin>
            </div>
          </Col>
        </Row>
        <Modal
          title='Enter your Details'
          visible={modalVisible}
          footer={null}
          onCancel={switchPaymentModal}
          bodyStyle={{display: 'flex', alignItems:'center', justifyContent: 'center', width: '100%'}}
          >
          <form method="POST" action="https://listings.ubunifu.systems/pay" target="_blank" onSubmit={onConfirmListing}>
            <input type="hidden" name="_token" value="mUO5oiC43hDmLOju2bBEY4EMJJSeKcE7nitXAZT7" />
              <div className="inputContainer">
                  <label className='inputLabel'>email address</label>
                  <input type="email" onChange={onchangeEmail} className="inputStyle" name="email" id="email" placeholder="Enter email" value={email} required />
              </div>
              <div className="inputContainer">
                  <label className='inputLabel'>first Name</label>
                  <input type="text" onChange={onChangeFirstname} className="inputStyle" id="firstname" name="firstname" placeholder="Enter first name" value={firstname} required />
              </div>
              <div className="inputContainer">
                  <label className='inputLabel'>last Name</label>
                  <input type="text" onChange={onChangeLastname} className="inputStyle" id="lastname" name="lastname" placeholder="Enter last name" value={lastname} required />
              </div>
              <input type="hidden" name="payment_method" value="both" />
              <input type="hidden" name="currency" value="UGX" />

              <input type="hidden" name="country" value="UG" />
              <input type="hidden" name="amount" value={total} />
              <input type="hidden" name="listings_id" value={payment_property_id} />
              <input type="hidden" name="description" value={`Payment for the listing ${payment_property_id}`} />
              <button type="submit" className='paymentButton'>Checkout and Pay</button>
          </form>
        </Modal>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
