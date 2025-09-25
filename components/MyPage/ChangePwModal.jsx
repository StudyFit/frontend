import { api } from "@/api";
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
  const [currentPw, setCurrnetPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [error, setError] = useState(null);

  // 기존 비밀번호 확인
  const verifyPrevPw = async () => {
    if (!currentPw) return;
    setStep("new");
    setError(null);
  };

  // 새 비밀번호로 변경
  const changeToNewPw = async () => {
    if (!newPw) return;
    try {
      // TODO: API 요청
      const response = await api.patch(`/mypage/password`, {
        currentPassword: currentPw,
        newPassword: newPw,
      });
      console.log(response.data);
      alert("비밀번호가 변경되었습니다.");
      toggleModal();
    } catch (e) {
      if (e.status == 400) setError("비밀번호가 올바르지 않습니다.");
      else setError("오류가 발생하였습니다.");
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

          {step === "prev" ? (
            <>
              <PasswordInput pw={currentPw} setPw={setCurrnetPw} step={step} />
              <ActionButton text="확인" onPress={verifyPrevPw} />
            </>
          ) : (
            <>
              <PasswordInput pw={newPw} setPw={setNewPw} step={step} />
              <ActionButton text="변경하기" onPress={changeToNewPw} />
            </>
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
      style={{ flex: 1, fontSize: 14 }}
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
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 4,
    paddingHorizontal: 11,
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
  },
  errorText: {
    alignSelf: "center",
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
