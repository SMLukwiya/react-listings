import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from './store/reducers';

// Main App
import Main from './main';

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App(props) {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
