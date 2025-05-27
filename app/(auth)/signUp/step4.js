import { useRouter } from "expo-router";
import { View, Text, Button, SafeAreaView } from "react-native";
import { useSignUp } from "@/contexts/SignUpContext";
import {
  BottomBtn,
  CustomTextInput,
  RoleImage,
  RouterName,
} from "@/components";
import { useState } from "react";
import { loginImage } from "@/assets";

export default function Step1() {
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const router = useRouter();
  const { signUpData, setSignUpData } = useSignUp();

  const goToComplete = () => {
    if (!school || !grade) return;
    router.push(RouterName.SignUpComplete);
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
