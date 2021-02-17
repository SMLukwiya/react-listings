import React, {useState, useEffect, useCallback} from 'react';
import { Row, Col, Select, Image, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { makePayment, setPaymentDetails } from '../../../store/actions';

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
  const { payment_property_id, loading } = useSelector(state => state.listings);

  useEffect(() => {setShowPage(true)}, []);
  const dispatch = useDispatch();

  const onChangeWeeks = (value) => {
    setState({...state, numberOfWeeks: value, total: 50000 * value})
  }

  const onCheckOption = (e, type, rate) => {
    setState({...state, [type]: e.target.checked, checkedBefore: true, addition: {...state.addition, [type]: e.target.checked ? (state.total * rate/100) : 0 } })
  }

  const proceed = () => props.history.push('/post/howitworks/create/confirm/payment');
  let total = state.total + state.addition.emailFeatured + state.addition.webFeatured + state.addition.landingFeatured;

  const onConfirmListing = useCallback(() => {
      setPaymentDetails(null, total);

      setCookie(`p-listings_listings_total_${payment_property_id}`, total, {path: '/'});

      setTimeout(() => {
        props.history.push('/post/howitworks/create/confirm/payment')
      }, 1000)
    }, [dispatch]);

    // Initiate Payment
    const initiatePayment = useCallback(() => {
      dispatch(makePayment(15, total, (err, res) => {
        if (err) return console.log('Payment Error', err);

        console.log('Res',res);
      }))
    })

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
                <Button title='proceed to check out' small color='#C1839F' click={initiatePayment} enabled={true} />
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
