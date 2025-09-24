import { parseISO, isToday, isAfter, isBefore } from "date-fns";

export function sortHomeworks(data) {
  const today = new Date();

  const todayList = [];
  const futureList = [];
  const pastList = [];

  data.forEach((item) => {
    const date = parseISO(item.date);

    if (isToday(date)) {
      todayList.push(item);
    } else if (isAfter(date, today)) {
      futureList.push(item);
    } else if (isBefore(date, today)) {
      pastList.push(item);
    }
  });

  // 미래는 오름차순, 과거는 내림차순
  futureList.sort((a, b) => new Date(a.date) - new Date(b.date));
  pastList.sort((a, b) => new Date(b.date) - new Date(a.date));

  return [...todayList, ...futureList, ...pastList];
}
