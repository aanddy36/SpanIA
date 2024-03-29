import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import reserveClassReducer from "./features/reserveClass/reserveClassSlice";
import {
  AdminClasses,
  AdminStudents,
  AdminSummary,
  Chart,
  CheckStatus,
  Classes,
  DurationOptions,
  HoveredCell,
  Sales,
  Schedule_cell,
  TokenRoles,
} from "./services/models";
import adminScheduleReducer from "./features/adminSchedule/adminScheduleSlice";
import { DayInTheWeek } from "./services/teachersAvailabiltyGrid";
import configurationReducer from "./features/configuration/configurationSlice";
import adminReducer from "./features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reserveClass: reserveClassReducer,
    adminSchedule: adminScheduleReducer,
    configuration: configurationReducer,
    admin: adminReducer,
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
    availableHours: DayInTheWeek[];
    isLoadingAvail: boolean;
    errorCreating: string;
    reservedHours: { id: string; hour: number }[];
    succesCreating: string;
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
    isLoadingSched: boolean;
  };
  configuration: {
    isLoadingConfig: boolean;
    address: string;
    phone: string;
    pricePerHour: number | null;
    profilePhoto: string;
    error: string;
  };
  admin: {
    isLoading: boolean;
    classes: AdminClasses[];
    nClasses: number;
    summary: AdminSummary;
    students: AdminStudents[];
    timeSeries: Sales[];
    pieChart: Chart[];
  };
}
