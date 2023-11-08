import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_DELETE_CLEAR_MESSAGE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_HIDE_MESSAGE,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

const URL =
  "https://870avezjq0.execute-api.us-east-1.amazonaws.com/dev/products";

export const listProducts =
  ( ) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });


      const response = await axios(URL); // Use the relative path to your API endpoint
      const data = await response;

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });
 
    const  data  = await axios.delete(`${URL}/${id}`);
    console.log(data);
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: {
        message: data,
        id: id,
      },
    });

    setTimeout(() => {
      dispatch({
        type: PRODUCT_DELETE_CLEAR_MESSAGE,
      });
    }, 2500);
  } catch (err) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createProduct =
  (data) =>
  async (dispatch, getState) => {
    try {

    data.price = Number(data.price)
    data.quantity = Number(data.quantity)

    if(JSON.stringify(data)!=="{}"){
      delete data.image;
      const pay = await axios.post(URL, data);
      
      if(getState().createImage.imageFormat){
        let sId = pay.data.product.id;
        let sUrl = URL+"/"+sId+"/image"
        let body_ = getState().createImage;
        delete body_.productos;
       let dataImg= await axios.post(sUrl, body_);
        
        //reescribimos el id de la img
        pay.data.product.image = dataImg.data.imageUrl;
        console.log("update",pay.data.product);
      }
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: pay.data.product,
      });
    } 
    } catch (err) {
      debugger;
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });
/*
    const {
      userLogin: { userInfo },
    } = getState();
  

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  */
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });

    setTimeout(() => {
      dispatch({ type: PRODUCT_UPDATE_HIDE_MESSAGE });
    }, 2500);
  } catch (err) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });
/*
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
*/

      await axios.post(`/api/products/${productId}/reviews`, review);

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const response = await axios(URL); // Use the relative path to your API endpoint
    const data = await response;
    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
