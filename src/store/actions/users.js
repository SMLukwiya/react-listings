import {axiosInstance} from '../../main';

import {
  SUBSCRIBE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAILED,
  SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILED,
  SIGNUP, SIGNUP_SUCCESSFUL, SIGNUP_FAILED,
  AUTOLOGIN
} from './types';

export const subscribe = ({email}, callback) => {
  return dispatch => {
    dispatch({ type: SUBSCRIBE });

    return axiosInstance.post('subscribers', {
        email: email
        })
        .then(response => {
          console.log(response)
          const { data: { access_token }} = response;

          dispatch({
            type: SUBSCRIBE_SUCCESS,
            payload: {
              api_token: access_token
            }
          });

          callback();
        })
        .catch(err => {
          console.log(err.response)
          let errorResponse = 'Something went wrong';
          if (err.response && err.response.data) {
            const { response: { data: { errors } } } = err;
            console.log(errors)
            errorResponse = errors.email[0]
          }

          dispatch({
            type: SUBSCRIBE_FAILED,
            payload: errorResponse
          });

          callback(errorResponse);
        })
  }
}

export const signin = (email, password, callback) => {
  return dispatch => {
    dispatch({ type: SIGNIN });

    return axiosInstance.post('login', {
      email: email,
      password: password
    })
    .then(response => {
      console.log(response);
      const {data: {token}} = response;

      dispatch({
        type: SIGNIN_SUCCESS,
        payload: {
          token,
          user_role: 'Lister'
        }
      });

      callback()
    })
    .catch(err => {
      let errorResponse = 'Something went wrong';

      if (err.response && err.response.data) {
        const { response: { data: { message } } } = err;
        errorResponse = message
      }

      dispatch({
        type: SIGNIN_FAILED,
        payload: errorResponse
      });

      callback(errorResponse);
    })
  }
}

export const signup = (email, password, confirmPassword, callback) => {
  return dispatch => {
    dispatch({ type: SIGNUP });

    return axiosInstance.post('register', {
      name: 'Lister',
      email: email,
      password: password,
      password_confirmation: password
    })
    .then(response => {
      console.log(response);
      const {data: {token}} = response;

      dispatch({
        type: SIGNUP_SUCCESSFUL,
        payload: {
          token,
          user_role: 'Lister',
        }
      });

      callback();
    })
    .catch(err => {
      let errorResponse = ''
      const { response: { data: { errors } } } = err;
      console.log(errors)
      errorResponse = errors ? errors[0] : 'Something went wrong'

      dispatch({
        type: SIGNUP_FAILED,
        payload: errorResponse
      });

      callback(errorResponse);
    })
  }
}

export const autoLogin = (email, pass) => {
  return dispatch => {
    return axiosInstance.post('login', {
      email: email,
      password: pass
    })
    .then(response => {
      const {data: {token}} = response;

      dispatch({
        type: SIGNUP_SUCCESSFUL,
        payload: {
          token,
          user_role: 'Lister',
        }
      });
    })
    .catch(err => {
      return;
    })
  }
}
