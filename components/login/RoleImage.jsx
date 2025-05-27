import { Image } from "react-native";
import { loginImage } from "@/assets/images/login";

export const RoleImage = ({ role, style }) => {
  return (
    <Image
      source={
        role == "student" ? loginImage.studentImage : loginImage.teacherImage
      }
      style={[{ width: 148, height: 148 }, style]}
    />
  );
};
