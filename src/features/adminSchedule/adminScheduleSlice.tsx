import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BACKEND_URL,
  EditableHoursStatus,
  HoveredCell,
  Schedule_cell,
} from "../../services/models";
import { DayInTheWeek } from "../../services/teachersAvailabiltyGrid";
import { stringedHour } from "../../services/helperFunctions";
import axios from "axios";

interface State {
  isEditorOpen: boolean;
  editableGrid: Schedule_cell[][];
  hoveredCell: HoveredCell | null;
  isCurrentScheduleAdded: boolean;
  selectedCells: DayInTheWeek[];
  confirmPopup: "CLOSE_EDITOR" | "ADD_CURRENT" | "CLEAR_SCHEDULE" | "SAVE" | "";
  isLoadingSched: boolean;
}

const initialState: State = {
  isEditorOpen: false,
  editableGrid: [],
  hoveredCell: null,
  isCurrentScheduleAdded: true,
  selectedCells: [],
  confirmPopup: "",
  isLoadingSched: false,
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

export const updateSchedule = createAsyncThunk(
  "adminSchedule/updateSchedule",
  async (arg: { newSchedule: any }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${BACKEND_URL}/availableHours`,
        {
          newSchedule: arg.newSchedule,
        },
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

export const getSchedule = createAsyncThunk(
  "adminSchedule/getSchedule",
  async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/availableHours`);
      return response.data;
    } catch (error) {
      return "error";
    }
  }
);

const adminScheduleSlice = createSlice({
  name: "adminSchedule",
  initialState,
  reducers: {
    toggleEditor: (state, { payload }) => {
      state.isEditorOpen = payload;
      if (!payload) {
        state.editableGrid = initialState.editableGrid;
        state.hoveredCell = initialState.hoveredCell;
        state.isCurrentScheduleAdded = initialState.isCurrentScheduleAdded;
        state.selectedCells = initialState.selectedCells;
        state.confirmPopup = "";
      }
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
      state.editableGrid = generateEditableGrid(state.selectedCells);
      state.isCurrentScheduleAdded = false;
    },
    clearSchedule: (state) => {
      state.selectedCells = [];
      state.isCurrentScheduleAdded = false;
      state.confirmPopup = "";
      state.editableGrid = generateEditableGrid(state.selectedCells);
    },
    activeConfirmPopup: (state, { payload }) => {
      state.confirmPopup = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSchedule.pending, (state) => {
        state.isLoadingSched = true;
      })
      .addCase(updateSchedule.fulfilled, (state, { payload }) => {
        state.isLoadingSched = false;
        if (payload === "error") {
        } else {
          state.isEditorOpen = false;
          state.selectedCells = payload.schedule.map((cell: DayInTheWeek) => {
            return {
              dayInTheWeek: cell.dayInTheWeek,
              time: cell.time,
            };
          });
        }
      })
      .addCase(updateSchedule.rejected, (state) => {
        state.isLoadingSched = false;
      })

      .addCase(getSchedule.pending, (state) => {
        state.isLoadingSched = true;
      })
      .addCase(getSchedule.fulfilled, (state, { payload }) => {
        state.isLoadingSched = false;
        if (payload === "error") {
        } else {
          state.selectedCells = payload.schedule.map((cell: DayInTheWeek) => {
            return {
              dayInTheWeek: cell.dayInTheWeek,
              time: cell.time,
            };
          });
          state.editableGrid = generateEditableGrid(state.selectedCells);
          state.isCurrentScheduleAdded = initialState.isCurrentScheduleAdded;
          state.confirmPopup = "";
        }
      })
      .addCase(getSchedule.rejected, (state) => {
        state.isLoadingSched = false;
      });
  },
});

export const {
  toggleEditor,
  hoveredEditHour,
  unhoveredEditHour,
  toggleCell,
  clearSchedule,
  activeConfirmPopup,
} = adminScheduleSlice.actions;

export default adminScheduleSlice.reducer;
