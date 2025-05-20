import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Image,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { loginImage } from "@/assets/images/login";
import { useRouter } from "expo-router";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const { login } = useUser();
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 33,
        backgroundColor: "white",
      }}
    >
      <Image
        source={loginImage.logoImage}
        style={{ width: 152, height: 184, marginTop: 128, marginBottom: 25 }}
      />

      <View style={{ gap: 5.7 }}>
        <Pressable style={{ backgroundColor: "#F2F2F2", borderRadius: 4 }}>
          <TextInput
            placeholder="아이디"
            value={id}
            onChangeText={setId}
            style={{
              width: 310,
              height: 39,
            }}
          />
        </Pressable>

        <Pressable style={{ backgroundColor: "#F2F2F2", borderRadius: 4 }}>
          <TextInput
            placeholder="비밀번호"
            value={pw}
            onChangeText={setPw}
            secureTextEntry
            style={{
              width: 310,
              height: 39,
              borderRadius: 4,
            }}
          />
        </Pressable>
      </View>

      <Pressable
        style={{
          width: 310,
          height: 39,
          borderRadius: 4,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 17.7,
        }}
        onPress={() => {
          login("학생");
          console.log("학생");
          setPw("");
        }}
      >
        <Text style={{ color: "white" }}>로그인</Text>
      </Pressable>

      <View style={{ flexDirection: "row", gap: 6 }}>
        <Pressable onPress={() => router.push("/(auth)/signUp")}>
          <Text>회원가입</Text>
        </Pressable>
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
