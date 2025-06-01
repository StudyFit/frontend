import { calendarImage } from "@/assets/images/calendar";
import { Image } from "react-native";

const HwIcon = ({ isAssigned, style }) => {
  return (
    <Image
      source={
        isAssigned ? calendarImage.hwDoneIcon : calendarImage.hwNotDoneIcon
      }
      style={style}
    />
  );
};

export { HwIcon };
