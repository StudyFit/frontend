import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
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
  RegisterModal,
  ShowScheduleToggle,
  StudentComponent,
  TotalComponent,
} from "@/components";
import { themeColors } from "@/assets";
import MainTitle from "@/components/MainTitle";
import { calendarImage } from "@/assets/images/calendar";

const SCREEN_WIDTH = Dimensions.get("window").width;

const list = [
  {
    connecitonId: 1,
    studentId: 1,
    studentName: "학생1",
    subject: "수학",
    connectionStatus: "REQUESTED",
  },
  {
    connecitonId: 3,
    studentId: 2,
    studentName: "학생2",
    subject: "물리1",
    connectionStatus: "ACCEPTED",
  },
  {
    connecitonId: 4,
    studentId: 3,
    studentName: "학생3",
    subject: "물리1",
    connectionStatus: "ACCEPTED",
  },
  {
    connecitonId: 5,
    studentId: 4,
    studentName: "학생4",
    subject: "물리1",
    connectionStatus: "ACCEPTED",
  },
  {
    connecitonId: 6,
    studentId: 5,
    studentName: "학생5",
    subject: "물리1",
    connectionStatus: "ACCEPTED",
  },
  {
    connecitonId: 6,
    studentId: 6,
    studentName: "학생6",
    subject: "물리1",
    connectionStatus: "ACCEPTED",
  },
  {
    connecitonId: 6,
    studentId: 7,
    studentName: "학생7",
    subject: "물리1",
    connectionStatus: "ACCEPTED",
  },
];

const acceptedList = list.filter((elt) => elt.connectionStatus == "ACCEPTED");

const schedules = [
  {
    connectionId: 1,
    calendarId: 1,
    date: "2025-07-02", // 6월 → 7월
    name: "학생2",
    subject: "과학",
    startTime: "19:00",
    endTime: "22:00",
    content: null,
    themeColor: "yellow",
  },
  {
    connectionId: 3,
    calendarId: 3,
    date: "2025-07-06", // 6월 → 7월
    name: "학생3",
    subject: "과학",
    startTime: "19:00",
    endTime: "22:00",
    content: null,
    themeColor: "yellow",
  },
];

const homework = [
  {
    connectionId: 1,
    homeworkDateId: 1,
    name: "학생2",
    info: "숙명고1",
    subject: "과학",
    date: "2025-07-01",
    isAllCompleted: true,
    homeworkList: [
      {
        homeworkId: 1,
        content: "쎈 수학 p.45-48 풀어오기",
        isCompleted: true,
        isPhotoRequired: false,
      },
      {
        homeworkId: 2,
        content: "개념원리 예제 3-4 풀어오기",
        isCompleted: true,
        isPhotoRequired: false,
      },
    ],
  },
  {
    connectionId: 2,
    homeworkDateId: 2,
    name: "학생2",
    info: "숙명고1",
    subject: "과학",
    date: "2025-07-03",
    isAllCompleted: false,
    homeworkList: [
      {
        homeworkId: 1,
        content: "쎈 수학 p.49-52 풀어오기",
        isCompleted: false,
        isPhotoRequired: false,
      },
      {
        homeworkId: 2,
        content: "개념원리 연습문제 3-5 풀어오기",
        isCompleted: true,
        isPhotoRequired: false,
      },
    ],
  },
  {
    connectionId: 4,
    homeworkDateId: 4,
    name: "눈송이",
    info: "숙명고1",
    subject: "과학",
    date: "2025-06-07",
    isAllCompleted: true,
    homeworkList: [
      {
        homeworkId: 1,
        content: "쎈 수학 p.57-60 풀어오기",
        isCompleted: true,
        isPhotoRequired: false,
      },
      {
        homeworkId: 2,
        content: "개념원리 연습문제 3-7 풀어오기",
        isCompleted: true,
        isPhotoRequired: false,
      },
    ],
  },
  {
    connectionId: 5,
    homeworkDateId: 5,
    name: "눈송이",
    info: "숙명고1",
    subject: "과학",
    date: "2025-06-08",
    isAllCompleted: false,
    homeworkList: [
      {
        homeworkId: 1,
        content: "쎈 수학 p.61-64 풀어오기",
        isCompleted: true,
        isPhotoRequired: false,
      },
      {
        homeworkId: 2,
        content: "개념원리 예제 3-8 풀어오기",
        isCompleted: false,
        isPhotoRequired: false,
      },
    ],
  },
];

export default function CalendarTab() {
  const today = new Date().toISOString().split("T")[0];
  const [currentDate, setCurrentDate] = useState(new Date(today));
  const [currentTarget, setCurrentTarget] = useState(null);
  const [classShow, setClassShow] = useState(true);
  const [hwShow, setHwShow] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDate, setModalDate] = useState(today);
  const [registerModalType, setRegisterModalType] = useState("");

  // 필터 함수는 여기서 선언!
  const getFilteredSchedules = () => {
    if (currentTarget == null) return schedules;
    const student = acceptedList.find((elt) => elt.studentId === currentTarget);
    if (!student) return [];
    return schedules.filter((item) => item.name === student.studentName);
  };

  const getFilteredHomework = () => {
    if (currentTarget == null) return homework;
    const student = acceptedList.find((elt) => elt.studentId === currentTarget);
    if (!student) return [];
    return homework.filter((item) => item.name === student.studentName);
  };

  const filteredSchedules = getFilteredSchedules();
  const filteredHomework = getFilteredHomework();

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

  const modalSchedules = getItemsByDate(filteredSchedules, modalDate);
  const modalHomework = getItemsByDate(filteredHomework, modalDate);

  return (
    <SafeAreaView style={styles.container}>
      {/* 모달 */}
      <CalendarModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        modalDate={modalDate}
        schedules={modalSchedules}
        homework={modalHomework}
        setRegisterModalType={setRegisterModalType}
      />

      {/* 수업 일정 등록 모달 */}
      <RegisterModal
        visible={!!registerModalType}
        registerModalType={registerModalType}
        closeRegisterModal={() => setRegisterModalType("")}
      />

      {/* 메인 타이틀 */}
      <View style={styles.mainTitleContainer}>
        <MainTitle text="캘린더" />
        <Image
          source={calendarImage.calendarIcon}
          style={{ width: 24, height: 24 }}
        />
      </View>

      {/* 학생 리스트 */}
      <View style={styles.studentList}>
        <TotalComponent
          on={currentTarget == null}
          onPress={() => setCurrentTarget(null)}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {acceptedList.map((elt) => (
            <StudentComponent
              name={elt.studentName}
              subject={elt.subject}
              key={elt.studentId}
              on={currentTarget == elt.studentId}
              onPress={() => setCurrentTarget(elt.studentId)}
            />
          ))}
        </ScrollView>
      </View>

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
          const daySchedules = getItemsByDate(
            filteredSchedules,
            date.dateString
          );
          const dayHomework = getItemsByDate(filteredHomework, date.dateString);
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
                      key={item.calendarId}
                      themeColor={themeColors[item.themeColor]}
                      studentName={item.name}
                      subject={item.subject}
                    />
                  ))}

                {/* 숙제 */}
                {hwShow &&
                  dayHomework.map((item) => (
                    <DayHomeworkElement
                      key={item.homeworkDateId}
                      isAssigned={item.isAllCompleted}
                      studentName={item.name}
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
  },

  mainTitleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 13,
    marginBottom: 10,
    marginLeft: 34,
  },

  studentList: {
    width: "100%",
    height: 85,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },

  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: 17,
    paddingRight: 23,
    marginTop: 11,
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
