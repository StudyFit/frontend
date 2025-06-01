import { StyleSheet, Text, View } from "react-native";

const DayOfWeekComponent = () => {
  const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <View style={styles.weekdaysRow}>
      {WEEKDAYS.map((d) => (
        <Text key={d} style={styles.weekdayText}>
          {d}
        </Text>
      ))}
    </View>
  );
};

export { DayOfWeekComponent };

const styles = StyleSheet.create({
  weekdaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 17,
  },
  weekdayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    color: "#666",
  },
});
