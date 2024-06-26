import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import store from "../store/index";

const initialState = {
  orders: [], // Tu array de productos inicial
  loading: false,
  loadingModal: false,
  error: "",
  value: 1110,
  order: {},
  preferenceObj:{},
  preferenceId:"",
  orderItemsSelected: [],
  showDetail: false,
  successCreate: null,
  statusOrder:"",
  successEvent:false,
};

var url = process.env.REACT_APP_URL_ALL + "/orders";

export const getAllOrders = createAsyncThunk(
  "orderSlice/getAllOrders",
  async () => {
    let config = {
      method: "GET",
      url,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
    };
    const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    return data;
  }
);

export const getOrderbyID = createAsyncThunk(
  "orderSlice/getOrderbyID",
  async (id) => {
    let sPath =  url + "/" + id;
    let config = {
      method: "GET",
      url:sPath,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
    };
    const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    return data;
  }
);

export const createOrder = createAsyncThunk(
  "orderSlice/createOrder",
  async (body) => {
    let config = {
      method: "POST",
      url,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
      data: body,
    };
    const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    return data;
  }
);

export const cancelOrder = createAsyncThunk(
  "orderSlice/cancelOrder",
  async (id) => {
    let sPath = url + "/" + id + "/cancel"
    let config = {
      method: "PATCH",
      url:sPath,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
    };
    const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    return data;
  }
);


export const createPreference = createAsyncThunk(
  "orderSlice/createPreference",
  async (body) => {
    let sPath = process.env.REACT_APP_URL_ALL+"/payments/create_preference"
    let config = {
      method: "POST",
      url:sPath,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
      data: body,
    };
    const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    return data;
  }
);



const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    payOrder(state, action) {
      console.log(action);
    },
    //actions
    addItemToShop(state, action) {
      const { existingProductIndex, productToAdd } = action.payload;
      if (existingProductIndex === -1) {
        state.orderItemsSelected.push({
          ...productToAdd,
          qtySelect: 1,
        });
      } else {
        state.orderItemsSelected = state.orderItemsSelected.map(
          (product, index) => {
            if (index === existingProductIndex) {
              return {
                ...product,
                qtySelect: product.qtySelect + 1,
              };
            }
            return product;
          }
        );
      }
    },
    changeQuanty(state, action) {
      let { productId, quantity } = action.payload;
      const existingProductIndex = state.orderItemsSelected.findIndex(
        (product) => product.id === productId
      );

      state.orderItemsSelected = state.orderItemsSelected.map(
        (product, index) => {
          if (index === existingProductIndex) {
            return {
              ...product,
              qtySelect: Number(quantity),
            };
          }
          return product;
        }
      );
    },
    changeLoading(state, action) {
      console.log(action.payload);
      state = { ...state, loading: action.payload };
    },
    addFilter(state, action) {
      console.log(action.payload);
      state.filter = action.payload;
    },
    changeLoadingModal(state, action) {
      let aObj = state.products.filter((e) => e.id === action.payload);
      if (aObj.length == 1) {
        state.product = aObj[0];
      }
      state.loadingModal = !state.loadingModal;

      console.log(action.payload);
    },
    addProduct(state, action) {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      // Add user to the state array
      state.orders = action.payload.data.orders;
      state.orders.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
      state.loading = false;
    });

    builder.addCase(getAllOrders.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
      console.log("Error", action);
      state.error = JSON.stringify(action);
    });
    //get My ID
    builder.addCase(getOrderbyID.pending, (state, action) => {
      // state.loading = true;
      state.showDetail = false;
    });
    builder.addCase(getOrderbyID.fulfilled, (state, action) => {
      // Add user to the state array
      state.order = action.payload.data.order;
      console.log(state.order.bill);
      const handleDownload = (url) => {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "order_bill.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      handleDownload(state.order.bill);
      state.showDetail = true;
    });

    builder.addCase(getOrderbyID.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
      console.log("Error", action);
      state.error = JSON.stringify(action);
      state.showDetail = false;
    });

    //Create order
    builder.addCase(createOrder.pending, (state, action) => {
      // state.loading = true;
      state.showDetail = false;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      // Add user to the state array
      state.order = action.payload.data.order;
      state.successCreate = true;
      console.log(state.order);
    });

    builder.addCase(createOrder.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
      console.log("Error", action);
      state.error = JSON.stringify(action);
      state.showDetail = false;
    });
    //cancel order
    builder.addCase(cancelOrder.pending, (state, action) => {
      // state.loading = true;
      state.showDetail = false;
    });
    builder.addCase(cancelOrder.fulfilled, (state, action) => {
      // Add user to the state array
      state.statusOrder = action.payload.data.message;
      state.successEvent = true;
      // console.log(state.);
    });

    builder.addCase(cancelOrder.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
      console.log("Error", action);
      state.error = JSON.stringify(action);
      state.showDetail = false;
    });
    //create preference
    builder.addCase(createPreference.pending, (state, action) => {
      // state.loading = true;
      state.showDetail = false;
    });
    builder.addCase(createPreference.fulfilled, (state, action) => {
      // Add user to the state array
      state.preferenceObj = action.payload.data;
      state.preferenceId= action.payload.data.preference_id;
    });

    builder.addCase(createPreference.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
      console.log("Error", action);
      state.error = JSON.stringify(action);
      state.showDetail = false;
    });

  },
});

export const {
  changeLoading,
  addFilter,
  changeLoadingModal,
  addProduct,
  addItemToShop,
  changeQuanty,
  payOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
