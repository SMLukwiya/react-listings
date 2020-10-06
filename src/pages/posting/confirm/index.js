import React, {useState, useEffect, useCallback} from 'react';
import { Row, Col } from 'antd';
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

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {setShowPage(true)}, []);
  const dispatch = useDispatch();

  const onConfirmListing = useCallback(() => {
    dispatch(postlisting((error) => {
      if(error) return console.log('Error', error);

      setTimeout(() => {
        props.history.push('/post/howitworks/create/confirm/payment')
      }, 1000)
    }))
  }, [dispatch])

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
          <Col span={4}>
            <Menu history={props.history} />
          </Col>
          <Col span={2} className='confirmPostBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={18} className='confirmPostCol'>
            <div className='confirmPostTitle'>confirm my listing</div>
            <div className='confirmPostTextContainer'>
              <p className='confirmPostText'>see what its going to look like</p>
              <p className='confirmPostText'>
                <Link to="/posting/howitworks/create">
                  edit post
                </Link>
              </p>
            </div>
            <div className='confirmPostButtonContainer'>
              <span to="/post/howitworks/create/confirm/payment">
                <Button title='proceed to check out' small color='#C1839F' click={onConfirmListing} enabled />
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
