import { calendarImage } from "@/assets/images/calendar";
import { Image, StyleSheet, Pressable, View, Text } from "react-native";

const CalendarHeader = ({ year, month, changeCalendar }) => {
  return (
    <View style={styles.headerRow}>
      <CalendarBtn direction="left" onPress={() => changeCalendar(-1)} />
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 10 }}>{year}</Text>
        <Text style={{ fontSize: 20 }}>{month}</Text>
      </View>
      <CalendarBtn direction="right" onPress={() => changeCalendar(1)} />
    </View>
  );
};

const CalendarBtn = ({ direction, onPress }) => {
  const source =
    direction == "left"
      ? calendarImage.calendarLeftBtn
      : calendarImage.calendarRightBtn;
  return (
    <Pressable onPress={onPress}>
      <Image source={source} style={{ width: 24, height: 24 }} />
    </Pressable>
  );
};

export { CalendarHeader };

const styles = StyleSheet.create({
  headerRow: {
    width: 102,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});
