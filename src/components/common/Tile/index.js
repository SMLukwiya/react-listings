import React from 'react';
import { Image } from 'antd';

import classes from './tile.module.css';

const Tile = ({title, image, description, space}) => (
  <div className={classes.Container}>
    <div className={classes.TitleContainer}>
      <p className={classes.Title}>{title}</p>
      <Image src={image} className={classes.Icon}/>
    </div>
    {space ? <div style={{height: '100px'}}></div> : <React.Fragment />}
    <p className={classes.Description}>{description}</p>
  </div>
)

export default Tile;
