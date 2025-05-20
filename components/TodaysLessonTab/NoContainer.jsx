import { Text, View } from "react-native";

const NoContainer = ({ text }) => {
  return (
    <View
      style={{
        height: 124,
        backgroundColor: "#F0F0F0",
        gap: 8,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 15 }}>
        오늘은 {text == "수업" ? "수업이" : "숙제가"} 없습니다.
      </Text>
    </View>
  );
};

export default NoContainer;
