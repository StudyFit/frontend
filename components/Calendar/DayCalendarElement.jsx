import { StyleSheet, Text, View } from "react-native";
import { HwIcon } from "./HwIcon";

const DayScheduleElement = ({ themeColor, studentName, subject }) => {
  return (
    <View style={[styles.scheduleContainer, { backgroundColor: themeColor }]}>
      <Text style={styles.scheduleText} numberOfLines={1} ellipsizeMode="tail">
        {studentName.slice(1)} {subject}
      </Text>
    </View>
  );
};

const DayHomeworkElement = ({ isAssigned, studentName }) => {
  return (
    <View style={[styles.scheduleContainer, { flexDirection: "row", gap: 2 }]}>
      <HwIcon isAssigned={isAssigned} style={{ width: 9, height: 9 }} />
      <Text style={styles.scheduleText}>{studentName.slice(1)} 숙제</Text>
    </View>
  );
};

export { DayScheduleElement, DayHomeworkElement };

const styles = StyleSheet.create({
  scheduleContainer: {
    width: 48,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: 3,
  },
  scheduleText: {
    fontSize: 8,
  },
});
