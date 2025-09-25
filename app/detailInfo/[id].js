import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { format, startOfWeek, addDays, endOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import { useLocalSearchParams, router } from "expo-router";
import { CalendarHeader, RouterName, WeekRow } from "@/components";
import { getHexFromBackend } from "@/assets";
import HwContainer from "@/components/DetailInfo/HwContainer";
import CompletionRate from "@/components/DetailInfo/CompletionRate";
import UserInfoContainer from "@/components/DetailInfo/UserInfoContainer";
import { api } from "@/api";
import { useUser } from "@/contexts/UserContext";
import { sortHomeworks } from "@/util/sortHomeworks";
import { getName } from "@/util/roleBranch";

export default function WeekCalendarTab() {
  const { userRole } = useUser();
  const { id } = useLocalSearchParams();
  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(today, { weekStartsOn: 0 })
  );
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [info, setInfo] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [homework, setHomework] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const weekStart = currentWeekStart;
    const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 0 });

    setStart(format(weekStart, "yyyy-MM-dd"));
    setEnd(format(weekEnd, "yyyy-MM-dd"));
  }, [currentWeekStart]);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        if (userRole == "선생님") {
          const response = await api.get(`/connection/students`);
          const userInfo = response.data.data.filter(
            (student) => student.studentId == id
          )[0];
          setInfo(userInfo);
          console.log(userInfo);
        } else {
          const response = await api.get(`/connection/teachers`);
          const userInfo = response.data.data.filter(
            (teacher) => teacher.teacherId == id
          )[0];
          setInfo(userInfo);
          console.log(userInfo);
        }
      } catch (e) {
        console.error(e);
      }
    };
    const loadCalendar = async () => {
      try {
        if (!start || !end) return;
        const url = `/calendar/schedule?role=${
          userRole == "학생" ? "STUDENT" : "TEACHER"
        }&startDate=${start}&endDate=${end}`;
        console.log(url);
        const response = await api.get(url);
        setSchedules(response.data.data);
        // console.log("달력 데이터 불러오기");
        // console.log(JSON.stringify(response.data.data, null, 2));
      } catch (e) {
        console.error(e);
      }
    };
    const loadHomework = async () => {
      try {
        if (!start || !end) return;
        const url = `/calendar/homeworks?role=${
          userRole == "학생" ? "STUDENT" : "TEACHER"
        }&startDate=${start}&endDate=${end}`;
        console.log(url);
        const response = await api.get(url);
        setHomework(sortHomeworks(response.data.data));
        console.log("숙제 데이터 불러오기");
        console.log(JSON.stringify(response.data.data, null, 2));
      } catch (e) {
        console.error(e);
      }
    };

    loadUserInfo();
    loadCalendar();
    loadHomework();
    setRefresh(false);
  }, [start, end, refresh]);

  const getFilteredData = (data) =>
    data.filter((item) => getName(userRole, item) === getName(userRole, info));

  const filteredSchedules = getFilteredData(schedules);
  const filteredHomework = getFilteredData(homework);

  const changeWeek = (diff) =>
    setCurrentWeekStart(addDays(currentWeekStart, diff * 7));

  const goToChatRoom = () => router.push(RouterName.ChatTab);

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 사용자 정보 */}
      <UserInfoContainer
        info={info}
        profileImage={info.profileImg}
        goToChatRoom={goToChatRoom}
      />

      {/* 주간 캘린더 */}
      <View style={styles.calendarContainer}>
        <CalendarHeader
          year={currentWeekStart.getFullYear()}
          month={format(currentWeekStart, "MMM", { locale: enUS })}
          changeCalendar={changeWeek}
        />

        <WeekRow
          currentWeekStart={currentWeekStart}
          today={today}
          schedules={filteredSchedules}
          homework={filteredHomework}
        />
      </View>

      <CompletionRate
        month={currentWeekStart.getMonth() + 1}
        color={getHexFromBackend(info.themeColor)}
        connectionId={info.connectionId}
      />

      <ScrollView
        showsVerticalScrollIndicator={false} // 세로 스크롤바 숨김
        showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨김
      >
        <View style={{ gap: 25, marginHorizontal: 28 }}>
          {filteredHomework?.length > 0 ? (
            filteredHomework.map((hw) => (
              <HwContainer
                key={hw.homeworkDateId}
                homeworkDateId={hw.homeworkDateId}
                date={hw.date}
                color={info.themeColor}
                homeworkList={hw.homeworkList}
                requireRefresh={() => setRefresh(true)}
              />
            ))
          ) : (
            <NoList />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const NoList = () => (
  <View style={styles.noListContainer}>
    <Text style={{ fontSize: 16 }}>숙제가 아직 없습니다.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingVertical: 50 },
  calendarContainer: {
    minHeight: 145,
    marginTop: 32,
    marginHorizontal: 30,
    marginBottom: 21,
    gap: 9,
  },

  addHWAndSortContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginHorizontal: 28,
    marginBottom: 21,
  },

  noListContainer: {
    height: 124,
    backgroundColor: "#F0F0F0",
    gap: 8,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
