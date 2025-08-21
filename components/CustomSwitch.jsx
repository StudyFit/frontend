import { Switch, View } from "react-native";

export const CustomSwitch = ({
  value = false,
  onValueChange = () => {},
  scale = 1,
  style = {},
}) => {
  return (
    <View style={[{ marginHorizontal: -8, marginVertical: -5 }, style]}>
      <Switch
        trackColor={{ false: "white", true: "black" }}
        thumbColor="white"
        ios_backgroundColor="#D9D9D9"
        onValueChange={onValueChange}
        value={value}
        style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
      />
    </View>
  );
};
