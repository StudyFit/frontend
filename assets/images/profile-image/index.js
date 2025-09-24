import { useUser } from "@/contexts/UserContext";

const profileImage = {
  basic: require("./default_profile_image.png"),
  student: require("./default_student_image.png"),
  teacher: require("./default_teacher_image.png"),
};

const myDefaultProfileImage = () => {
  const { userRole } = useUser();

  return userRole === "학생" ? profileImage.student : profileImage.teacher;
};

const yourDefaultProfileImage = () => {
  const { userRole } = useUser();

  return userRole === "학생" ? profileImage.teacher : profileImage.student;
};

export { myDefaultProfileImage, yourDefaultProfileImage };
