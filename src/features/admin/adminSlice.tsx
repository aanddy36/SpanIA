import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AdminClasses,
  AdminStudents,
  AdminSummary,
  BACKEND_URL,
  Chart,
  ClassesStatus,
  Sales,
} from "../../services/fakeUser";

interface State {
  isLoading: boolean;
  classes: AdminClasses[];
  nClasses: number;
  summary: AdminSummary;
  students: AdminStudents[];
  timeSeries: Sales[];
  pieChart: Chart[];
}

const initialState: State = {
  isLoading: false,
  classes: [],
  nClasses: 0,
  summary: { nClasses: 0, totalSales: 0, nStudents: 0, totalHours: 0 },
  students: [],
  timeSeries: [],
  pieChart: [],
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

export const getStudents = createAsyncThunk(
  "admin/getStudents",
  async (arg: { input: string }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BACKEND_URL}/students?input=${arg.input}`,
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

export const getSummary = createAsyncThunk("admin/getSummary", async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${BACKEND_URL}/classes/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return "error";
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetState: () => {
      return {...initialState}
    },
  },
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
      })

      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload === "error") {
        } else {
          state.students = payload.newResult;
          /* console.log(payload.newResult); */
        }
      })
      .addCase(getStudents.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSummary.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload === "error") {
        } else {
          state.summary = payload.summary;
          state.timeSeries = payload.sales;
          state.pieChart = payload.pieChart;
        }
      })
      .addCase(getSummary.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const {resetState} = adminSlice.actions;

export default adminSlice.reducer;
