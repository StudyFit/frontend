import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "expo-router";
import { BottomBtn, CustomTextInput, RouterName } from "@/components";
import { loginImage } from "@/assets";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const handleLogin = async () => {
    if (!id || !pw) return;
    if (await login(id, pw)) {
      router.replace(RouterName.TodaysLessonTab);
    } else {
      // 로그인 실패
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 33,
      }}
    >
      <Image
        source={loginImage.logoImage}
        style={{ width: 152, height: 184, marginTop: 128, marginBottom: 25 }}
      />

      <View style={{ gap: 5.7 }}>
        <CustomTextInput
          icon={loginImage.humanIcon}
          placeholder="아이디"
          value={id}
          onChangeText={setId}
        />

        <CustomTextInput
          icon={loginImage.passwordIcon}
          placeholder="비밀번호"
          value={pw}
          onChangeText={setPw}
          secureTextEntry={!showPw}
          rightElement={
            <Pressable onPress={() => setShowPw((prev) => !prev)}>
              <Image
                source={showPw ? loginImage.eyeOnIcon : loginImage.eyeOffIcon}
                style={{ width: 18, height: 14, marginRight: 11 }}
              />
            </Pressable>
          }
        />
      </View>

      <BottomBtn
        text="로그인"
        onPress={handleLogin}
        notBottom
        style={{ marginVertical: "18" }}
      />

      <View style={{ flexDirection: "row", gap: 6 }}>
        <Pressable onPress={() => router.push("/(auth)/signUp")}>
          <Text>회원가입</Text>
        </Pressable>

        {/* 졸프 버전 */}
        <Image
          source={loginImage.verticalLine}
          style={{ width: 1, height: 18 }}
        />
        <Pressable>
          <Text>아이디 찾기</Text>
        </Pressable>
        <Image
          source={loginImage.verticalLine}
          style={{ width: 1, height: 18 }}
        />
        <Pressable>
          <Text>비밀번호 찾기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
