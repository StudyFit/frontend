import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { format } from "date-fns";
import { HwIcon } from "@/components";
import { getHexFromBackend, themeColors } from "@/assets";
import { getThemeColor } from "@/util/roleBranch";
import { useUser } from "@/contexts/UserContext";

const SCREEN_WIDTH = Dimensions.get("window").width - 60;

export function DayCell({ day, isToday, schedules, homework }) {
  const { userRole } = useUser();

  return (
    <View style={styles.dayContainer}>
      <Text style={styles.weekday}>{format(day, "EEE").toUpperCase()}</Text>

      <View style={[styles.dayNumberWrapper, isToday && styles.todayCircle]}>
        <Text style={[styles.dayText, isToday && styles.todayDayText]}>
          {format(day, "d")}
        </Text>
      </View>

      {schedules.map((item, idx) => (
        <View
          key={idx}
          style={[
            styles.schedule,
            {
              backgroundColor: getHexFromBackend(getThemeColor(userRole, item)),
            },
          ]}
        >
          <Text style={styles.scheduleText}>수업</Text>
        </View>
      ))}

      {homework.map((item) => (
        <View key={item.homeworkDateId} style={styles.homework}>
          <HwIcon
            isAssigned={item.isAllCompleted}
            style={{ width: 8, height: 8.5 }}
          />
          <Text style={styles.homeworkText}>숙제</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    width: SCREEN_WIDTH / 7,
    alignItems: "center",
    paddingVertical: 8,
  },
  weekday: { fontSize: 12, color: "#666" },
  dayNumberWrapper: {
    marginTop: 10.5,
    marginBottom: 11.5,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  todayCircle: { backgroundColor: "#FF3B30", borderRadius: 14 },
  dayText: { fontSize: 16, color: "#333" },
  todayDayText: { color: "#fff", fontWeight: "bold" },
  schedule: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  scheduleText: { fontSize: 8 },
  homework: { flexDirection: "row", alignItems: "center", height: 18, gap: 4 },
  homeworkText: { fontSize: 8 },
});
