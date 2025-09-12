import React from "react";
import { View, StyleSheet } from "react-native";
import { addDays, format } from "date-fns";
import { DayCell } from "./DayCell";

export function WeekRow({ currentWeekStart, today, schedules, homework }) {
  const getItemsByDate = (arr, dateString) =>
    arr.filter((item) => item.date === dateString);

  return (
    <View style={styles.weekRow}>
      {[...Array(7)].map((_, i) => {
        const day = addDays(currentWeekStart, i);
        const dateString = format(day, "yyyy-MM-dd");
        const isToday = dateString === format(today, "yyyy-MM-dd");

        return (
          <DayCell
            key={i}
            day={day}
            isToday={isToday}
            schedules={getItemsByDate(schedules, dateString)}
            homework={getItemsByDate(homework, dateString)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  weekRow: { flexDirection: "row", justifyContent: "space-around" },
});
