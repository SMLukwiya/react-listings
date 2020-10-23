import React, {useState, useEffect} from 'react';
import { Row, Col, Select, Image } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import RICIBs from 'react-individual-character-input-boxes'

import './payment.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import AnimatedButton from '../../components/common/Button/Animated';
import Background from '../../components/common/Background';
import CustomArrow from '../../components/common/CustomArrow';
const { Option } = Select;

const paymentOptions = [
  {
    name: 'MTN',
    ussd: 'Dial *165*3#'
  },
  {
    name: 'AIRTEL',
    ussd: 'Dial *184*4*9#'
  }
]

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [state, setState] = useState({
      momo: false,
      bankcard: false,
      cardname: '',
      cardnumber: '',
      expiryDate: '',
      securityCode: '',
      message: ''
  })

  useEffect(() => {setShowPage(true)}, []);

  const onInputChange = ({target}) => {
    const { name, value } = target;
    setState({...state, [name]: value });
  }

  const handleChange = (value) => {
    if (value === 'momo') {
      setState({...state, momo: true, bankcard: false })
    }
     else {
      setState({...state, momo: false, bankcard: true })
    }
  }

  const confirmPaymentDetails = () => {
    props.history.push('/post/howitworks/create/confirm/payment/finish')
  }

  const merchantOutput = (value) => {
    console.log('Merchant', value)
  }

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="paymentPage-"
      unmountOnExit>
      <div className='paymentPageContainer'>
        <Background />
        <Header color='#C1839F' />
        <Row className='paymentPageRow'>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <Menu />
          </Col>

          <Col xs={1} sm={1} md={1} lg={1} xl={1} className='paymentPageBackButton'>
            <BackButton history={props.history} />
          </Col>

          <Col xs={19} sm={19} md={19} lg={19} xl={19} className='paymentPageConfirmCol'>
            <div className='paymentPageTitle'>manage payments</div>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Row className='paymentPageEntryRow'>
                  <Col className='choosePaymentTitle'>Choose Payment method</Col>
                  <Col className='paymentOptionContainer'>
                    <Select
                      style={{width: '100%', textAlign: 'center'}}
                      suffixIcon={<CustomArrow />}
                      onChange={handleChange}>
                      <Option value='momo' className='paymentOptionsText'>MoMo</Option>
                      <Option value='bankcard' className='paymentOptionsText'>Bank Card</Option>
                    </Select>
                  </Col>
                </Row>

                {state.bankcard && (
                  <Col xl={24} style={{display: 'flex'}}>
                    <div className='cardPaymentRow'>
                      <Row>
                        <Col className='choosePaymentTitle'>Name on Card</Col>
                        <Col className='paymentOptionContainer'><input onChange={onInputChange} className='createPageInput' value={state.cardname} name="cardname" /></Col>
                      </Row>
                      <Row>
                        <Col className='choosePaymentTitle'>Card Number</Col>
                        <Col className='paymentOptionContainer'><input onChange={onInputChange} className='createPageInput' value={state.cardnumber} name="cardnumber" /></Col>
                      </Row>
                    </div>
                    <div className='cardPaymentRow'>
                      <Row>
                        <Col className='choosePaymentTitle'>Expiry Date</Col>
                        <Col className='paymentOptionContainerRight'><input onChange={onInputChange} className='createPageInput' value={state.expiryDate} name="expiryDate"/></Col>
                      </Row>
                      <Row>
                        <Col className='choosePaymentTitle'>Security Code</Col>
                        <Col className='paymentOptionContainerRight'><input onChange={onInputChange} className='createPageInput' value={state.securityCode} name="securityCode"/></Col>
                      </Row>
                    </div>
                  </Col>
                )}

                {state.momo && (
                  <Col xl={24} style={{display: 'flex'}}>
                    <div className='momoPaymentRow'>
                      {paymentOptions.map(({name, ussd}, i) => (

                          <div className='momoPaymentDetailContainer' key={i}>
                            <div>
                              <p className='momoPaymentTitle'>{name}</p>
                            </div>
                            <div style={{width: '100%', height: '1px', backgroundColor: '#E2E2E1', marginTop: '-15px', marginBottom: '20px'}} />
                            <div>
                              <p className='momoTextStyle'>{ussd}</p>
                            </div>
                            <div className='merchantContainer'>
                              <p className='momoTextStyle'>Merchant Code</p>
                              <RICIBs
                                amount={5}
                                autoFocus={false}
                                handleOutputString={merchantOutput}
                                inputProps={Array(5).fill({ className: 'inputBoxes' })}
                                inputRegExp={/^[0-9]$/}
                              />
                            </div>
                            <p className='momoTextStyle'>Reason: Listings Fee</p>
                          </div>
                      ))}

                    </div>
                  </Col>
                )}
              </Col>
            </Row>

            <div className='paymentPageButtonContainer'>
              <span>
                <AnimatedButton title='next' small color='#C1839F' click={confirmPaymentDetails} enabled />
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
