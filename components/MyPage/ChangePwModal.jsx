import { loginImage } from "@/assets";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const ChangePwModal = ({ toggleModal }) => {
  const [step, setStep] = useState("prev"); // "prev" | "new"
  const [pw, setPw] = useState("");
  const [error, setError] = useState(null);

  // 기존 비밀번호 확인
  const verifyPrevPw = async () => {
    if (!pw) return;
    try {
      // TODO: API 요청
      setStep("new");
      setPw("");
      setError(null);
    } catch (e) {
      setError("비밀번호가 일치하지 않습니다.");
    }
  };

  // 새 비밀번호로 변경
  const changeToNewPw = async () => {
    if (!pw) return;
    try {
      // TODO: API 요청
      toggleModal();
    } catch (e) {
      setError("비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <Modal transparent animationType="fade">
      <Pressable style={styles.modalBackground} onPress={toggleModal}>
        <Pressable
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={styles.titleText}>
            {step === "prev"
              ? "기존 비밀번호를 입력해주세요."
              : "새 비밀번호를 입력해주세요."}
          </Text>

          <PasswordInput pw={pw} setPw={setPw} step={step} />

          {step === "prev" ? (
            <ActionButton text="확인" onPress={verifyPrevPw} />
          ) : (
            <ActionButton text="변경하기" onPress={changeToNewPw} />
          )}

          {error && <Text style={styles.errorText}>{error}</Text>}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const PasswordInput = ({ pw, setPw, step }) => (
  <View style={styles.inputBox}>
    <Image source={loginImage.passwordIcon} style={{ width: 16, height: 21 }} />
    <TextInput
      placeholder={step === "prev" ? "기존 비밀번호" : "새 비밀번호"}
      value={pw}
      onChangeText={setPw}
      style={{ flex: 1, fontSize: 16 }}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry
      maxLength={20}
    />
  </View>
);

const ActionButton = ({ text, onPress }) => (
  <Pressable onPress={onPress} style={styles.confirmBtn}>
    <Text style={{ color: "white", fontSize: 16 }}>{text}</Text>
  </Pressable>
);

export { ChangePwModal };

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    width: 280,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 24,
  },
  titleText: {
    fontSize: 16,
    paddingBottom: 10,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 4,
    paddingHorizontal: 11,
    paddingVertical: 8,
    marginVertical: 10,
    gap: 9,
  },
  confirmBtn: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 4,
    marginTop: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
