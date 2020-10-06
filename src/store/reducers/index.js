import { combineReducers } from 'redux';
import user from './users';
import listings from './listings';

export default combineReducers({
  user,
  listings
});
