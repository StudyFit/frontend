import { listImage } from "@/assets";
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

const AddStudentModal = ({ toggleModal, setAddMode, setStudentInfo }) => {
  const [type, setType] = useState("search"); // "search" or "add"
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState(null);

  // 학생 검색하는 함수
  const searchStudent = () => {
    if (!studentId) {
      setError("학생 ID를 입력해주세요!");
      return;
    }
    // 오류1 : 이미 추가한 사용자인 경우
    // 오류2 : 없는 사용자인 경우
    //   setError("없는 아이디입니다!");
    // 성공 : 추가할 학생 정보 띄우기
    setStudentInfo({ studentId: studentId, name: "김정은", grade: "중3" });
    setType("add");
  };

  // 학생 추가하는 함수
  const addStudent = () => {
    toggleModal();
    setAddMode(true);
  };

  return (
    <Modal transparent animationType="fade">
      <Pressable style={styles.modalBackground} onPress={toggleModal}>
        <Pressable
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={{ fontSize: 16, paddingLeft: 4 }}>
            {type == "search"
              ? "학생 ID를 입력해주세요"
              : "이 학생을 추가하시겠습니까?"}
          </Text>
          {type == "search" ? (
            <View style={styles.idInputBox}>
              <Image
                source={listImage.studentIdIcon}
                style={{ width: 16, height: 16 }}
              />
              <TextInput
                placeholder="학생 ID"
                value={studentId}
                onChangeText={setStudentId}
                style={{ height: 20, fontSize: 16 }}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={20}
              />
            </View>
          ) : (
            <View
              style={[styles.idInputBox, { justifyContent: "space-between" }]}
            >
              <Text style={{ fontFamily: "Pretendard-Bold", fontSize: 16 }}>
                김정은
              </Text>
              <Text style={{ fontSize: 16 }}>중3</Text>
            </View>
          )}
          <NextStepButton
            text={type == "search" ? "확인" : "추가하기"}
            onPress={type == "search" ? searchStudent : addStudent}
          />
          <Text style={styles.errorText}>{error}</Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const NextStepButton = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.confirmBtn}>
      <Text style={{ color: "white" }}>{text}</Text>
    </Pressable>
  );
};

export { AddStudentModal };

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    width: 280,
    height: 163,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 24,
    paddingBottom: 11,
  },
  idInputBox: {
    width: "100%",
    flexDirection: "row",
    gap: 8.6,
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 11,
    paddingVertical: 8,
    marginVertical: 10,
    borderRadius: 4,
  },
  confirmBtn: {
    width: "100%",
    height: 34,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    marginBottom: 5,
    borderRadius: 4,
  },
  errorText: { color: "red", fontSize: 12, paddingLeft: 5 },
});
