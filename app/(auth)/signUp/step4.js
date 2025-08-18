import { useRouter } from "expo-router";
import { View, SafeAreaView } from "react-native";
import { useSignUp } from "@/contexts/SignUpContext";
import {
  BottomBtn,
  CustomTextInput,
  RoleImage,
  RouterName,
} from "@/components";
import { useState } from "react";
import { loginImage } from "@/assets";
import { apiPublic } from "@/api";

export default function Step4() {
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const router = useRouter();
  const { signUpData, setSignUpData, getFilteredSignUpData } = useSignUp();

  const goToComplete = async () => {
    if (await saveData()) {
      try {
        const payload = getFilteredSignUpData();
        console.log(payload);

        await apiPublic.post(`/api/auth/signup/student`, payload);
        router.push(RouterName.SignUpComplete);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const saveData = async () => {
    if (!school || !grade) return;
    const gradeNum = Number(grade);
    if (!Number.isInteger(gradeNum)) {
      console.log("학년은 정수여야 합니다.");
      return;
    }
    await setSignUpData((prev) => ({
      ...prev,
      school: school,
      grade: gradeNum,
    }));
    return true;
  };

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
      <RoleImage
        role={signUpData.role}
        style={{ marginTop: 89, marginBottom: 39 }}
      />

      <View style={{ gap: 6 }}>
        <CustomTextInput
          icon={loginImage.schoolIcon}
          placeholder="학교"
          value={school}
          onChangeText={setSchool}
        />
        <CustomTextInput
          icon={loginImage.gradeIcon}
          placeholder="학년"
          value={grade}
          onChangeText={setGrade}
        />
      </View>

      <BottomBtn text="회원가입 하기" onPress={goToComplete} />
    </SafeAreaView>
  );
}
