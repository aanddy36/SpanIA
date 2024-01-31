import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BACKEND_URL,
  DurationOptions,
  HoveredCell,
  Schedule_cell,
  TeacherHoursStatus,
} from "../../services/models";
import { stringedHour } from "../../services/helperFunctions";
import { DayInTheWeek } from "../../services/teachersAvailabiltyGrid";
import axios from "axios";

interface State {
  duration: DurationOptions;
  teachersSchedule: Schedule_cell[][];
  hoveredCellInfo: HoveredCell | null;
  firstDay: number;
  hoveredCells: Schedule_cell[] | null;
  price: number;
  selectedCells: Schedule_cell[] | null;
  isConfirmPopupOpen: boolean;
  availableHours: DayInTheWeek[];
  isLoadingAvail: boolean;
  errorCreating: string;
  reservedHours: { id: string; hour: number }[];
  succesCreating: string;
}

const initialState: State = {
  duration: DurationOptions.SHORT,
  teachersSchedule: [],
  hoveredCellInfo: null,
  firstDay: new Date().setDate(new Date().getDate() + 1),
  hoveredCells: null,
  price: 0,
  selectedCells: null,
  isConfirmPopupOpen: false,
  availableHours: [],
  isLoadingAvail: false,
  errorCreating: "",
  reservedHours: [],
  succesCreating: "",
};

export const getAvailableHours = createAsyncThunk(
  "reserveClass/getAvailableHours",
  async (arg: { time: any }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/availableHours`);
      const reservedCells = await axios.get(
        `${BACKEND_URL}/reservedHours/${arg.time}`
      );
      return { schedule: response.data, reserved: reservedCells.data };
    } catch (error) {
      return "error";
    }
  }
);

export const createClass = createAsyncThunk(
  "reserveClass/createClass",
  async (arg: { newClass: any; hoursToReserve: any; time: any }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BACKEND_URL}/classes`,
        {
          theClass: arg.newClass,
          hoursToReserve: arg.hoursToReserve,
          time: arg.time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            studentId: arg.newClass.studentId,
          },
        }
      );
      return response.data;
    } catch (error) {
      return "error";
    }
  }
);

const generateTeacherGrid = (
  firstDay: number,
  availableHours: DayInTheWeek[],
  reservedClasses: { id: string; hour: number }[]
) => {
  const newDate = new Date(firstDay);
  newDate.setDate(newDate.getDate());
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  const endingDate = new Date(newDate);
  endingDate.setDate(endingDate.getDate() + 6);
  endingDate.setHours(23);
  endingDate.setMinutes(59);
  endingDate.setSeconds(59);

  let theReservedOnes = reservedClasses.map((clas) => {
    return { ...clas, hour: new Date(clas.hour) };
  });

  let grid = [];
  for (let m = 0; m < 7; m++) {
    const newDate = new Date(firstDay);
    newDate.setDate(newDate.getDate() + m);
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);

    let dayDates = [];
    let k = 0;
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 2; j++) {
        let logDate = new Date(newDate.setHours(i));
        logDate.setMinutes(j * 30);
        let myObject = {
          dayInTheWeek: logDate.getDay(),
          time: stringedHour(logDate),
        };

        dayDates[k] = {
          id: `${m}_${k}`,
          time: logDate.getTime(),
          hourStatus: theReservedOnes.some(
            (asd) =>
              JSON.stringify({
                dayInTheWeek: asd.hour.getDay(),
                time: stringedHour(asd.hour),
              }) === JSON.stringify(myObject)
          )
            ? TeacherHoursStatus.RESERVED
            : availableHours.some(
                (asd) => JSON.stringify(asd) === JSON.stringify(myObject)
              )
            ? TeacherHoursStatus.AVAILABLE
            : TeacherHoursStatus.NOT_AVAILABLE,
        };
        k++;
      }
    }
    grid[m] = dayDates;
  }
  return grid;
};

const reserveClassSlice = createSlice({
  name: "reserveClass",
  initialState,
  reducers: {
    hoveredHour: (state, { payload: { x, y, data, status } }) => {
      if (status === TeacherHoursStatus.AVAILABLE) {
        state.hoveredCellInfo = { x, y, date: data };
      }
    },
    unhoveredHour: (state) => {
      state.hoveredCellInfo = null;
    },
    changeWeek: (state, { payload }) => {
      if (payload) {
        const newDate = new Date(state.firstDay);
        newDate.setDate(newDate.getDate() + 1);
        if (
          (new Date(newDate).getTime() - new Date().getTime()) /
            1000 /
            60 /
            60 /
            24 <
          1
        ) {
          let newOne = new Date(state.firstDay);
          state.firstDay = newOne.setDate(newOne.getDate() + 1);
        } else {
          let newOne = new Date(state.firstDay);
          state.firstDay = newOne.setDate(newOne.getDate() + 7);
        }
        state.teachersSchedule = generateTeacherGrid(
          state.firstDay,
          state.availableHours,
          []
        );
        return;
      }
      const newDate = new Date(state.firstDay);
      newDate.setDate(newDate.getDate() - 6);
      let pastWeek =
        (new Date(newDate).getTime() - new Date().getTime()) /
          1000 /
          60 /
          60 /
          24 <
        0;

      if (!pastWeek) {
        let newOne = new Date(state.firstDay);
        state.firstDay = newOne.setDate(newOne.getDate() - 7);
      } else {
        let newOne = new Date(state.firstDay);
        state.firstDay = newOne.setDate(newOne.getDate() - 1);
      }
      state.teachersSchedule = generateTeacherGrid(
        state.firstDay,
        state.availableHours,
        []
      );
      return;
    },
    changeDuration: (state, { payload }) => {
      state.duration = payload.duration;
      state.price = payload.price;
      state.selectedCells = null;
    },
    setHoveredCells: (state, { payload }) => {
      state.hoveredCells = payload;
    },
    selectCells: (state) => {
      state.selectedCells = state.hoveredCells;
    },
    toggleConfirmClass: (state, { payload }) => {
      state.isConfirmPopupOpen = payload;
    },
    cleanError: (state) => {
      state.errorCreating = "";
    },
    cleanSuccess: (state) => {
      state.succesCreating = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableHours.pending, (state) => {
        state.isLoadingAvail = true;
      })
      .addCase(getAvailableHours.fulfilled, (state, { payload }) => {
        state.isLoadingAvail = false;
        if (payload === "error") {
        } else {
          state.availableHours = payload.schedule.schedule.map(
            (cell: DayInTheWeek) => {
              return {
                dayInTheWeek: cell.dayInTheWeek,
                time: cell.time,
              };
            }
          );

          state.reservedHours = payload.reserved.reservedHours.map(
            (cell: any) => {
              return {
                ...cell,
                hour: new Date(cell.hour).getTime(),
              };
            }
          );
          state.teachersSchedule = generateTeacherGrid(
            state.firstDay,
            state.availableHours,
            state.reservedHours
          );
        }
      })
      .addCase(getAvailableHours.rejected, (state) => {
        state.isLoadingAvail = false;
      })

      .addCase(createClass.pending, (state) => {
        state.isLoadingAvail = true;
      })
      .addCase(createClass.fulfilled, (state, { payload }) => {
        state.isLoadingAvail = false;
        if (payload === "error") {
          state.errorCreating = "Class couldn't be created. Try again.";
        } else {
          state.reservedHours = payload.reservedHours.map((cell: any) => {
            return {
              ...cell,
              hour: new Date(cell.hour).getTime(),
            };
          });
          state.teachersSchedule = generateTeacherGrid(
            state.firstDay,
            state.availableHours,
            state.reservedHours
          );
          state.selectedCells = null;
          state.succesCreating = "Your class was succesfully scheduled!";
        }
        state.isConfirmPopupOpen = false;
      })
      .addCase(createClass.rejected, (state) => {
        state.isLoadingAvail = false;
      });
  },
});

export const {
  hoveredHour,
  unhoveredHour,
  changeWeek,
  changeDuration,
  setHoveredCells,
  selectCells,
  toggleConfirmClass,
  cleanError,
  cleanSuccess,
} = reserveClassSlice.actions;

export default reserveClassSlice.reducer;
