import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AdminClasses,
  AdminStudents,
  AdminSummary,
  BACKEND_URL,
  ClassesStatus,
} from "../../services/fakeUser";

interface State {
  isLoading: boolean;
  classes: AdminClasses[];
  nClasses: number;
  summary: AdminSummary | {};
  students: AdminStudents | {};
}

const initialState: State = {
  isLoading: false,
  classes: [],
  nClasses: 0,
  summary: {},
  students: {},
};

export const getClasses = createAsyncThunk(
  "admin/getClasses",
  async (arg: { status: ClassesStatus; sorting: "-1" | "1"; page: number }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BACKEND_URL}/classes?status=${arg.status}&sort=${arg.sorting}&page=${arg.page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return "error";
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClasses.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload === "error") {
        } else {
          state.classes = payload.classes;
          state.nClasses = payload.nClasses;
          //console.log(payload);
        }
      })
      .addCase(getClasses.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const {} = adminSlice.actions;

export default adminSlice.reducer;
