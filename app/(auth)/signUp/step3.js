import { useRouter } from "expo-router";
import {
  View,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSignUp } from "@/contexts/SignUpContext";
import { useState } from "react";
import {
  BottomBtn,
  CustomTextInput,
  RoleImage,
  RouterName,
} from "@/components";
import { loginImage } from "@/assets";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import api from "@/api";

export default function Step3() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const router = useRouter();
  const { signUpData, setSignUpData, getFilteredSignUpData } = useSignUp();

  const goToStep4 = async () => {
    if (await saveData()) router.push(RouterName.signUpStep4);
  };

  const goToComplete = async () => {
    if (await saveData()) {
      try {
        const payload = getFilteredSignUpData();
        await api.post(`/api/auth/signup/teacher`, payload);
        router.push(RouterName.SignUpComplete);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const saveData = async () => {
    if (!id || !pw || !pwConfirm || !name || !birth) return false;
    if (pw !== pwConfirm) return false;
    await setSignUpData((prev) => ({
      ...prev,
      loginId: id,
      password: pw,
      name: name,
      birth: birth,
    }));
    return true;
  };

  // 날짜를 YYYY-MM-DD 형식으로 변환
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
      <RoleImage
        role={signUpData.role}
        style={{ marginTop: 89, marginBottom: 39 }}
      />
      <View style={{ gap: 6 }}>
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
            <ShowSecureTextEntry
              show={!!showPw}
              onPress={() => setShowPw(!showPw)}
            />
          }
        />
        <CustomTextInput
          icon={loginImage.passwordIcon}
          placeholder="비밀번호 확인"
          value={pwConfirm}
          onChangeText={setPwConfirm}
          secureTextEntry={!showPwConfirm}
          rightElement={
            <ShowSecureTextEntry
              show={!!showPwConfirm}
              onPress={() => setShowPwConfirm(!showPwConfirm)}
            />
          }
        />
        <CustomTextInput
          icon={loginImage.humanIcon}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={styles.dateInputContainer}
        >
          <Image
            source={loginImage.calendarIcon}
            style={{ width: 19, height: 19, marginLeft: 2, marginRight: 5 }}
            resizeMode="contain"
          />
          <TextInput
            placeholder="생년월일"
            value={formatDate(birth)}
            editable={false}
            style={{ flex: 1, fontSize: 16, color: birth ? "#000" : "#888" }}
            pointerEvents="none"
          />
        </Pressable>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          date={birth ? new Date(birth) : new Date()}
          maximumDate={new Date()}
          onConfirm={(date) => {
            setBirth(date);
            setShowDatePicker(false);
          }}
          onCancel={() => setShowDatePicker(false)}
        />
      </View>

      {signUpData.role == "student" ? (
        <BottomBtn text="다음" onPress={goToStep4} />
      ) : (
        <BottomBtn text="회원가입 하기" onPress={goToComplete} />
      )}
    </SafeAreaView>
  );
}

const ShowSecureTextEntry = ({ show, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={show ? loginImage.eyeOnIcon : loginImage.eyeOffIcon}
        style={{ width: 19, height: 19, marginLeft: 2, marginRight: 5 }}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dateInputContainer: {
    width: 310,
    height: 39,
    backgroundColor: "#F2F2F2",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
});
