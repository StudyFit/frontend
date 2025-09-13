import { registerIcon } from "@/assets";
import { ScheduleTimeInput } from "@/components/Calendar";
import { BottomBtn } from "@/components/login";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ClassPeriodModal from "./ClassPeriodModal";
import { set } from "date-fns";

const daysOfWeek = [
  ["월", "MONDAY"],
  ["화", "TUESDAY"],
  ["수", "WEDNESDAY"],
  ["목", "THURSDAY"],
  ["금", "FRIDAY"],
  ["토", "SATURDAY"],
  ["일", "SUNDAY"],
];

const ScheduleModal = ({ onRequestClose, schedule, setSchedule }) => {
  const [isModalVisible, setIsModalVisible] = useState("main"); // main, start, end
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0][0]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [classTimeDtoList, setClassTimeDtoList] = useState([]);
  const [error, setError] = useState("");

  const selectDay = () => {
    const currentIndex = daysOfWeek.findIndex((day) => day[0] === selectedDay);
    const nextIndex = (currentIndex + 1) % daysOfWeek.length;
    setSelectedDay(daysOfWeek[nextIndex][0]);
  };

  const addSchedule = () => {
    if (!startTime || !endTime) return;

    const day =
      daysOfWeek[daysOfWeek.findIndex((day) => day[0] === selectedDay)][1];

    const classTimeDto = {
      day,
      startTime,
      endTime,
    };
    // 중복 검사
    const isDuplicate = classTimeDtoList.some(
      (item) =>
        item.day === classTimeDto.day &&
        item.startTime === classTimeDto.startTime &&
        item.endTime === classTimeDto.endTime
    );
    if (isDuplicate) {
      setError("이미 같은 요일과 시간이 추가되어 있습니다.");
      return;
    }
    setClassTimeDtoList((prev) => [...prev, classTimeDto]);

    // 초기화
    setStartDate("");
    setEndDate("");
    setSelectedDay(daysOfWeek[0][0]);
    setStartTime("");
    setEndTime("");
    setError("");
  };

  const deleteSchedule = (index) =>
    setClassTimeDtoList((prev) => prev.filter((_, i) => i !== index));

  const backToMain = () => setIsModalVisible("main");

  const saveSchedule = () => {
    setSchedule({
      startDate,
      endDate,
      classTimeDtoList,
    });
    setError("");
    onRequestClose();
  };

  return (
    <>
      <Modal transparent animationType="slide" onRequestClose={onRequestClose}>
        {isModalVisible === "main" ? (
          <Pressable style={styles.overlay} onPress={onRequestClose}>
            <View style={styles.modalBox}>
              {/* Header */}
              <View style={styles.header}>
                <Image
                  source={registerIcon["수업 일정"]}
                  style={styles.headerIcon}
                />
                <Text style={styles.headerText}>수업 일정</Text>
              </View>

              <View style={{ gap: 7, marginBottom: 19 }}>
                <Text style={{ fontSize: 20 }}>수업 기간</Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <Pressable
                    style={styles.textInput}
                    onPress={() => setIsModalVisible("start")}
                  >
                    <Text style={styles.text}>{startDate}</Text>
                  </Pressable>
                  <Image
                    source={registerIcon.dashIcon}
                    style={{ width: 24, height: 24 }}
                  />
                  <Pressable
                    style={styles.textInput}
                    onPress={() => setIsModalVisible("end")}
                  >
                    <Text style={styles.text}>{endDate}</Text>
                  </Pressable>
                </View>
              </View>

              <View style={{ gap: 5, marginBottom: 20 }}>
                <Text style={{ fontSize: 20 }}>수업 요일</Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Pressable
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#F0F0F0",
                    }}
                    onPress={selectDay}
                  >
                    <Text style={{ fontSize: 16 }}>{selectedDay}</Text>
                  </Pressable>
                  <View style={{ flex: 1 }}>
                    <ScheduleTimeInput
                      startTime={startTime}
                      setStartTime={setStartTime}
                      endTime={endTime}
                      setEndTime={setEndTime}
                      visible={true}
                    />
                  </View>
                </View>

                <Pressable
                  style={{
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#DDDDDD",
                    borderRadius: 4,
                  }}
                  onPress={addSchedule}
                >
                  <Text style={{ fontSize: 16, color: "#555555" }}>
                    + 추가하기
                  </Text>
                </Pressable>
              </View>
              <ScrollView>
                <View style={{ gap: 12 }}>
                  {classTimeDtoList.map((classDto, index) => {
                    const day =
                      daysOfWeek[
                        daysOfWeek.findIndex((day) => day[1] === classDto.day)
                      ][0];

                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text style={[{ fontSize: 16 }, { marginRight: 14 }]}>
                          {day}
                        </Text>
                        <Text
                          style={[{ fontSize: 16 }, { marginRight: "auto" }]}
                        >
                          {classDto.startTime} ~ {classDto.endTime}
                        </Text>
                        <Pressable
                          style={{
                            width: 48,
                            height: 26,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                            borderWidth: 1.3,
                            borderColor: "red",
                          }}
                          onPress={() => deleteSchedule(index)}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              fontFamily: "Pretendard-Bold",
                              color: "red",
                            }}
                          >
                            삭제
                          </Text>
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
              {error && <ErrorText error={error} />}
              {/* Save Button */}
              <BottomBtn
                text="저장하기"
                onPress={saveSchedule}
                style={styles.saveBtn}
              />
            </View>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.overlay, { justifyContent: "center" }]}
            onPress={backToMain}
          >
            {isModalVisible === "start" ? (
              <ClassPeriodModal
                setDate={setStartDate}
                backToMain={backToMain}
                maximum={endDate}
              />
            ) : (
              <ClassPeriodModal
                setDate={setEndDate}
                backToMain={backToMain}
                minimum={startDate}
              />
            )}
          </Pressable>
        )}
      </Modal>
    </>
  );
};

const ErrorText = ({ error }) => (
  <Text
    style={{
      color: "red",
      alignSelf: "center",
      fontSize: 15,
      marginTop: 15,
    }}
  >
    {error}
  </Text>
);

export { ScheduleModal };

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.22)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalBox: {
    width: "100%",
    paddingHorizontal: 27,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  },
  headerIcon: { width: 30, height: 30 },
  headerText: { fontSize: 20, fontFamily: "Pretendard-Bold" },
  colorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
    justifyContent: "space-between",
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: { width: 20, height: 20 },
  saveBtn: { width: "100%", marginTop: 16 },

  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 16 },
});
