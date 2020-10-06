import axios from 'axios';

import { SUBSCRIBE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAILED, SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILED } from './types';

export const subscribe = ({email}, callback) => {
  return dispatch => {
    dispatch({ type: SUBSCRIBE });
    console.log(email)
    return axios.post('https://listings.dsnibro.com/api/v1/api_users', {
        email: email
        })
        .then(response => {
          console.log(response)
          const { data: { data: { api_token, user_role } }} = response;

          dispatch({
            type: SUBSCRIBE_SUCCESS,
            payload: {
              token: api_token,
              userrole: user_role
            }
          });

          callback();
        })
        .catch(err => {
          dispatch({
            type: SUBSCRIBE_FAILED
          })
          console.log(err)

          const { response: { data: { errors } } } = err;
          console.log(errors)

          callback(errors.email[0]);
        })
  }
}
