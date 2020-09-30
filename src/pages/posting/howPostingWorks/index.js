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
    entries: ['shared space', 'living space', 'event space', 'work space', 'show/exhibition space', 'live + work space']
  },
  {
    title: 'sell',
    entries: ['building', 'apartment', 'land']
  },
  {
    title: 'lease',
    entries: ['building', 'land']
  }
]

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {setShowPage(true)}, []);

  const Category = ({title, entries}) => (
    <Row className='howItWorksCategoryContainer'>
      <Col span={3} className='howItWorksCategoryTitle'>{title}</Col>
      <Col span={19}>
        <Row>
        {entries.map(entry => <div key={entry} className='howItWorksCategoryText'>{entry}</div>)}
        </Row>
      </Col>
    </Row>
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
          <Col span={4}>
            <Menu history={props.history} />
          </Col>
          <Col span={1} className='howItWorksBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={14} className='HowItWorksCol'>
            {/*<div className='Title'>how posting a Listing works</div>*/}
            {category.map(({title, entries}) => <Category key={title} title={title} entries={entries} /> )}
            <div className='howItWorksButtonContainer'>
              <Link to="/posting/howitworks/create">
                <AnimatedButton title='next' small color='#C1839F' />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}
export default Confirm;
