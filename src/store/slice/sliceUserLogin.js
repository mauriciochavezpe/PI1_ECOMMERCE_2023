import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  userData: {},
  userDataTemp: {},
  isLogin: false,
  loading: true,
  isUserAdmin:false,
  error: "",
  value: 0,
};

var url = process.env.REACT_APP_URL_ALL + "/user";
export const getMyUser = createAsyncThunk("userLogin/getMyUser", async () => {
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
});
export const updateMyUser = createAsyncThunk(
  "userLogin/updateMyUser",
  async (action) => {
    let config = {
      method: "PATCH",
      url,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
      data: action,
    };
    const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    return data;
  }
);
export const deleteMyUser = createAsyncThunk(
  "userLogin/deleteMyUser",
  async (action) => {
    let config = {
      method: "DELETE",
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


const productSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    //actions
    updateMyuserData(state, action) {
      let aUserDataUpdate = action.payload;
      state.userData[aUserDataUpdate.key] = aUserDataUpdate.value;
    },
    IsLogin(state, action) {

      state.isLogin = action.payload;
      state.value = 100;

    },
    addFilter(state, action) {
      console.log(action.payload);
      state.value = action.payload;
    },

    addProduct(state, action) {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getMyUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.userData = action.payload.data.user;
      state.userDataTemp = action.payload.data.user;
      state.isLogin = true;
      state.value = 100;
      console.log("Estuvimos por aquí");
      state.loading = false;
    });

    builder.addCase(getMyUser.rejected, (state, action) => {
      // Add user to the state array
      //state.products.push(action.payload);
      state.loading = true;
      state.error = JSON.stringify(action);
    });
    //updateMyUser
    builder.addCase(updateMyUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateMyUser.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("estamos por aquí");
      state.userData = action.payload.data.user;
      state.userDataTemp = action.payload.data.user;
      state.isLogin = true;
      state.loading = false;
    });

    builder.addCase(updateMyUser.rejected, (state, action) => {
      // Add user to the state array
      //state.products.push(action.payload);
      state.loading = true;
      state.error = JSON.stringify(action);
    });
    //DELETEMyUser
    builder.addCase(deleteMyUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteMyUser.fulfilled, (state, action) => {
      console.log("estamos por aquí DELETE");
      state.isLogin = true;
      state.loading = false;
    });

    builder.addCase(deleteMyUser.rejected, (state, action) => {
      // Add user to the state array
      state.loading = true;
      state.error = JSON.stringify(action);
    });
  },
});

export const {
  updateMyuserData,
  addFilter,
  addProduct,
  IsLogin,
} = productSlice.actions;
export default productSlice.reducer;
