import React, {useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import './posting.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Background from '../../../components/common/Background';
import AnimatedButton from '../../../components/common/Button/Animated';

const category = [
  {
    title: 'rent',
    entries: [{value: 'shared space'}, {value: 'living space'}, {value: 'event space'}, {value: 'work space'}, {value: 'show/exhibition space'}, {value: 'live + work space'}]
  },
  {
    title: 'sale',
    entries: [{value: 'building'}, {value: 'apartment'}, {value: 'land'}]
  },
  {
    title: 'lease',
    entries: [{value: 'building'}, {value: 'land'}]
  }
]

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [onCategoryTitle, setOnCategoryTitle] = useState(false);
  const [onCategory, setOnCategory] = useState(-1);

  useEffect(() => {setShowPage(true)}, []);

  const onCategorySelect = (index) => {
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
    sessionStorage.setItem('listingsCategoryType', value)
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
        <div className='howItWorksCategoryTitle' onClick={() => onCategorySelect(index)}>{title}</div>
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
        {entries.map(({value}) => <div key={value} className='howItWorksCategoryText' onClick={() => onChooseSpaceType(value)}>{value}</div>)}
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
        <Header color='#C1839F' />
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
