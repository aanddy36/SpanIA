import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BACKEND_URL,
  CheckStatus,
  Classes,
  TokenRoles,
} from "../../services/fakeUser";

interface State {
  isLoggedIn: boolean;
  isLoginPopupOpen: boolean;
  isSignupPopupOpen: boolean;
  isLoading: boolean;
  errorAdmin: string;
  errorUser: string;
  errorRegister: string;
  role: TokenRoles;
  readyToCheck: CheckStatus;
  userInfo: {
    name: string;
    email: string;
    phone: string;
    userId: string;
    joinedAt: string;
    profilePhoto: string;
  };
  classes: Classes[];
}

const initialState: State = {
  isLoggedIn: false,
  isLoginPopupOpen: false,
  isSignupPopupOpen: false,
  isLoading: false,
  errorAdmin: "",
  errorUser: "",
  errorRegister: "",
  role: TokenRoles.NONE,
  readyToCheck: CheckStatus.CHECKING,
  userInfo: {
    name: "",
    email: "",
    phone: "",
    userId: "",
    joinedAt: "",
    profilePhoto: "",
  },
  classes: [],
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (arg: { url: string; userData: any }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/${arg.url}/login`,
        arg.userData
      );
      return response.data;
    } catch (error) {
      return "error";
    }
  }
);

export const checkToken = createAsyncThunk(
  "auth/checkToken",
  async (token: string) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/check/token`, {
        token,
      });

      return response.data;
    } catch (error) {
      return "error";
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (arg: { userData: any }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/students`,
        arg.userData
      );
      return response.data;
    } catch (error) {
      return "error";
    }
  }
);

export const changeProfilePhoto = createAsyncThunk(
  "auth/changeProfilePhoto",
  async (arg: { avatar: any }) => {
    const token = localStorage.getItem("token");
    try {
      let sendImage = await axios.post(
        `${BACKEND_URL}/imageUpload`,
        arg.avatar,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return sendImage.data;
    } catch (error) {
      return "error";
    }
  }
);

export const getUserClasses = createAsyncThunk(
  "auth/getUserClasses",
  async (arg: { id: string }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BACKEND_URL}/classes/${arg.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          studentId: arg.id,
        },
      });
      return response.data;
    } catch (error) {
      return "error";
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleLogin: (state, { payload }) => {
      state.isLoginPopupOpen = payload;
      state.isSignupPopupOpen = false;
      state.errorAdmin = "";
      state.errorUser = "";
      state.errorRegister = "";
    },
    toggleSignup: (state, { payload }) => {
      state.isSignupPopupOpen = payload;
      state.isLoginPopupOpen = false;
      state.errorAdmin = "";
      state.errorUser = "";
      state.errorRegister = "";
    },
    signOut: (state) => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.role = TokenRoles.NONE;
      state.userInfo = initialState.userInfo;
      state.errorAdmin = "";
      state.errorUser = "";
      state.errorRegister = "";
      state.classes = [];
    },
    rejectCheck: (state) => {
      state.readyToCheck = CheckStatus.FAILED;
    },
    acceptCheck: (state) => {
      state.readyToCheck = CheckStatus.READY;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.errorAdmin = "";
        state.errorUser = "";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload === "error") {
          state.errorAdmin = "Invalid email or password. Try again.";
          state.errorUser = "Invalid email or password. Try again.";
        } else {
          localStorage.setItem("token", payload.token);
          const { name, role, phone, email, joinedAt, id, profilePhoto } =
            payload.user;
          //const item = localStorage.getItem("token");
          //console.log(item);
          state.isLoggedIn = true;
          state.role = role;
          state.isLoginPopupOpen = false;
          state.isSignupPopupOpen = false;
          state.errorAdmin = "";
          state.errorUser = "";
          state.userInfo = {
            name,
            phone,
            email,
            joinedAt,
            userId: id,
            profilePhoto,
          };
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(checkToken.pending, (state) => {
        state.isLoading = true;
        state.readyToCheck = CheckStatus.CHECKING;
      })
      .addCase(checkToken.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (payload === "error") {
          localStorage.removeItem("token");
          state.isLoggedIn = false;
          state.role = TokenRoles.NONE;
          state.readyToCheck = CheckStatus.FAILED;
        } else {
          state.isLoggedIn = true;
          state.role = payload.role;
          state.userInfo = payload.userInfo;
          state.readyToCheck = CheckStatus.READY;
        }
      })
      .addCase(checkToken.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.role = TokenRoles.NONE;
        state.readyToCheck = CheckStatus.FAILED;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.errorRegister = "";
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload === "error") {
          state.errorRegister = "Email already in use. Try again.";
        } else {
          localStorage.setItem("token", payload.token);
          const { name, role, phone, email, joinedAt, id, profilePhoto } =
            payload.user;

          state.isLoggedIn = true;
          state.role = role;
          state.isLoginPopupOpen = false;
          state.isSignupPopupOpen = false;
          state.errorRegister = "";
          state.userInfo = {
            name,
            phone,
            email,
            joinedAt,
            userId: id,
            profilePhoto,
          };
        }
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getUserClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserClasses.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload === "error") {
          state.readyToCheck = CheckStatus.FAILED;
        } else {
          state.classes = payload.classes;
        }
      })
      .addCase(getUserClasses.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(changeProfilePhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeProfilePhoto.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload === "error") {
        } else {
          console.log(payload);

          state.userInfo.profilePhoto = (payload as any).user.profilePhoto;
        }
      })
      .addCase(changeProfilePhoto.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { toggleLogin, toggleSignup, signOut, rejectCheck, acceptCheck } =
  authSlice.actions;

export default authSlice.reducer;
