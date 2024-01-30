import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../services/fakeUser";

interface State {
  isLoadingConfig: boolean;
  address: string;
  phone: string;
  pricePerHour: number | null;
  profilePhoto: string;
  error: string;
}

const initialState: State = {
  isLoadingConfig: false,
  address: "",
  phone: "",
  pricePerHour: null,
  profilePhoto: "",
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
  async (arg: { config: any }) => {
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

      let sendImage = "";
      if (arg.config.avatar) {
        sendImage = await axios.post(
          `${BACKEND_URL}/imageUpload`,
          arg.config.avatar,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      let answer = {
        config: response.data,
        image: sendImage ? (sendImage as any).data : "",
      };

      return answer;
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
          const { address, phone, pricePerHour, profilePhoto } =
            payload.configuration[0];
          state.address = address;
          state.phone = phone;
          state.pricePerHour = pricePerHour;
          state.profilePhoto = profilePhoto;
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
          state.error = "Couldn't edit the class details";
        } else {
          const { address, phone, pricePerHour, profilePhoto } =
            payload.config.newConfiguration;
          state.address = address;
          state.phone = phone;
          state.pricePerHour = pricePerHour;
          state.profilePhoto = profilePhoto;
          /* console.log(payload); */
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
