import { themeColorName } from "@/assets";
import { BottomBtn, ColorModal } from "@/components";
import { TextInputBox } from "@/components/ListTab/register/TextInputBox";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const RegisterScreen = ({ setAddMode, studentInfo }) => {
  const [subject, setSubject] = useState("");
  const [color, setColor] = useState("");
  const [schedule, setSchedule] = useState("");
  const [address, setAddress] = useState("");
  const [memo, setMemo] = useState("");
  const [modalVisible, setModalVisible] = useState("");
  const [error, setError] = useState("");

  const handleRequest = async () => {
    if (!subject || !color) {
      setError("필수 정보를 모두 입력해주세요.");
      return;
    }
    try {
      setError("");
      const requestBody = {
        studentId: studentInfo.studentId,
        subject,
        themeColor: themeColorName[color],
      };
      // 나머지 선택 정보 있는지 확인하고 requestBody에 추가
      // api 요청 보내기
      setAddMode(false);
    } catch (e) {
      console.error(e);
    }
  };

  const closeModal = () => setModalVisible("");

  return (
    <>
      <ColorModal
        visible={modalVisible === "색상"}
        onRequestClose={closeModal}
        selectedColor={color}
        setColor={setColor}
      />

      <View style={styles.container}>
        <View
          style={[styles.studentNameBox, color && { backgroundColor: color }]}
        >
          <Text style={{ fontSize: 20, fontFamily: "Pretendard-Bold" }}>
            {studentInfo?.name}
          </Text>
          <Text style={{ fontSize: 16 }}>{studentInfo?.grade}</Text>
        </View>

        <View style={{ gap: 6 }}>
          <Text style={styles.questionText}>필수 정보를 입력해주세요</Text>
          <TextInputBox
            placeholder="과목"
            value={subject}
            onChangeText={setSubject}
          />
          <TextInputBox
            placeholder="색상"
            value={color && "캘린더 색상"}
            onChangeText={setColor}
            editable={false}
            onPress={() => setModalVisible("색상")}
            rightElement={
              color && (
                <View
                  style={[
                    { width: 31, height: 31, borderRadius: "100%" },
                    { backgroundColor: color },
                  ]}
                ></View>
              )
            }
          />
        </View>

        <View style={{ gap: 6 }}>
          <Text style={styles.questionText}>
            추가 정보를 입력해주세요 (선택)
          </Text>
          <TextInputBox
            placeholder="수업 일정"
            value={schedule}
            onChangeText={setSchedule}
            editable={false}
            onPress={() => setModalVisible("일정")}
          />
          <TextInputBox
            placeholder="주소"
            value={address}
            onChangeText={setAddress}
          />
          <TextInputBox
            placeholder="메모"
            value={memo}
            onChangeText={setMemo}
          />
        </View>

        <Text style={styles.errorText}>{error}</Text>
        <BottomBtn
          text="요청하기"
          style={{ width: "100%", marginTop: -10 }}
          onPress={handleRequest}
        />
      </View>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 28, marginTop: 20, gap: 23 },

  questionText: { fontSize: 16 },

  studentNameBox: {
    height: 50,
    flexDirection: "row",
    paddingHorizontal: 22,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },

  errorText: {
    color: "red",
    marginTop: "auto",
    alignSelf: "center",
    fontSize: 13,
  },
});
