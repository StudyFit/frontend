const { calendarImage } = require("@/assets/images/calendar");
const { View, Pressable, Image } = require("react-native");

const ShowScheduleToggle = ({ classShow, setClassShow, hwShow, setHwShow }) => {
  const classSource = classShow
    ? calendarImage.classShowOnToggle
    : calendarImage.classShowOffToggle;
  const hwSource = hwShow
    ? calendarImage.hwShowOnToggle
    : calendarImage.hwShowOffToggle;

  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      <Pressable onPress={setClassShow}>
        <Image source={classSource} style={{ width: 40, height: 16 }} />
      </Pressable>
      <Pressable onPress={setHwShow}>
        <Image source={hwSource} style={{ width: 40, height: 16 }} />
      </Pressable>
    </View>
  );
};
export { ShowScheduleToggle };
