import { listImage } from "@/assets";
import { Image, Pressable } from "react-native";

const AddStudentBtn = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: "absolute",
        bottom: 37,
        right: 19,
      }}
    >
      <Image
        source={listImage.addStudentBtn}
        style={{ width: 43, height: 43 }}
      />
    </Pressable>
  );
};

export { AddStudentBtn };
