import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { StudentInput } from "./StudentInput";
import { ScheduleTimeInput } from "./ScheduleTimeInput";
import { HwDeadlineInput } from "./HwDeadlineInput";
import { ContentInput } from "./ContentInput";

const data = ["김정은 - 국어", "장유빈 - 영어", "정채영 - 수학"]; // api로 받아올 학생 목록을 가정

function RegisterModal({ visible, registerModalType, closeRegisterModal }) {
  const [studentList, setStudentList] = useState(data);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hwDeadline, setHwDeadline] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // 모달이 처음 열릴 때 날짜 저장
  useEffect(() => {
    if (visible) setSelectedDate(new Date().toISOString());
  }, [visible]);

  const handleModalClose = () => {
    setSelectedStudent("");
    closeRegisterModal();
  };

  const registerSchedule = () => {
    if (!selectedStudent) return;

    // 공통 데이터
    const payload = {
      student: selectedStudent,
      content,
      type: registerModalType,
      selectedDate,
    };

    // 타입별로 필요한 데이터만 추가
    if (registerModalType === "숙제") {
      payload.hwDeadline = hwDeadline;
    } else {
      payload.startTime = startTime;
      payload.endTime = endTime;
    }

    // 나중에 axios.post("/api/schedule", payload) 등으로 사용
    console.log("등록 데이터:", payload);

    handleModalClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleModalClose}
    >
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.inputGroup}>
                <StudentInput
                  studentList={studentList}
                  selectedStudent={selectedStudent}
                  setSelectedStudent={setSelectedStudent}
                />
                {registerModalType !== "숙제" ? (
                  <ScheduleTimeInput
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                  />
                ) : (
                  <HwDeadlineInput
                    hwDeadline={hwDeadline}
                    setHwDeadline={setHwDeadline}
                  />
                )}
                <ContentInput content={content} setContent={setContent} />
              </View>

              <Pressable
                style={styles.registerButton}
                onPress={registerSchedule}
              >
                <Text style={styles.registerButtonText}>등록하기</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export { RegisterModal };

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 20,
    paddingHorizontal: 25,
    paddingBottom: 50,
  },
  inputGroup: {
    gap: 17,
  },
  registerButton: {
    width: "100%",
    height: 38,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginTop: 44,
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
  },
});
