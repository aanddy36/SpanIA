import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../services/fakeUser";

interface State {
  isLoadingConfig: boolean;
  address: string;
  phone: string;
  pricePerHour: number | null;
  error: string;
}

const initialState: State = {
  isLoadingConfig: false,
  address: "",
  phone: "",
  pricePerHour: null,
  error: "",
};

export const getConfiguration = createAsyncThunk(
  "auth/getConfiguration",
  async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/configuration`);
      return response.data;
    } catch (error) {
      return "error";
    }
  }
);

export const editConfiguration = createAsyncThunk(
  "auth/editConfiguration",
  async (arg:{config:any}) => {
   
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/configuration`,
        arg.config,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adjust the content type as needed
          },
        }
      );
      return response.data;
    } catch (error) {
      return "error";
    }
  }
);

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfiguration.pending, (state) => {
        state.isLoadingConfig = true;
        state.error = "";
      })
      .addCase(getConfiguration.fulfilled, (state, { payload }) => {
        state.isLoadingConfig = false;

        if (payload === "error") {
          state.error = "Could'nt retrieve the class details";
        } else {
          const { address, phone, pricePerHour } = payload.configuration[0];
          state.address = address;
          state.phone = phone;
          state.pricePerHour = pricePerHour;
        }
      })
      .addCase(getConfiguration.rejected, (state) => {
        state.isLoadingConfig = false;
        state.error = "Something went wrong";
      })
      .addCase(editConfiguration.pending, (state) => {
        state.isLoadingConfig = true;
        state.error = "";
      })
      .addCase(editConfiguration.fulfilled, (state, { payload }) => {
        state.isLoadingConfig = false;
       
        if (payload === "error") {
          state.error = "Could'nt edit the class details";
        } else {
          const { address, phone, pricePerHour } = payload.newConfiguration;
          state.address = address;
          state.phone = phone;
          state.pricePerHour = pricePerHour;
        }
      })
      .addCase(editConfiguration.rejected, (state) => {
        state.isLoadingConfig = false;
        state.error = "Something went wrong";
      });
  },
});

export const {} = configSlice.actions;

export default configSlice.reducer;
