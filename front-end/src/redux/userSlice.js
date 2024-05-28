import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  user: "",
  first_name: "",
  last_name: "",
  avatar: "",
  address: "",
  phone: "",
  is_superuser: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.email = action.payload.user.email;
      state.user = action.payload.user.username;
      state.id = action.payload.user.id;
      state.first_name = action.payload.user.first_name;
      state.last_name = action.payload.user.last_name;
      state.avatar = action.payload.user.avatar;
      state.is_superuser = action.payload.user.is_superuser === true ? "ADMIN" : "USER"
    },
    logoutRedux: (state, action) => {
      state.email = "";
      state.user = "";
      state.id = "";
      state.first_name = "";
      state.last_name = "";
      state.avatar = "";
      localStorage.removeItem("accessToken");
    },
    upDateRedux: (state, action) => {
      if (action.payload) {
        state.phone = action.payload.phone;
        state.email = action.payload.email;
        state.first_name = action.payload.first_name;
        state.user = action.payload.username;
        // state.id = action.payload.id
        state.last_name = action.payload.last_name;
        state.address = action.payload?.address;
        state.isAdmin = action.payload.user.role === true ? "ADMIN" : "USER"
      }
    },
  },
});

export const { loginRedux, logoutRedux, upDateRedux } = userSlice.actions;

export default userSlice.reducer;
