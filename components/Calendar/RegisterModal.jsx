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
import { commonStyles } from "./ModalInputStyle";
import { useUser } from "@/contexts/UserContext";
import { api } from "@/api";

const acceptedList = (userRole, list) => {
  return list.filter((elt) => {
    const status = userRole == "학생" ? elt.connectionStatus : elt.friendStatus;
    return status == "ACCEPTED";
  });
};

function RegisterModal({ visible, registerModalType, closeRegisterModal }) {
  const { userRole } = useUser();
  const [studentList, setStudentList] = useState([]);
  const [selectedConnectionId, setSelectedConnectionId] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hwDeadline, setHwDeadline] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const loadList = async () => {
      try {
        const url = `/connection/${
          userRole == "학생" ? "teachers" : "students"
        }`;
        const response = await api.get(url);
        setStudentList(acceptedList(userRole, response.data.data));
        console.log(acceptedList(userRole, response.data.data));
      } catch (e) {
        console.error(e);
      }
    };
    loadList();
  }, []);

  // 모달이 처음 열릴 때 날짜 저장
  useEffect(() => {
    if (visible) setSelectedDate(new Date().toISOString());
  }, [visible]);

  const handleModalClose = () => {
    setSelectedConnectionId(null);
    closeRegisterModal();
  };

  const registerSchedule = async () => {
    if (!selectedConnectionId) return;

    // 공통 데이터
    const payload = {
      connectionId: selectedConnectionId,
      content,
      scheduleType: registerModalType == "수업" ? "CLASS" : "ETC",
      selectedDate: selectedDate.split("T")[0],
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
    if (registerModalType !== "숙제") {
      try {
        await api.post(`/calendar/schedule`, payload);
        handleModalClose();
      } catch (e) {
        console.error(e);
      }
    }
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
                  selectedConnectionId={selectedConnectionId}
                  setSelectedConnectionId={setSelectedConnectionId}
                />
                {registerModalType !== "숙제" ? (
                  <View>
                    <Text style={commonStyles.titleText}>일정 시간</Text>
                    <ScheduleTimeInput
                      startTime={startTime}
                      setStartTime={setStartTime}
                      endTime={endTime}
                      setEndTime={setEndTime}
                    />
                  </View>
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
