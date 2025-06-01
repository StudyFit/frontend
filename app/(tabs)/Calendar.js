import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Modal,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  CalendarBtn,
  DayHomeworkElement,
  DayOfWeekComponent,
  DayScheduleElement,
  HwIcon,
  ShowScheduleToggle,
} from "@/components";

const SCREEN_WIDTH = Dimensions.get("window").width;

const schedules = [
  {
    date: "2025-06-01",
    studentName: "정채영",
    subject: "수학",
    classStartedAt: "16:00",
    classEndedAt: "18:30",
    content: "",
    themeColor: "#FDED91",
    scheduleId: 123,
  },
  {
    date: "2025-06-01",
    studentName: "김철수",
    subject: "영어",
    classStartedAt: "19:00",
    classEndedAt: "22:00",
    content: "메모메모",
    themeColor: "#D3ED70",
    scheduleId: 124,
  },
  {
    date: "2025-06-03",
    studentName: "김철수",
    subject: "영어",
    classStartedAt: "19:00",
    classEndedAt: "22:00",
    content: "메모메모",
    themeColor: "#D3ED70",
    scheduleId: 125,
  },
];

const homework = [
  {
    date: "2025-06-01",
    studentName: "김철수",
    homeworkId: 1233,
    homeworkDateGrupId: 2002,
    isAssigned: false,
  },
  {
    date: "2025-06-10",
    studentName: "김철수",
    homeworkId: 1234,
    homeworkDateGrupId: 2003,
    isAssigned: true,
  },
];

export default function CalendarTab() {
  const today = new Date().toISOString().split("T")[0];
  const [currentDate, setCurrentDate] = useState(new Date(today));
  const [classShow, setClassShow] = useState(true);
  const [hwShow, setHwShow] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDate, setModalDate] = useState(today);

  // 월 변경 함수
  const changeMonth = (diff) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + diff);
    setCurrentDate(newDate);
  };

  const handleClassShow = () => {
    setClassShow(!classShow);
  };

  const handleHwShow = () => {
    setHwShow(!hwShow);
  };

  const handleDayClick = (dateString) => {
    setModalDate(dateString);
    setModalVisible(true);
  };

  const getItemsByDate = (arr, dateString) =>
    arr.filter((item) => item.date === dateString);

  return (
    <SafeAreaView style={styles.container}>
      {/* 모달창 */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}
            >
              {modalDate}
            </Text>
            {schedules.filter((s) => s.date === modalDate).length > 0 ? (
              schedules
                .filter((s) => s.date === modalDate)
                .map((item, idx) => (
                  <Text
                    key={item.scheduleId ?? idx}
                    style={{ fontSize: 14, marginBottom: 4 }}
                  >
                    • {item.studentName} {item.subject} {item.classStartedAt}~
                    {item.classEndedAt}
                  </Text>
                ))
            ) : (
              <Text style={{ color: "#888" }}>일정이 없습니다.</Text>
            )}
            {homework.filter((h) => h.date === modalDate).length > 0 &&
              homework
                .filter((h) => h.date === modalDate)
                .map((item, idx) => (
                  <View
                    key={item.homeworkId ?? idx}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <HwIcon
                      isAssigned={item.isAssigned}
                      style={{ width: 12, height: 12 }}
                    />
                    <Text style={{ fontSize: 14, marginBottom: 4 }}>
                      {item.studentName.slice(1)} 숙제
                    </Text>
                  </View>
                ))}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff" }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 헤더 */}
      <View style={styles.headerContainer}>
        {/* 달 선택 */}
        <View style={styles.headerRow}>
          <CalendarBtn direction="left" onPress={() => changeMonth(-1)} />
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 10 }}>{currentDate.getFullYear()}</Text>
            <Text style={{ fontSize: 20 }}>
              {format(currentDate, "MMM", { locale: enUS })}
            </Text>
          </View>
          <CalendarBtn direction="right" onPress={() => changeMonth(1)} />
        </View>

        <ShowScheduleToggle
          classShow={classShow}
          setClassShow={handleClassShow}
          hwShow={hwShow}
          setHwShow={handleHwShow}
        />
      </View>

      {/* 요일 */}
      <DayOfWeekComponent />

      {/* 날짜 */}
      <Calendar
        key={format(currentDate, "yyyy-MM")}
        style={styles.calendar}
        current={format(currentDate, "yyyy-MM-dd")}
        markingType={"custom"}
        hideDayNames={true}
        dayComponent={({ date }) => {
          const daySchedules = getItemsByDate(schedules, date.dateString);
          const dayHomework = getItemsByDate(homework, date.dateString);
          const isToday = today === date.dateString;
          return (
            <TouchableOpacity
              style={styles.dayContainer}
              onPress={() => handleDayClick(date.dateString)}
              activeOpacity={0.7}
            >
              <DaysComponent isToday={isToday} day={date.day} />

              {/* 일정 */}
              <View style={{ gap: 2 }}>
                {/* 수업 */}
                {classShow &&
                  daySchedules.map((item) => (
                    <DayScheduleElement
                      key={item.scheduleId}
                      themeColor={item.themeColor}
                      studentName={item.studentName}
                      subject={item.subject}
                    />
                  ))}

                {/* 숙제 */}
                {hwShow &&
                  dayHomework.map((item) => (
                    <DayHomeworkElement
                      key={item.homeworkId}
                      isAssigned={item.isAssigned}
                      studentName={item.studentName}
                    />
                  ))}
              </View>
            </TouchableOpacity>
          );
        }}
        hideExtraDays={true}
        firstDay={0}
        customHeaderTitle={<></>}
        hideArrows={true}
        onMonthChange={(date) => setCurrentDate(new Date(date.dateString))}
      />
    </SafeAreaView>
  );
}

const DaysComponent = ({ isToday, day }) => {
  return (
    <View style={styles.dayNumberWrapper}>
      <View
        style={[styles.todayCircle, isToday && { backgroundColor: "#FF3B30" }]}
      >
        <Text style={[styles.dayText, isToday && styles.todayDayText]}>
          {day}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingHorizontal: 14,
    alignItems: "center",
  },

  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: 17,
    paddingRight: 23,
    marginBottom: 12,
  },

  calendar: {
    width: SCREEN_WIDTH - 28,
    alignSelf: "center",
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    width: SCREEN_WIDTH / 7,
    minHeight: 70,
    margin: 0,
    paddingTop: 2,
    paddingBottom: 2,
  },

  dayNumberWrapper: {
    marginBottom: 6,
    minHeight: 17,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  dayText: {
    fontSize: 16,
    color: "#4A5660",
    zIndex: 1,
  },
  todayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    zIndex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  todayDayText: {
    color: "#fff",
    fontWeight: "bold",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    minWidth: 220,
  },
  closeBtn: {
    marginTop: 16,
    backgroundColor: "#4F8EF7",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  headerRow: {
    width: 102,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});
