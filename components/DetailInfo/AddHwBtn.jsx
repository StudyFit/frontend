import { detailInfoIcon } from "@/assets";
import React from "react";
import { Image, Pressable, Text } from "react-native";

const AddHwBtn = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        height: 24,
        flexDirection: "row",
        gap: 8,
        backgroundColor: "#DDDDDD",
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={detailInfoIcon.addHwIcon}
        style={{ width: 9.5, height: 9.5 }}
      />
      <Text style={{ fontSize: 13 }}>숙제 추가하기</Text>
    </Pressable>
  );
};

export default AddHwBtn;
