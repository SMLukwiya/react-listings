import React from 'react';

import classes from './question.module.css'

const Question = ({question}) => (
  <div className={classes.Container}>
    <div className={classes.Title}>{question.title}</div>
    {question.questions.map((entry, i) => <div key={i} className={classes.Question}>{entry}</div>)}
    <hr />
  </div>
)

export default Question;
