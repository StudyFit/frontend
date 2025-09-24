import ListScreen from "@/app/list/ListScreen";
import { useState } from "react";
import RegisterScreen from "@/app/list/RegisterScreen";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import MainTitle from "@/components/MainTitle";
import { listImage } from "@/assets";
import { useUser } from "@/contexts/UserContext";

export default function List() {
  const [addMode, setAddMode] = useState(false);
  const [studentInfo, setStudentInfo] = useState({ name: "", grade: "" });
  const { userRole } = useUser();
  const titleText = addMode
    ? "학생 추가"
    : userRole == "학생"
    ? "선생님 목록"
    : "학생 목록";

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingVertical: 30 }}
    >
      <View style={styles.mainTitleContainer}>
        <MainTitle text={titleText} />
        <Image source={listImage.listIcon} style={{ width: 24, height: 24 }} />
      </View>

      {addMode ? (
        <RegisterScreen setAddMode={setAddMode} studentInfo={studentInfo} />
      ) : (
        <ListScreen setAddMode={setAddMode} setStudentInfo={setStudentInfo} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 13,
    paddingHorizontal: 27,
    marginLeft: 7,
  },
});
