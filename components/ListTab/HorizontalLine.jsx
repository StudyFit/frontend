import { Text, View } from "react-native";

const HorizontalLine = ({ text }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 26,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Pretendard-Medium",
          color: "#9E9E9E",
        }}
      >
        {text}
      </Text>
      <View
        style={{
          width: "77%",
          height: 0.5,
          backgroundColor: "#9E9E9E",
        }}
      ></View>
    </View>
  );
};

export { HorizontalLine };
