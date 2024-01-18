import { createSlice } from "@reduxjs/toolkit";
import {
  EditableHoursStatus,
  HoveredCell,
  Schedule_cell,
} from "../../services/fakeUser";
import {
  DayInTheWeek,
  availableHours,
} from "../../services/teachersAvailabiltyGrid";
import { stringedHour } from "../../services/helperFunctions";

interface State {
  isEditorOpen: boolean;
  editableGrid: Schedule_cell[][];
  hoveredCell: HoveredCell | null;
  isCurrentScheduleAdded: boolean;
  selectedCells: DayInTheWeek[];
  confirmPopup: "CLOSE_EDITOR" | "ADD_CURRENT" | "CLEAR_SCHEDULE" | "SAVE" | "";
}

const initialState: State = {
  isEditorOpen: false,
  editableGrid: [],
  hoveredCell: null,
  isCurrentScheduleAdded: true,
  selectedCells: availableHours,
  confirmPopup: "",
};

const generateEditableGrid = (selectedCells: DayInTheWeek[]) => {
  let grid = [];
  for (let m = 0; m < 7; m++) {
    const newDate = new Date(2024, 1, 7, 0, 0, 0);

    let dayDates = [];
    let k = 0;
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 2; j++) {
        let logDate = new Date(newDate.setHours(i));
        logDate.setMinutes(j * 30);
        let myObject = {
          dayInTheWeek: m,
          time: stringedHour(logDate),
        };
        dayDates[k] = {
          id: `${m}_${k}`,
          time: logDate.getTime(),
          hourStatus: selectedCells.some(
            (asd) => JSON.stringify(asd) === JSON.stringify(myObject)
          )
            ? EditableHoursStatus.SELECTED
            : EditableHoursStatus.NOT_SELECTED,
        };
        k++;
      }
    }
    grid[m] = dayDates;
  }
  return grid;
};

const adminScheduleSlice = createSlice({
  name: "adminSchedule",
  initialState,
  reducers: {
    toggleEditor: (state, { payload }) => {
      console.log(payload);

      state.isEditorOpen = payload;
      if (!payload) {
        state.editableGrid = initialState.editableGrid;
        state.hoveredCell = initialState.hoveredCell;
        state.isCurrentScheduleAdded = initialState.isCurrentScheduleAdded;
        state.selectedCells = initialState.selectedCells;
        state.confirmPopup = "";
      }
    },
    getEditableGrid: (state) => {
      state.editableGrid = generateEditableGrid(state.selectedCells);
    },
    hoveredEditHour: (state, { payload: { x, y, data, col } }) => {
      state.hoveredCell = { x, y, date: data, col };
    },
    unhoveredEditHour: (state) => {
      state.hoveredCell = null;
    },
    toggleCell: (state, { payload: { col, cell } }) => {
      const newDate = new Date(cell.time);
      let myObject = {
        dayInTheWeek: col,
        time: stringedHour(newDate),
      };
      if (
        state.selectedCells.some(
          (selected) => JSON.stringify(selected) === JSON.stringify(myObject)
        )
      ) {
        state.selectedCells = state.selectedCells.filter(
          (selected) => JSON.stringify(selected) !== JSON.stringify(myObject)
        );
      } else {
        state.selectedCells = [...state.selectedCells, myObject];
      }
      state.isCurrentScheduleAdded = false;
    },
    addCurrentSchedule: (state) => {
      state.isCurrentScheduleAdded = initialState.isCurrentScheduleAdded;
      state.selectedCells = initialState.selectedCells;
      state.confirmPopup = "";
    },
    clearSchedule: (state) => {
      state.selectedCells = [];
      state.isCurrentScheduleAdded = false;
      state.confirmPopup = "";
    },
    activeConfirmPopup: (state,{payload})=>{
      state.confirmPopup = payload}
  },
});

export const {
  toggleEditor,
  getEditableGrid,
  hoveredEditHour,
  unhoveredEditHour,
  toggleCell,
  addCurrentSchedule,
  clearSchedule,
  activeConfirmPopup
} = adminScheduleSlice.actions;

export default adminScheduleSlice.reducer;
