import axios from 'axios';

import { SUBSCRIBE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAILED, SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILED } from './types';

export const subscribe = (data, callback) => {
  return dispatch => {
    dispatch({ type: SUBSCRIBE });
    console.log(data)
    return axios.post('https://listings.dsnibro.com/api/v1/api_users', {
        email: data.email
        })
        .then(response => {
          console.log(response)
          const { data: { data: { data } }} = response;

          dispatch({
            type: SUBSCRIBE_SUCCESS,
            payload: {
              token: data.api_token,
              userrole: data. user_role
            }
          });

          callback(null);
        })
        .catch(err => {
          dispatch({
            type: SUBSCRIBE_FAILED
          })

          const { response: { data: { errors } } } = err;
          console.log(errors)

          callback(errors.email[0]);
        })
  }
}
