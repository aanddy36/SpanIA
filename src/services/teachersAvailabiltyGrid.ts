export interface DayInTheWeek {
  _id?: string;
  dayInTheWeek: number;
  time: string;
  __v0?: number;
}

export const halfHourArray = [] as string[];

for (let hour = 0; hour < 24; hour++) {
  for (let minute of ["00", "30"]) {
    const timeString = `${hour.toString().padStart(2, "0")}:${minute}`;
    halfHourArray.push(timeString);
  }
}
