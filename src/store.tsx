import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import reserveClassReducer from "./features/reserveClass/reserveClassSlice";
import {
  DurationOptions,
  HoveredCell,
  Schedule_cell,
} from "./services/fakeUser";
import adminScheduleReducer from "./features/adminSchedule/adminScheduleSlice";
import { DayInTheWeek } from "./services/teachersAvailabiltyGrid";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reserveClass: reserveClassReducer,
    adminSchedule:adminScheduleReducer
  }
});

export interface RootState {
  auth: {
    isLoggedIn: boolean;
    isLoginPopupOpen: boolean;
    isSignupPopupOpen: boolean;
  };
  reserveClass: {
    duration: DurationOptions;
    teachersSchedule: Schedule_cell[][];
    hoveredCellInfo: HoveredCell | null;
    firstDay: number;
    hoveredCells: Schedule_cell[] | null;
    price:number;
    selectedCells: Schedule_cell[] | null;
    isConfirmPopupOpen: boolean;
  };
  adminSchedule: {
    isEditorOpen: boolean;
    editableGrid: Schedule_cell[][];
    hoveredCell: HoveredCell | null;
    isCurrentScheduleAdded: boolean;
    selectedCells: DayInTheWeek[];
    confirmPopup: "CLOSE_EDITOR" | "ADD_CURRENT" | "CLEAR_SCHEDULE" | "SAVE" | ""
  }
}
