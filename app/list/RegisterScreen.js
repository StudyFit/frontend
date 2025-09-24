import { api } from "@/api";
import { getColorName, registerIcon } from "@/assets";
import {
  BottomBtn,
  ColorModal,
  ScheduleModal,
  TextInputBox,
} from "@/components";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const daysOfWeek = [
  ["월", "MONDAY"],
  ["화", "TUESDAY"],
  ["수", "WEDNESDAY"],
  ["목", "THURSDAY"],
  ["금", "FRIDAY"],
  ["토", "SATURDAY"],
  ["일", "SUNDAY"],
];

function getKoreanDay(englishDay) {
  const found = daysOfWeek.find(([korean, english]) => english === englishDay);
  return found ? found[0] : null;
}

const RegisterScreen = ({ setAddMode, studentInfo }) => {
  const [subject, setSubject] = useState("");
  const [color, setColor] = useState("");
  const [schedule, setSchedule] = useState();
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
      const requestBody = {
        studentId: studentInfo.id,
        subject,
        themeColor: getColorName(color),
        startDate: schedule?.startDate || "",
        endDate: schedule?.endDate || "",
        classTimeDtoList: schedule?.classTimeDtoList || [],
        memo: memo || "",
        address: address || "",
      };
      console.log("classTimeDtoList", schedule?.classTimeDtoList);
      await api.patch(`/connection/request`, requestBody);
      setError("");
      setAddMode(false);
    } catch (e) {
      console.error(e);
    }
  };

  const closeModal = () => setModalVisible("");

  return (
    <>
      {modalVisible === "색상" && (
        <ColorModal
          onRequestClose={closeModal}
          selectedColor={color}
          setColor={setColor}
        />
      )}

      {modalVisible === "일정" && (
        <ScheduleModal onRequestClose={closeModal} setSchedule={setSchedule} />
      )}

      <View style={styles.container}>
        <View
          style={[styles.studentNameBox, color && { backgroundColor: color }]}
        >
          <Text style={styles.studentName}>{studentInfo?.name}</Text>
          <Text style={styles.studentGrade}>{studentInfo?.grade}</Text>
        </View>

        <View style={styles.inputGroup}>
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
                  style={[styles.colorCircle, { backgroundColor: color }]}
                />
              )
            }
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.questionText}>
            추가 정보를 입력해주세요 (선택)
          </Text>
          <Pressable
            style={styles.scheduleBox}
            onPress={() => setModalVisible("일정")}
          >
            <Image
              source={registerIcon["수업 일정"]}
              style={styles.scheduleIcon}
            />
            {!!schedule ? (
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleDate}>
                  {schedule.startDate} - {schedule.endDate}
                </Text>
                {schedule.classTimeDtoList.map((classDto, i) => (
                  <Text key={i} style={styles.scheduleText}>
                    {getKoreanDay(classDto.day)} {classDto.start} ~{" "}
                    {classDto.end}
                  </Text>
                ))}
              </View>
            ) : (
              <Text style={styles.schedulePlaceholder}>수업 일정</Text>
            )}
          </Pressable>

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
          style={styles.submitBtn}
          onPress={handleRequest}
        />
      </View>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 28,
    marginTop: 20,
    gap: 23,
  },

  studentNameBox: {
    height: 50,
    flexDirection: "row",
    paddingHorizontal: 22,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  studentName: {
    fontSize: 20,
    fontFamily: "Pretendard-Bold",
  },
  studentGrade: {
    fontSize: 16,
  },

  inputGroup: {
    gap: 6,
  },
  questionText: {
    fontSize: 16,
  },

  colorCircle: {
    width: 31,
    height: 31,
    borderRadius: 100,
  },

  scheduleBox: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingLeft: 8,
    paddingVertical: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
  },
  scheduleIcon: {
    width: 24,
    height: 24,
  },
  scheduleContent: {
    gap: 18,
  },
  scheduleDate: {
    fontSize: 15,
    fontFamily: "Pretendard-Medium",
  },
  scheduleText: {
    fontSize: 15,
    fontFamily: "Pretendard-Medium",
  },
  schedulePlaceholder: {
    color: "#676767",
    fontSize: 15,
    fontFamily: "Pretendard-Medium",
  },

  errorText: {
    color: "red",
    marginTop: "auto",
    alignSelf: "center",
    fontSize: 13,
  },

  submitBtn: {
    width: "100%",
    marginTop: -10,
  },
});
