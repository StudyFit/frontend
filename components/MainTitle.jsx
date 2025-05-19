import { StyleSheet, Text } from "react-native";

const MainTitle = ({ text, style }) => {
  return <Text style={[styles.titleText, style]}>{text}</Text>;
};

export default MainTitle;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 25,
    fontFamily: "Pretendard-Bold",
  },
});
