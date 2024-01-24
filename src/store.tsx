import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import reserveClassReducer from "./features/reserveClass/reserveClassSlice";
import {
  DurationOptions,
  HoveredCell,
  Schedule_cell,
  TokenRoles,
} from "./services/fakeUser";
import adminScheduleReducer from "./features/adminSchedule/adminScheduleSlice";
import { DayInTheWeek } from "./services/teachersAvailabiltyGrid";
import configurationReducer from "./features/configuration/configurationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reserveClass: reserveClassReducer,
    adminSchedule: adminScheduleReducer,
    configuration: configurationReducer,
  },
});

export interface RootState {
  auth: {
    isLoggedIn: boolean;
    isLoginPopupOpen: boolean;
    isSignupPopupOpen: boolean;
    isLoading: boolean;
    errorAdmin: string;
    errorUser: string;
    errorRegister: string;
    role: TokenRoles;
    readyToCheck: boolean;
    userInfo: {
      name: string;
      email: string;
      phone: string;
      userId: string;
      joinedAt: string;
      profilePhoto: string;
    };
  };
  reserveClass: {
    duration: DurationOptions;
    teachersSchedule: Schedule_cell[][];
    hoveredCellInfo: HoveredCell | null;
    firstDay: number;
    hoveredCells: Schedule_cell[] | null;
    price: number;
    selectedCells: Schedule_cell[] | null;
    isConfirmPopupOpen: boolean;
  };
  adminSchedule: {
    isEditorOpen: boolean;
    editableGrid: Schedule_cell[][];
    hoveredCell: HoveredCell | null;
    isCurrentScheduleAdded: boolean;
    selectedCells: DayInTheWeek[];
    confirmPopup:
      | "CLOSE_EDITOR"
      | "ADD_CURRENT"
      | "CLEAR_SCHEDULE"
      | "SAVE"
      | "";
  };
  configuration: {
    isLoadingConfig: boolean;
    address: string;
    phone: string;
    pricePerHour: number | null;
    error: string;
  };
}
