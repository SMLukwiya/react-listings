import {axiosInstance} from '../../main';
import {store} from '../../App';
import { v4 as uuidv4 } from 'uuid';

import {
  CHOOSELISTING_TYPE, CHOOSELISTING,
  UPLOADLISTING, UPLOADLISTING_SUCCESS, UPLOADLISTING_FAILED,
  FETCHLISTINGS, FETCHLISTINGS_SUCCESS, FETCHLISTINGS_FAILED,
  FETCHLISTING, FETCHLISTING_SUCCESS, FETCHLISTING_FAILED,
  SETPAYMENTTOTAL,
  PAYMENT,
  PAYMENT_SUCCESSFUL,
  PAYMENT_FAILED
} from './types';

export const choose_listing_type = (type, category) => {
  return {
    type: CHOOSELISTING_TYPE,
    payload: {
      type: type,
      category: category
    }
  }
}

export const setPaymentDetails = (property_id, total) => {
  return {
    type: SETPAYMENTTOTAL,
    payload: {
      property_id: property_id,
      total: total
    }
  }
}

export const choose_listing = (title, aboutspace, region, location, amount, rate, availability, aboutyou, rentalrequirements, images) => {
  return {
    type: CHOOSELISTING,
    payload: {
        title: title,
        description: aboutspace,
        region: region,
        location: location,
        amount: amount,
        rate: rate,
        availability: availability,
        about_lister: aboutyou,
        rentalrequirements: rentalrequirements,
        images: images
    }
  }
}

export const postlisting = (title, aboutspace, region, location, amount, rate, availability, aboutyou, rentalrequirements, contact, images, callback) => {
  return dispatch => {
    dispatch({ type: UPLOADLISTING });

    const listingsData = store.getState().listings;
    const userData = store.getState().user;
    const { user: { token }} = userData;
    const { listing: { type, category }} = listingsData;
    console.log('Cat', category)

    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', aboutspace)
    formData.append('about_space', aboutspace)
    formData.append('region', region)
    formData.append('location', location)
    formData.append('amount', amount)
    formData.append('type', type)
    formData.append('category', category)
    formData.append('rate', rate)
    formData.append('about_lister', aboutyou)
    formData.append('status', 'pending')
    formData.append('requirements', rentalrequirements)
    formData.append('email_featured', 0)
    formData.append('web_featured', 0)
    formData.append('landing_featured', 0)
    formData.append('contact', contact)

    for (let a = 0; a < images.length; a++) {
      formData.append('images[]', images[a].file, images[a].file.name);
    }

    return axiosInstance.post('listings',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(response => {
        console.log('Response', response);
        const { data: { data } } = response;
        console.log('Data',data.id)

        dispatch({
          type: UPLOADLISTING_SUCCESS,
          payload: {
            property_id: data.id
          }
         });

        callback(null, data.id)
      })
      .catch(err => {
        console.log('Error res', err.response.data)
        let errorResponse = 'Something went wrong';
        if (err.response && err.response.data) {
          const { response: { data: { message } }} = err;
          errorResponse = message;
        }

        dispatch({ type: UPLOADLISTING_FAILED, payload: errorResponse });

        callback(errorResponse, null);
      })
  }
}

export const fetchlistings = (callback) => {
  return dispatch => {
    dispatch({ type: FETCHLISTINGS });

    const userData = store.getState().user;
    const { user: { token }} = userData;

    return axiosInstance.get('listings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response);
        const { data: { data } } = response;

        dispatch({
          type: FETCHLISTINGS_SUCCESS,
          payload: data
        });

        callback();
      })
      .catch(err => {
        console.log(err.response);
        let errorResponse = 'Something went wrong';
        if (err.response && err.response.data) {
          const { response: { data: { message } }} = err;
          errorResponse = message;
        }

        dispatch({ type: FETCHLISTINGS_FAILED, payload: errorResponse });

        callback(errorResponse);
      })
  }
}

export const fetchsinglelisting = (id, callback) => {
  return dispatch => {
    dispatch({ type: FETCHLISTING });

    return axiosInstance.get(`listings/${id}`)
      .then(response => {
        const { data: { data } } = response;

        const listing = data.find((item) => item.property_id === id);
        console.log("@Listing", listing);

        dispatch({
          type: FETCHLISTING_SUCCESS,
          payload: listing
        })

        callback()
      })
      .catch(err => {
        dispatch({ type: FETCHLISTING_FAILED });
        callback(err.response)
      })
  }
}

export const makePayment = () => {
  return ({ type: PAYMENT });
}

export const checkPaymentStatus = (property_id, callback) => {
  return dispatch => {
    const userData = store.getState().user;
    const { user: { token }} = userData;

    return axiosInstance.post(`listings/${property_id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    )
    .then(response => {
      console.log('Payment', response)

      dispatch({
        type: PAYMENT_SUCCESSFUL
      });
      callback(null, response);
    })
    .catch(err => {
      console.log(err.response)
      let errorResponse = 'Something went wrong';
      if (err.response && err.response.data) {
        const { response: { data: { message } }} = err;
        errorResponse = message;
      }

      dispatch({
        type: PAYMENT_FAILED
      });

      callback(errorResponse, null);
    })
  }
}
