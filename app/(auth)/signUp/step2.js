import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { useSignUp } from "@/contexts/SignUpContext";
import {
  BottomBtn,
  CustomTextInput,
  RoleImage,
  RouterName,
} from "@/components";
import { loginImage } from "@/assets";

export default function Step2() {
  const [phoneNum, setPhoneNum] = useState("");
  // const [verifyCode, setVerifyCode] = useState("");
  const [nextStep, setNextStep] = useState(false);
  // const [timeLeft, setTimeLeft] = useState(180);
  const router = useRouter();
  const { signUpData, setSignUpData } = useSignUp();

  // // 타이머 작동
  // useEffect(() => {
  //   if (!nextStep) return;

  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(timer);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [nextStep]);

  // const formatTime = (sec) => {
  //   const m = String(Math.floor(sec / 60)).padStart(1, "0");
  //   const s = String(sec % 60).padStart(2, "0");
  //   return `${m}:${s}`;
  // };

  // const goToNextStep = () => {
  //   if (!phoneNum) return;
  //   setNextStep(true);
  //   setTimeLeft(180); // 재시작 가능성 대비
  // };

  const goToStep3 = () => {
    if (!phoneNum) return; // 자진프 버전
    if (phoneNum.length < 9) return;
    setSignUpData((prev) => ({ ...prev, phoneNumber: phoneNum }));
    router.push(RouterName.signUpStep3);
  };

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
      <RoleImage
        role={signUpData.role}
        style={{ marginTop: 89, marginBottom: 39 }}
      />

      {!nextStep ? (
        <>
          <CustomTextInput
            icon={loginImage.phoneNumIcon}
            placeholder="전화번호"
            value={phoneNum}
            onChangeText={setPhoneNum}
            maxLength={11}
          />
          <BottomBtn text="다음" onPress={goToStep3} />
          {/* 졸프 버전 <BottomBtn text="인증번호 발송" onPress={goToNextStep} /> */}
        </>
      ) : (
        <>
          {/* 졸프 버전
          <CustomTextInput
            icon={loginImage.verifyCodeIcon}
            placeholder="인증번호"
            value={verifyCode}
            onChangeText={setVerifyCode}
            rightElement={
              timeLeft > 0 ? (
                <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
              ) : (
                <Text style={[styles.timeText, { color: "red" }]}>
                  인증시간 만료
                </Text>
              )
            }
          />
          <Pressable style={{ marginTop: 13 }}>
            <Text style={styles.resendText}>인증번호 재발송</Text>
          </Pressable>
          <BottomBtn text="인증번호 확인" onPress={goToStep3} /> */}
        </>
      )}
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   timeText: { fontSize: 13, marginRight: 4 },
//   resendText: {
//     color: "#676767",
//     fontSize: 10,
//     textDecorationLine: "underline",
//     textDecorationColor: "#676767",
//   },
// });
