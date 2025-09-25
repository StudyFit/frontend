import { BottomBtn, RoleImage, RouterName } from "@/components";
import { useSignUp } from "@/contexts/SignUpContext";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

const SignUpComplete = () => {
  const router = useRouter();
  const { signUpData } = useSignUp();

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1, paddingBottom: 30 }}>
      <View style={{ alignItems: "center", gap: 39, marginVertical: "auto" }}>
        <RoleImage role={signUpData.role} />
        <Text style={{ fontSize: 20, fontFamily: "Pretendard-Bold" }}>
          회원가입이 완료되었습니다.
        </Text>
      </View>
      <BottomBtn
        text="로그인하러 가기"
        onPress={() => router.replace(RouterName.loginPage)}
      />
    </SafeAreaView>
  );
};

export default SignUpComplete;
