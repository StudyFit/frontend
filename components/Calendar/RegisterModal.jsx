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
  const [photoRequired, setPhotoRequired] = useState(false);
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
    if (!selectedConnectionId || !content || !startTime || !endTime) return;

    // 공통 데이터
    const payload = {
      connectionId: selectedConnectionId,
      content,
      scheduleType: registerModalType == "수업" ? "CLASS" : "ETC",
      date: selectedDate.split("T")[0],
      startTime: startTime,
      endTime: endTime,
    };

    try {
      const response = await api.post(`/calendar/schedule`, payload);
      console.log(response.data);
      console.log("등록한 일정", payload);
      handleModalClose();
    } catch (e) {
      console.error(e);
    }
  };

  const registerHomework = async () => {
    if (!selectedConnectionId || !hwDeadline || !content) return;

    // 공통 데이터
    const payload = {
      content,
      date: hwDeadline,
      photoRequired,
    };

    console.log("등록 데이터:", payload);

    try {
      const res = await api.post(`/homeworks/${selectedConnectionId}`, payload);
      console.log(res.data);
      handleModalClose();
    } catch (e) {
      console.error(e);
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
                  <>
                    <View>
                      <Text style={commonStyles.titleText}>일정 시간</Text>
                      <ScheduleTimeInput
                        startTime={startTime}
                        setStartTime={setStartTime}
                        endTime={endTime}
                        setEndTime={setEndTime}
                      />
                    </View>
                    <ContentInput content={content} setContent={setContent} />
                  </>
                ) : (
                  <>
                    <HwDeadlineInput
                      hwDeadline={hwDeadline}
                      setHwDeadline={setHwDeadline}
                    />
                    <ContentInput
                      content={content}
                      setContent={setContent}
                      registerModalType={registerModalType}
                      photoRequired={photoRequired}
                      togglePhotoRequired={() =>
                        setPhotoRequired(!photoRequired)
                      }
                    />
                  </>
                )}
              </View>

              <Pressable
                style={styles.registerButton}
                onPress={
                  registerModalType !== "숙제"
                    ? registerSchedule
                    : registerHomework
                }
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
