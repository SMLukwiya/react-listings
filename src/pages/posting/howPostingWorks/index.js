import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import classes from './posting.module.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Button from '../../../components/common/Button';

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

  const Category = ({title, entries}) => (
    <Row className={classes.CategoryContainer}>
      <Col span={3} className={classes.CategoryTitle}>{title}</Col>
      <Col span={19}>
        <Row>
        {entries.map(entry => <div key={entry} className={classes.CategoryText}>{entry}</div>)}
        </Row>
      </Col>
    </Row>
  );

  return (
    <div className={classes.Container}>
      <Header color='#C1839F' />
      <Row className={classes.Row}>
        <Col span={4}>
          <Menu />
        </Col>
        <Col span={1} className={classes.BackButton}>
          <BackButton history={props.history} />
        </Col>
        <Col span={14} className={classes.HowItWorksCol}>
          <div className={classes.Title}>how posting a Listing works</div>
          {category.map(({title, entries}) => <Category key={title} title={title} entries={entries} /> )}
          <div className={classes.ButtonContainer}>
            <Link to="/posting/howitworks/create">
              <Button title='next' small color='#C1839F' />
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default Confirm;
