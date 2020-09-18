import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// fonts
import './assets/fonts/ITCAvantGardeStdBk.otf';
import './assets/fonts/ITCAvantGardeStdBold.otf';
import './assets/fonts/ITCAvantGardeStdBoldObl.otf';
import './assets/fonts/ITCAvantGardeStdMd.otf';
import './assets/fonts/ITCAvantGardeStdMdObl.otf';
import './assets/fonts/ITCAvantGardeStdXLt.otf';
import './assets/fonts/ITCAvantGardeStdXLtObl.otf';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
