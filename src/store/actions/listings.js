import {axiosInstance} from '../../main';
import axios from 'axios';
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

export const postlisting = (title, aboutspace, region, location, amount, rate, availability, aboutyou, rentalrequirements, images, callback) => {
  return dispatch => {
    dispatch({ type: UPLOADLISTING });

    const listingsData = store.getState().listings;
    const userData = store.getState().user;
    const { user: { token }} = userData;
    const { listing: { type, category }} = listingsData;
    // console.log('Token:', token)
    //
    // console.log('House', title)
    // console.log('Desc', aboutspace)
    // console.log('type',  type, category)
    // console.log('region', region)
    // console.log('amount', amount)
    // console.log('location', location)
    // console.log('rate', rate)
    // console.log('aboutyou', aboutyou)
    // console.log('Availability', availability)
    // console.log('rentalrequirements', rentalrequirements)
    // console.log('images', images)

    const formData = new FormData();
    formData.append('user_token', token)
    formData.append('title', title)
    formData.append('listing_description', aboutspace)
    formData.append('region', region)
    formData.append('location', location)
    formData.append('amount', amount)
    formData.append('type', type)
    formData.append('category', category)
    formData.append('rate', rate)
    formData.append('about_lister', aboutyou)
    formData.append('visibility', availability)
    formData.append('requirements', rentalrequirements)
    formData.append('featured_email', false)
    formData.append('featured_landing', false)
    formData.append('featured_listingpage', false)
    // formData.append('images[]', images)

    for (let a = 0; a < images.length; a++) {
      formData.append('images[]', images[a].file, images[a].file.name);
    }

    // console.log(title, description, api_token, formData.getAll('images'))

    return axiosInstance.post('api_listings',
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

        dispatch({
          type: UPLOADLISTING_SUCCESS,
          payload: {
            property_id: data.property_id
          }
         });

        callback(null, data.property_id)
      })
      .catch(err => {
        console.log(err)
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

    return axiosInstance.get('api_listings', {
      'Authorization': 'Bearer ' + token
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
        let errorResponse = '';
        const { response: { data: { message } }} = err;
        errorResponse = message ? message : 'Something went wrong';

        dispatch({ type: FETCHLISTINGS_FAILED, payload: errorResponse });

        callback(errorResponse);
      })
  }
}

export const fetchsinglelisting = (id, callback) => {
  return dispatch => {
    dispatch({ type: FETCHLISTING });

    return axiosInstance.get(`api_listings/${id}`)
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

export const makePayment = (property_id, amount, callback) => {
  return dispatch => {
    const { user: { userid, useremail, token }} = store.getState().user;

    dispatch({ type: PAYMENT });

    return axios.post('https://api.flutterwave.com/v3/payments',
      {
        "tx_ref": uuidv4(),
         "amount": amount,
         "currency":"UGX",
         "redirect_url":"http://localhost:3000/post/howitworks/create/confirm/payment/finish",
         "payment_options":"card, mobilemoneyuganda",
         "meta":{
            "consumer_id":23,
            "consumer_mac":"92a3-912ba-1192a"
         },
         "customer":{
            "email": 'bonecollector256@gmail.com',
            "phonenumber":"080****4528",
            "name": 'useremail'
         },
         "customizations":{
            "title":"Ubunifu Payments",
            "description":"Middleout isn't free. Pay the price",
            "logo":"https://assets.piedpiper.com/logo.png"
         }
      },
      {
        headers: {
          'Authorization': `Bearer FLWSECK-37f50a89674cee4ba58c741dc9e2dbf1-X`,
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
      console.log(err)
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
