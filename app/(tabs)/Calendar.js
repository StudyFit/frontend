import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  CalendarHeader,
  CalendarModal,
  DayHomeworkElement,
  DayOfWeekComponent,
  DayScheduleElement,
  RegisterModal,
  ShowScheduleToggle,
  StudentComponent,
  TotalComponent,
} from "@/components";
import { getHexFromBackend } from "@/assets";
import MainTitle from "@/components/MainTitle";
import { calendarImage } from "@/assets/images/calendar";
import { api } from "@/api";
import { useUser } from "@/contexts/UserContext";
import { getAuthData } from "@/contexts/AuthSecureStore";
import { getId, getName, getStatus, getThemeColor } from "@/util/roleBranch";

const SCREEN_WIDTH = Dimensions.get("window").width;

const acceptedList = (userRole, list) => {
  return list.filter((elt) => getStatus(userRole, elt) == "ACCEPTED");
};

function monthRange(dateInput) {
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  // UTC 기준 연도, 월(0-11)
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();

  // 첫날: year-month-01 (UTC)
  const first = new Date(Date.UTC(year, month, 1));
  // 마지막날: 다음달의 0번째 날 -> 해당달의 마지막 날
  const last = new Date(Date.UTC(year, month + 1, 0));

  const fmt = (dt) =>
    `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dt.getUTCDate()).padStart(2, "0")}`;

  return { start: fmt(first), end: fmt(last) };
}

export default function CalendarTab() {
  const { userRole } = useUser();
  const [list, setList] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [currentDate, setCurrentDate] = useState(new Date(today));
  const [currentTarget, setCurrentTarget] = useState(null);
  const [classShow, setClassShow] = useState(true);
  const [hwShow, setHwShow] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDate, setModalDate] = useState(today);
  const [registerModalType, setRegisterModalType] = useState("");

  useEffect(() => {
    const { start, end } = monthRange(currentDate);

    // 연결된 학생/선생님 데이터 불러오기
    const loadList = async () => {
      try {
        const url = `/connection/${
          userRole == "학생" ? "teachers" : "students"
        }`;
        const response = await api.get(url);
        setList(acceptedList(userRole, response.data.data));
        // console.log(acceptedList(userRole, response.data.data));
      } catch (e) {
        console.error(e);
      }
    };

    // 달력 데이터 불러오기
    const loadCalendar = async () => {
      try {
        const { accessToken } = await getAuthData();
        console.log(accessToken);
        const url = `/calendar/schedule?role=${
          userRole == "학생" ? "STUDENT" : "TEACHER"
        }&startDate=${start}&endDate=${end}`;
        console.log(url);
        const response = await api.get(url);
        setSchedules(response.data.data);
        console.log("달력 데이터 불러오기");
        console.log(JSON.stringify(response.data.data, null, 2));
      } catch (e) {
        console.error(e);
      }
    };

    // 숙제 데이터 불러오기
    const loadHw = async () => {
      try {
        const url = `/calendar/homeworks?role=${
          userRole == "학생" ? "STUDENT" : "TEACHER"
        }&startDate=${start}&endDate=${end}`;
        const response = await api.get(url);
        setHomeworks(response.data.data);
        // console.log(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };

    loadList();
    loadCalendar();
    loadHw();
  }, []);

  const getFilteredData = (data) => {
    if (currentTarget == null) return data;

    const people = list.find((elt) => getId(userRole, elt) === currentTarget);
    if (!people) return [];

    return data.filter(
      (item) => getName(userRole, item) === getName(userRole, people)
    );
  };

  const filteredSchedules = getFilteredData(schedules);
  const filteredHomework = getFilteredData(homeworks);

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
          {list.map((elt) => (
            <StudentComponent
              name={getName(userRole, elt)}
              subject={elt.subject}
              key={getId(userRole, elt)}
              on={currentTarget == getId(userRole, elt)}
              onPress={() => setCurrentTarget(getId(userRole, elt))}
            />
          ))}
        </ScrollView>
      </View>

      {/* 헤더 */}
      <View style={styles.headerContainer}>
        {/* 달 선택 */}

        <CalendarHeader
          year={currentDate.getFullYear()}
          month={format(currentDate, "MMM", { locale: enUS })}
          changeCalendar={changeMonth}
        />

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
                      themeColor={getHexFromBackend(
                        getThemeColor(userRole, item)
                      )}
                      name={getName(userRole, item)}
                      subject={item.subject}
                    />
                  ))}

                {/* 숙제 */}
                {hwShow &&
                  dayHomework.map((item) => (
                    <DayHomeworkElement
                      key={item.homeworkDateId}
                      isAssigned={item.isAllCompleted}
                      name={getName(userRole, item)}
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
    paddingVertical: 30,
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
});
