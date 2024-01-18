import { createSlice } from "@reduxjs/toolkit";
import {
  DurationOptions,
  HoveredCell,
  PriceOptions,
  Schedule_cell,
  TeacherHoursStatus,
} from "../../services/fakeUser";
import { stringedHour } from "../../services/helperFunctions";
import {
  DayInTheWeek,
  availableHours,
  reservedHours,
} from "../../services/teachersAvailabiltyGrid";

interface State {
  duration: DurationOptions;
  teachersSchedule: Schedule_cell[][];
  hoveredCellInfo: HoveredCell | null;
  firstDay: number;
  hoveredCells: Schedule_cell[] | null;
  price: number;
  selectedCells: Schedule_cell[] | null;
  isConfirmPopupOpen: boolean;
}

const initialState: State = {
  duration: DurationOptions.SHORT,
  teachersSchedule: [],
  hoveredCellInfo: null,
  firstDay: new Date().setDate(new Date().getDate() + 1),
  hoveredCells: null,
  price: PriceOptions.SHORT,
  selectedCells: null,
  isConfirmPopupOpen: false,
};

/* const getTeacherSchedule = createAsyncThunk('reserveClass/getTeacherSchedule',async ()=>{
    try {
   
    }catch(err){
        console.log(err);
        
    }
}) */

const generateTeacherGrid = (
  firstDay: number,
  availableHours: DayInTheWeek[],
  reservedClasses: { id: string; hour: Date }[]
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

  let theReservedOnes = reservedClasses.filter(
    (clas) =>
      clas.hour.getTime() >= newDate.getTime() &&
      clas.hour.getTime() < endingDate.getTime()
  );

  //console.log(theReservedOnes);
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
      return;
    },
    getTeacherSchedule: (state) => {
      state.teachersSchedule = generateTeacherGrid(
        state.firstDay,
        availableHours,
        reservedHours
      );
    },
    changeDuration: (state, { payload }) => {
      state.duration = payload;
      state.price =
        state.duration === DurationOptions.SHORT
          ? PriceOptions.SHORT
          : state.duration === DurationOptions.MEDIUM
          ? PriceOptions.MEDIUM
          : PriceOptions.LONG;
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
  },
});

export const {
  hoveredHour,
  unhoveredHour,
  changeWeek,
  getTeacherSchedule,
  changeDuration,
  setHoveredCells,
  selectCells,
  toggleConfirmClass,
} = reserveClassSlice.actions;

export default reserveClassSlice.reducer;
