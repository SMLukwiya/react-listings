import React, {useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import './posting.css';
import { choose_listing_type } from '../../../store/actions';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Input from '../../../components/common/Input';
import Background from '../../../components/common/Background';
import AnimatedButton from '../../../components/common/Button/Animated';

const category = [
  {
    title: 'rent',
    entries: [{name: 'shared space', value: 'sharedspace'}, {name: 'living space', value: 'livingspace'}, {name: 'event space', value: 'eventspace'}, {name: 'work space', value: 'workspace'}, {name: 'show/exhibition space', value: 'showexhibitionspace'}, {name: 'live/work space', value: 'liveworkspace'}]
  },
  {
    title: 'sale',
    entries: [{name: 'building', value: 'building'}, {name: 'apartment', value: 'apartment'}, {name:  'land', value: 'land'}]
  },
  {
    title: 'lease',
    entries: [{name: 'building', value: 'building'}, {name: 'land', value: 'land'}]
  }
]

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [state, setState] = useState({type: '', category: ''});
  const [onCategoryTitle, setOnCategoryTitle] = useState(false);
  const [onCategory, setOnCategory] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {setShowPage(true)}, []);

  const onCategorySelect = (index, title) => {
    setState({ ...state, type: title });

    setCookie('p-listings_listing_type', title, {path: '/'});
    setOnCategoryTitle(index);
    setOnCategory(index);
  }

  const onCloseCategory = () => {
    if (onCategory < 0) {
      props.history.goBack();
      return null;
    }
    setOnCategoryTitle(false);
    setOnCategory(-1);
  }

  const onChooseSpaceType = (value) => {
    setState({ ...state, category: value });

    setCookie('p-listings_started_posting', 'true', {path: '/'});
    setCookie('p-listings_listing_category', value, {path: '/'});
    dispatch(choose_listing_type(state.type, value))

    setTimeout(() => {
      props.history.push('/posting/howitworks/create')
    }, 300);
  }

  const CategoryTitle = ({title, index}) => (
    <CSSTransition
      in={onCategory < 0}
      timeout={800}
      classNames='categoryTitleAnimation-'
      unmountOnExit
      appear>
      <Col xs={7} sm={7} md={7} lg={7} xl={7}>
        <div className='howItWorksCategoryTitle' onClick={() => onCategorySelect(index, title)}>{title}</div>
      </Col>
    </CSSTransition>
  )

  const Category = ({entries, index}) => (
    <CSSTransition
      in={index === onCategoryTitle}
      timeout={800}
      classNames='categoryAnimation-'
      unmountOnExit
      appear>
    <Col span={20}>
      <Row>
        {entries.map(({name, value}) => <div key={value} className='howItWorksCategoryText' onClick={() => onChooseSpaceType(value)}>{name}</div>)}
      </Row>
    </Col>
    </CSSTransition>
  );

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="howItWorks-"
      unmountOnExit>
      <div className='howItWorksContainer'>
        <Background />
        <Header color='#C1839F' version='post' />
        <Row className='howItWorksRow'>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <Menu history={props.history} />
          </Col>
          <Col xs={1} sm={1} md={1} lg={1} xl={1} className='howItWorksBackButton'>
            <BackButton history={props.history} click={onCloseCategory} />
          </Col>
          <Col xs={18} sm={18} md={18} lg={18} xl={18} className='HowItWorksCol'>
            {<div className='howItWorksTitle'>choose how to List</div>}

            <Row className='howItWorksDupCategoryContainer'>
              <Col xs={7} sm={7} md={7} lg={7} xl={7} className={onCategory === 0 ? `rentStyle`: `rentStyleHide`}>
                <div className='howItWorksDupCategoryTitle' onClick={() => {}}>rent</div>
              </Col>
              <Col xs={7} sm={7} md={7} lg={7} xl={7} className={onCategory === 1 ? `saleStyle` : `saleStyleHide`}>
                <div className='howItWorksDupCategoryTitle' onClick={() => {}}>sale</div>
              </Col>
              <Col xs={7} sm={7} md={7} lg={7} xl={7} className={onCategory === 2 ? `leaseStyle` : `leaseStyleHide`}>
                <div className='howItWorksDupCategoryTitle' onClick={() => {}} style={{}}>lease</div>
              </Col>
            </Row>

            <Row className='howItWorksCategoryContainer'>
              {category.map(({title}, i) => <CategoryTitle key={title} title={title} index={i} />)}
            </Row>

            <Row className='howItWorksItemCategoryContainer'>
              {category.map(({entries}, i) => <Category key={i} entries={entries} index={i} /> )}
            </Row>

          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}
export default Confirm;
