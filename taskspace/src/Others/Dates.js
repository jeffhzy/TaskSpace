const now = new Date();

//today's date
const day = ("0" + now.getDate()).slice(-2);
const month = ("0" + (now.getMonth() + 1)).slice(-2);
const today = now.getFullYear() + "-" + month + "-" + day;
const todayDate = new Date(today);

//tomorrow's date
const nextDay = new Date(
  todayDate.getFullYear(),
  todayDate.getMonth(),
  todayDate.getDate() + 1
);
const offset = nextDay.getTimezoneOffset();
let myDate = new Date(nextDay.getTime() - offset * 60 * 1000);
const tomorrow = myDate.toISOString().split("T")[0];

//next week's date
const aWeek = new Date(
  todayDate.getFullYear(),
  todayDate.getMonth(),
  todayDate.getDate() + 7
);
const offset1 = aWeek.getTimezoneOffset();
let myDate1 = new Date(aWeek.getTime() - offset1 * 60 * 1000);
const nextWeek = myDate1.toISOString().split("T")[0];

//next month's date
const aMonth = new Date(
  todayDate.getFullYear(),
  todayDate.getMonth(),
  todayDate.getDate() + 30
);
const offset2 = aMonth.getTimezoneOffset();
let myDate2 = new Date(aMonth.getTime() - offset2 * 60 * 1000);
const nextMonth = myDate2.toISOString().split("T")[0];

export { today, tomorrow, nextWeek, nextMonth };
