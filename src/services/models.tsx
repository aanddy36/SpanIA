//ENUMS
export enum DurationOptions {
  SHORT = "60",
  MEDIUM = "90",
  LONG = "120",
}

export enum ClassesStatus {
  ALL = "All",
  DONE = "Done",
  IN_PROGRESS = "In progress",
  IN_COMING = "In coming",
}
export const filters = ["All", "Done", "In progress", "In coming"];

export enum TeacherHoursStatus {
  NOT_AVAILABLE = "NOT_AVAILABLE",
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  SELECTED = "SELECTED",
}

export enum EditableHoursStatus {
  SELECTED = "SELECTED",
  NOT_SELECTED = "NOT_SELECTED",
}

export enum TokenRoles {
  ADMIN = "admin",
  USER = "user",
  NONE = "",
}

export enum CheckStatus {
  CHECKING = "checking",
  READY = "ready",
  FAILED = "failed",
}
//INTERFACES
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}
export interface Professor {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface Classes {
  id: string;
  duration: DurationOptions;
  price: number;
  createdAt: Date;
  startsOn: Date;
  endsOn: Date;
  status: ClassesStatus;
  studentId: string;
  studentPhone: string;
  studentName: string;
  studentEmail: string;
  professorId: string;
  professorPhone: string;
  professorAddress: string;
}

export interface Schedule_cell {
  id: string;
  time: number;
  hourStatus: TeacherHoursStatus | EditableHoursStatus;
}

export interface HoveredCell {
  date: number;
  x: number | null;
  y: number | null;
  col?: number;
}

export interface AdminSummary {
  nClasses: number;
  totalSales: number;
  nStudents: number;
  totalHours: number;
}

export interface AdminStudents {
  _id: string;
  profilePhoto: string;
  name: string;
  email: string;
  classCount: number;
}
export interface AdminClasses {
  id: string;
  price: number;
  startsOn: Date;
  endsOn: Date;
  status: ClassesStatus;
  studentName: string;
  studentEmail: string;
}

export interface Sales {
  label: string;
  sales: number;
}

export interface Chart {
  duration: string;
  value: number;
  color: string;
}

//URL
export const BACKEND_URL = "https://spania-863a8ee10d7a.herokuapp.com/api/v1";
