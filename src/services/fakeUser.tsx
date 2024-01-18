//ENUMS
export enum DurationOptions {
  SHORT = 60,
  MEDIUM = 90,
  LONG = 120,
}

export enum PriceOptions {
  SHORT = 10,
  MEDIUM = 15,
  LONG = 20,
}

export enum ClassesStatus {
  ALL = "All",
  DONE = "Done",
  IN_PROGRESS = "In progress",
  IN_COMING = "In coming",
  CANCELED = "Canceled",
}
export const filters = ["All","Done","In progress","In coming","Canceled"]

export enum TeacherHoursStatus {
  NOT_AVAILABLE = "NOT_AVAILABLE",
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  SELECTED = "SELECTED",
}

export enum EditableHoursStatus {
  SELECTED = "SELECTED",
  NOT_SELECTED = "NOT_SELECTED"
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
  price: PriceOptions;
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

export interface Schedule_cell{
  id:string,
  time:number,
  hourStatus: TeacherHoursStatus | EditableHoursStatus
}

export interface HoveredCell {
  date: number;
  x: number | null;
  y: number | null;
  col?: number
}

//FAKEDATA

//Professor
export const professor: Professor[] = [
  {
    id: "12345678",
    name: "Andrés Del Chiaro B.",
    email: "anchibro@hotmail.com",
    phone: "+1(123)-456-7890",
    createdAt: new Date(),
  },
];

//Student
export const student: Student[] = [
  {
    id: "12345678",
    name: "Andrés Del Chiaro B.",
    email: "anchibro@hotmail.com",
    phone: "+1(123)-456-7890",
    createdAt: new Date(),
  },
];

//Classes
export const classes: Classes[] = [
  {
    id: "class-1",
    duration: DurationOptions.SHORT,
    price: PriceOptions.SHORT,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 1, 9, 0),
    endsOn: new Date(2024, 0, 1, 10, 0),
    status: ClassesStatus.DONE,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
    studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  {
    id: "class-2",
    duration: DurationOptions.MEDIUM,
    price: PriceOptions.MEDIUM,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 2, 10, 30),
    endsOn: new Date(2024, 0, 2, 12, 0),
    status: ClassesStatus.DONE,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
    studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  {
    id: "class-3",
    duration: DurationOptions.LONG,
    price: PriceOptions.LONG,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 3, 14, 0),
    endsOn: new Date(2024, 0, 3, 16, 0),
    status: ClassesStatus.CANCELED,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
        studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  {
    id: "class-4",
    duration: DurationOptions.SHORT,
    price: PriceOptions.SHORT,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 4, 9, 0),
    endsOn: new Date(2024, 0, 4, 10, 0),
    status: ClassesStatus.DONE,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
        studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  {
    id: "class-5",
    duration: DurationOptions.MEDIUM,
    price: PriceOptions.MEDIUM,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 5, 10, 30),
    endsOn: new Date(2024, 0, 5, 12, 0),
    status: ClassesStatus.CANCELED,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
        studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  {
    id: "class-6",
    duration: DurationOptions.LONG,
    price: PriceOptions.LONG,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 6, 14, 0),
    endsOn: new Date(2024, 0, 6, 16, 0),
    status: ClassesStatus.DONE,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
        studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  {
    id: "class-7",
    duration: DurationOptions.SHORT,
    price: PriceOptions.SHORT,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 7, 9, 0),
    endsOn: new Date(2024, 0, 7, 10, 0),
    status: ClassesStatus.DONE,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
        studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  {
    id: "class-8",
    duration: DurationOptions.MEDIUM,
    price: PriceOptions.MEDIUM,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 8, 10, 30),
    endsOn: new Date(2024, 0, 8, 12, 0),
    status: ClassesStatus.IN_PROGRESS,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
        studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  {
    id: "class-9",
    duration: DurationOptions.LONG,
    price: PriceOptions.LONG,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 17, 14, 0),
    endsOn: new Date(2024, 0, 17, 16, 0),
    status: ClassesStatus.IN_COMING,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
        studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  {
    id: "class-10",
    duration: DurationOptions.SHORT,
    price: PriceOptions.SHORT,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 16, 9, 0),
    endsOn: new Date(2024, 0, 16, 10, 0),
    status: ClassesStatus.IN_COMING,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
        studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  {
    id: "class-11",
    duration: DurationOptions.MEDIUM,
    price: PriceOptions.MEDIUM,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 17, 10, 30),
    endsOn: new Date(2024, 0, 17, 12, 0),
    status: ClassesStatus.IN_COMING,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
        studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  {
    id: "class-12",
    duration: DurationOptions.LONG,
    price: PriceOptions.LONG,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 16, 14, 0),
    endsOn: new Date(2024, 0, 16, 16, 0),
    status: ClassesStatus.IN_COMING,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
        studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  
  {
    id: "class-13",
    duration: DurationOptions.LONG,
    price: PriceOptions.LONG,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 23, 14, 0),
    endsOn: new Date(2024, 0, 23, 16, 0),
    status: ClassesStatus.IN_COMING,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
        studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
  {
    id: "class-14",
    duration: DurationOptions.LONG,
    price: PriceOptions.LONG,
    createdAt: new Date(),
    startsOn: new Date(2024, 0, 15, 14, 0),
    endsOn: new Date(2024, 0, 15, 16, 0),
    status: ClassesStatus.IN_COMING,
    studentId: "12345678",
    studentPhone: "+9(123)-456-7890",
        studentName: "Andrés Del Chiaro B.",
    studentEmail: "anchibro@hotmail.com",
    professorId: "qwertyui1",
    professorPhone: "+1 (123)-456-7890",
    professorAddress: "2101 NASA Pkwy Houston, TX 77058",
  },
];

//AdminResume

const getPriceValue = (priceOption: PriceOptions): number => {
  switch (priceOption) {
    case PriceOptions.SHORT:
      return PriceOptions.SHORT;
    case PriceOptions.MEDIUM:
      return PriceOptions.MEDIUM;
    case PriceOptions.LONG:
      return PriceOptions.LONG;
    default:
      return 0;
  }
};

const getDurationValue = (durationValue: DurationOptions): number => {
  switch (durationValue) {
    case DurationOptions.SHORT:
      return DurationOptions.SHORT;
    case DurationOptions.MEDIUM:
      return DurationOptions.MEDIUM;
    case DurationOptions.LONG:
      return DurationOptions.LONG;
    default:
      return 0;
  }
};


export const resume = {
  classes: classes.length,
  sales: classes.reduce((total, { price }) => total + getPriceValue(price), 0),
  students:student.length,
  hours:classes.reduce((total, { duration }) => total + getDurationValue(duration), 0)/60,
};
