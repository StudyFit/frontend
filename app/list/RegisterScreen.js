import { api } from "@/api";
import { registerIcon, themeColorName, themeColors } from "@/assets";
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

function getColorName(hex) {
  return Object.entries(themeColors).find(([_, value]) => value === hex)?.[0];
}

const RegisterScreen = ({ setAddMode, studentInfo }) => {
  const [subject, setSubject] = useState("");
  const [color, setColor] = useState("");
  const [schedule, setSchedule] = useState();
  const [address, setAddress] = useState("");
  const [memo, setMemo] = useState("");
  const [modalVisible, setModalVisible] = useState("");
  const [error, setError] = useState("");

  // 학생 추가 로직
  const handleRequest = async () => {
    if (!subject || !color) {
      setError("필수 정보를 모두 입력해주세요.");
      return;
    }
    try {
      const requestBody = {
        studentId: studentInfo.id,
        subject,
        themeColor: themeColorName[getColorName(color)],
        startDate: schedule?.startDate || "",
        endDate: schedule?.endDate || "",
        classTimeDtoList: schedule?.classTimeDtoList || [],
        memo: memo || "",
        address: address || "",
      };

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
          <Pressable
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              paddingLeft: 8,
              paddingVertical: 10,
              backgroundColor: "#F2F2F2",
              borderRadius: 8,
            }}
            onPress={() => setModalVisible("일정")}
          >
            <Image
              source={registerIcon["수업 일정"]}
              style={{
                width: 24,
                height: 24,
              }}
            />
            {!!schedule ? (
              <View style={{ gap: 18 }}>
                <Text style={{ fontSize: 15, fontFamily: "Pretendard-Medium" }}>
                  {schedule.startDate} - {schedule.endDate}
                </Text>
                {schedule.classTimeDtoList.map((classDto, i) => (
                  <Text
                    key={i}
                    style={{ fontSize: 15, fontFamily: "Pretendard-Medium" }}
                  >
                    {getKoreanDay(classDto.day)} {classDto.startTime} ~{" "}
                    {classDto.endTime}
                  </Text>
                ))}
              </View>
            ) : (
              <Text
                style={{
                  color: "#676767",
                  fontSize: 15,
                  fontFamily: "Pretendard-Medium",
                }}
              >
                수업 일정
              </Text>
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
