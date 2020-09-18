import React from 'react';
import { Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';

import classes from './footer.module.css';

const footerItems1 = [
  {name: 'sign in', link: ''},
  {name: 'how it works', link: ''},
  {name: 'about us', link: ''},
  {name: 'FAQs', link: ''},
  {name: 'contact', link: ''}
];

const footerItems2 = [
  {name: 'Post a Listing', link: ''},
  {name: 'Find a space', link: ''}
]

const Footer = () => (
  <div className={classes.Container}>
    <Row className={classes.FooterRow}>
      <Col span={24} className={classes.TitleCol}>
        <p className={classes.Title}>The Property Listings</p>
      </Col>
      <Col span={8}></Col>
      <Col span={8}>
        {footerItems1.map(({name, link}, i) => (
          <div key={i} className={classes.FooterItem}>
            <NavLink to={link}>{name}</NavLink>
          </div>
        ))}
      </Col>
      <Col span={8}>
      {footerItems2.map(({name, link}, i) => (
        <div key={i} className={classes.FooterItem}>
          <NavLink to={link}>{name}</NavLink>
        </div>
      ))}
      </Col>
    </Row>
    <hr className={classes.FooterDivider}/>
    <div className={classes.LowerContainer}>
      <span className={classes.LowerContent}>&#169;2020</span>
      <span className={classes.LowerContent}>All rights reserved</span>
    </div>
  </div>
)

export default Footer;
