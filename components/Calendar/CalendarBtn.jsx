import { calendarImage } from "@/assets/images/calendar";
import { Image, TouchableOpacity } from "react-native";

const CalendarBtn = ({ direction, onPress }) => {
  const source =
    direction == "left"
      ? calendarImage.calendarLeftBtn
      : calendarImage.calendarRightBtn;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
  );
};

export { CalendarBtn };
