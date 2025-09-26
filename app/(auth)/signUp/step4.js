import { useRouter } from "expo-router";
import { View, SafeAreaView } from "react-native";
import { useSignUp } from "@/contexts/SignUpContext";
import {
  BottomBtn,
  CustomTextInput,
  RoleImage,
  RouterName,
} from "@/components";
import { useEffect, useState } from "react";
import { loginImage } from "@/assets";
import { apiPublic } from "@/api";

export default function Step4() {
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const router = useRouter();
  const { signUpData, setSignUpData, getFilteredSignUpData } = useSignUp();
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  useEffect(() => {
    if (readyToSubmit) {
      const submit = async () => {
        try {
          const payload = getFilteredSignUpData();
          await apiPublic.post(`/api/auth/signup/student`, payload);
          router.push(RouterName.SignUpComplete);
        } catch (e) {
          console.log(e);
          // console.error(e);
          console.log(e);
        } finally {
          setReadyToSubmit(false);
        }
      };
      submit();
    }
  }, [readyToSubmit]);

  const saveData = () => {
    if (!school || !grade) return;
    const gradeNum = Number(grade);
    if (!Number.isInteger(gradeNum)) {
      console.log("학년은 정수여야 합니다.");
      return;
    }
    setSignUpData((prev) => ({ ...prev, school, grade: gradeNum }));
    setReadyToSubmit(true);
  };

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1, paddingBottom: 30 }}>
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

      <BottomBtn text="회원가입 하기" onPress={saveData} />
    </SafeAreaView>
  );
}
