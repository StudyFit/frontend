import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  CalendarBtn,
  CalendarModal,
  DayHomeworkElement,
  DayOfWeekComponent,
  DayScheduleElement,
  ShowScheduleToggle,
} from "@/components";

const SCREEN_WIDTH = Dimensions.get("window").width;

const schedules = [
  {
    date: "2025-06-01",
    studentName: "김정은",
    subject: "수학",
    classStartedAt: "16:00",
    classEndedAt: "18:30",
    content: "",
    themeColor: "#FDED91",
    scheduleId: 123,
  },
  {
    date: "2025-06-01",
    studentName: "장유빈",
    subject: "영어",
    classStartedAt: "19:00",
    classEndedAt: "22:00",
    content: "메모메모",
    themeColor: "#D3ED70",
    scheduleId: 124,
  },
  {
    date: "2025-06-03",
    studentName: "장유빈",
    subject: "영어",
    classStartedAt: "19:00",
    classEndedAt: "22:00",
    content: "메모메모",
    themeColor: "#D3ED70",
    scheduleId: 125,
  },
  {
    date: "2025-06-05",
    studentName: "정채영",
    subject: "과학",
    classStartedAt: "16:00",
    classEndedAt: "18:00",
    content: "진도 빨리 나가야 함.",
    themeColor: "#FDB786",
    scheduleId: 126,
  },
];

const homework = [
  {
    date: "2025-06-01",
    studentName: "장유빈",
    homeworkId: 1233,
    homeworkDateGrupId: 2002,
    isAssigned: false,
  },
  {
    date: "2025-06-10",
    studentName: "장유빈",
    homeworkId: 1234,
    homeworkDateGrupId: 2003,
    isAssigned: true,
  },
  {
    date: "2025-06-05",
    studentName: "정채영",
    homeworkId: 1235,
    homeworkDateGrupId: 2004,
    isAssigned: true,
  },
  {
    date: "2025-06-12",
    studentName: "정채영",
    homeworkId: 1235,
    homeworkDateGrupId: 2005,
    isAssigned: false,
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

  const modalSchedules = getItemsByDate(schedules, modalDate);
  const modalHomework = getItemsByDate(homework, modalDate);

  return (
    <SafeAreaView style={styles.container}>
      {/* 모달 */}
      <CalendarModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        modalDate={modalDate}
        schedules={modalSchedules}
        homework={modalHomework}
      />

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

  headerRow: {
    width: 102,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});
