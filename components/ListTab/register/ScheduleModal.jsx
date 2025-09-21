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
import { registerIcon } from "@/assets";
import { ScheduleTimeInput } from "@/components/Calendar";
import { BottomBtn } from "@/components/login";
import ClassPeriodModal from "./ClassPeriodModal";

const daysOfWeek = [
  ["월", "MONDAY"],
  ["화", "TUESDAY"],
  ["수", "WEDNESDAY"],
  ["목", "THURSDAY"],
  ["금", "FRIDAY"],
  ["토", "SATURDAY"],
  ["일", "SUNDAY"],
];

const ScheduleModal = ({ onRequestClose, setSchedule }) => {
  const [isModalVisible, setIsModalVisible] = useState("main"); // main, start, end
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0][0]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [classTimeDtoList, setClassTimeDtoList] = useState([]);
  const [error, setError] = useState("");

  const selectDay = () => {
    const currentIndex = daysOfWeek.findIndex(
      ([korean]) => korean === selectedDay
    );
    const nextIndex = (currentIndex + 1) % daysOfWeek.length;
    setSelectedDay(daysOfWeek[nextIndex][0]);
  };

  const addSchedule = () => {
    if (!start || !end) return;

    const day = daysOfWeek.find(([korean]) => korean === selectedDay)[1];
    const newSchedule = { day, start, end };

    if (
      classTimeDtoList.some(
        (item) => item.day === day && item.start === start && item.end === end
      )
    ) {
      setError("이미 같은 요일과 시간이 추가되어 있습니다.");
      return;
    }

    setClassTimeDtoList((prev) => [...prev, newSchedule]);
    resetTimeInputs();
  };

  const resetTimeInputs = () => {
    setSelectedDay(daysOfWeek[0][0]);
    setStart("");
    setEnd("");
    setError("");
  };

  const deleteSchedule = (index) => {
    setClassTimeDtoList((prev) => prev.filter((_, i) => i !== index));
  };

  const backToMain = () => setIsModalVisible("main");

  const saveSchedule = () => {
    setSchedule({ startDate, endDate, classTimeDtoList });
    setError("");
    onRequestClose();
  };

  return (
    <Modal transparent animationType="slide" onRequestClose={onRequestClose}>
      {isModalVisible === "main" ? (
        <Pressable style={styles.overlay} onPress={onRequestClose}>
          <View style={styles.modalBox}>
            <Header />
            <PeriodSelector
              startDate={startDate}
              endDate={endDate}
              setIsModalVisible={setIsModalVisible}
            />
            <DayTimeSelector
              selectedDay={selectedDay}
              selectDay={selectDay}
              start={start}
              setStart={setStart}
              end={end}
              setEnd={setEnd}
              addSchedule={addSchedule}
            />
            <ScheduleList
              classTimeDtoList={classTimeDtoList}
              deleteSchedule={deleteSchedule}
            />
            {error && <ErrorText error={error} />}
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
  );
};

// Header
const Header = () => (
  <View style={styles.header}>
    <Image source={registerIcon["수업 일정"]} style={styles.headerIcon} />
    <Text style={styles.headerText}>수업 일정</Text>
  </View>
);

// 기간 선택
const PeriodSelector = ({ startDate, endDate, setIsModalVisible }) => (
  <View style={styles.periodContainer}>
    <Text style={styles.sectionTitle}>수업 기간</Text>
    <View style={styles.periodRow}>
      <Pressable
        style={styles.textInput}
        onPress={() => setIsModalVisible("start")}
      >
        <Text style={styles.text}>{startDate}</Text>
      </Pressable>
      <Image source={registerIcon.dashIcon} style={styles.dashIcon} />
      <Pressable
        style={styles.textInput}
        onPress={() => setIsModalVisible("end")}
      >
        <Text style={styles.text}>{endDate}</Text>
      </Pressable>
    </View>
  </View>
);

// 요일 & 시간 선택
const DayTimeSelector = ({
  selectedDay,
  selectDay,
  start,
  setStart,
  end,
  setEnd,
  addSchedule,
}) => (
  <View style={styles.dayTimeContainer}>
    <Text style={styles.sectionTitle}>수업 요일</Text>
    <View style={styles.dayTimeRow}>
      <Pressable style={styles.dayBtn} onPress={selectDay}>
        <Text style={styles.dayText}>{selectedDay}</Text>
      </Pressable>
      <View style={{ flex: 1 }}>
        <ScheduleTimeInput
          startTime={start}
          setStartTime={setStart}
          endTime={end}
          setEndTime={setEnd}
          visible={true}
        />
      </View>
    </View>
    <Pressable style={styles.addBtn} onPress={addSchedule}>
      <Text style={styles.addBtnText}>+ 추가하기</Text>
    </Pressable>
  </View>
);

// 추가된 수업 리스트
const ScheduleList = ({ classTimeDtoList, deleteSchedule }) => (
  <ScrollView>
    <View style={styles.scheduleList}>
      {classTimeDtoList.map((classDto, index) => {
        const day = daysOfWeek.find(([_, eng]) => eng === classDto.day)[0];
        return (
          <View key={index} style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>{day}</Text>
            <Text style={styles.scheduleTime}>
              {classDto.start} ~ {classDto.end}
            </Text>
            <Pressable
              style={styles.deleteBtn}
              onPress={() => deleteSchedule(index)}
            >
              <Text style={styles.deleteText}>삭제</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  </ScrollView>
);

const ErrorText = ({ error }) => <Text style={styles.errorText}>{error}</Text>;

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
  periodContainer: { gap: 7, marginBottom: 19 },
  sectionTitle: { fontSize: 20 },
  periodRow: { flexDirection: "row", alignItems: "center", gap: 15 },
  dashIcon: { width: 24, height: 24 },
  dayTimeContainer: { gap: 5, marginBottom: 20 },
  dayTimeRow: { flexDirection: "row", gap: 10 },
  dayBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
  },
  dayText: { fontSize: 16 },
  addBtn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    borderRadius: 4,
    marginTop: 5,
  },
  addBtnText: { fontSize: 16, color: "#555555" },
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
  scheduleList: { gap: 12 },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  scheduleDay: { fontSize: 16, marginRight: 14 },
  scheduleTime: { fontSize: 16, marginRight: "auto" },
  deleteBtn: {
    width: 48,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1.3,
    borderColor: "red",
  },
  deleteText: {
    fontSize: 11,
    fontFamily: "Pretendard-Bold",
    color: "red",
  },
  saveBtn: { width: "100%", marginTop: 16 },
  errorText: { color: "red", alignSelf: "center", fontSize: 15, marginTop: 15 },
});
