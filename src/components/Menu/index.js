import React from 'react';
import { Link } from 'react-router-dom';

import classes from './menu.module.css';

const Menu = (props) => (
  <div className={classes.Container}>
    <div className={classes.Link}>
      <Link to="/signin">sign in</Link>
    </div>
    <div className={classes.Link}>
      <Link to="" onClick={(e) => props.click(e)(props.howitworksRef)}>how it works</Link>
    </div>
    <div className={classes.Link}>
      <Link to="" onClick={(e) => props.click(e)(props.aboutRef)}>about us</Link>
    </div>
    <div className={classes.Link}><Link to="/faqs">FAQs</Link></div>
    <div className={classes.Link}><Link to="/contact">contact</Link></div>
  </div>
)

export default Menu;
