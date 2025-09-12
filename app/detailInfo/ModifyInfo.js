import { listImage } from "@/assets";
import MainTitle from "@/components/MainTitle";
import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import RegisterScreen from "../list/RegisterScreen";
import { useUser } from "@/contexts/UserContext";

const ModifyInfo = () => {
  const { userRole } = useUser();
  const titleText = userRole == "학생" ? "선생님 수정" : "학생 수정";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.mainTitleContainer}>
        <MainTitle text={titleText} />
        <Image source={listImage.listIcon} style={{ width: 24, height: 24 }} />
      </View>

      <RegisterScreen
        modifyMode
        setAddMode={() => {}}
        studentInfo={{ studentId: 1, name: "김정은", grade: "중3" }}
      />
    </SafeAreaView>
  );
};

export default ModifyInfo;

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
