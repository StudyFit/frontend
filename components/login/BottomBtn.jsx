import { Pressable, Text } from "react-native";

export const BottomBtn = ({ text, onPress, style, notBottom }) => {
  return (
    <Pressable
      style={[
        {
          width: 310,
          height: 39,
          borderRadius: 4,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        },
        notBottom || { marginTop: "auto", marginBottom: 25 },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={{ color: "white", fontSize: 16, fontFamily: "Pretendard-Bold" }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
