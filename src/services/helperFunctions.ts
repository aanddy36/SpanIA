
export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const stringedHour = (date: Date) => {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

export const formatPrice = (price: number) => {
  return `$${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDayOfTheWeek = (day: number) => {
  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfTheWeek[day];
};

export const formatMonth = (month: number) => {
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthArray[month];
};

export const longDate = (date: Date) => {
  const newDate = new Date(date);
  const theDate = newDate.getDay()
  const theMonth = newDate.getMonth()
  const theDay = newDate.getDate()

  const dateOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octuber",
    "November",
    "December",
  ];
  let stringedDay = ``
  if(theDay == 1){
    stringedDay = `${theDay}st`
  }else if (theDay==2){
    stringedDay = `${theDay}nd`
  }else if (theDay==3){
    stringedDay = `${theDay}rd`
  }else{
    stringedDay = `${theDay}th`
  }
  //console.log(`${dateOfTheWeek[theDate]}, ${monthArray[theMonth]} ${stringedDay}`);
  
  return `${dateOfTheWeek[theDate]}, ${monthArray[theMonth]} ${stringedDay}`;
};

export const longMonth = (month: number) => {
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octuber",
    "November",
    "December",
  ];
  return monthArray[month];
};