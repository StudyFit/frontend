import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { format, startOfWeek, addDays, endOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import { useLocalSearchParams, router } from "expo-router";
import { CalendarHeader, WeekRow } from "@/components";
import { getHexFromBackend, yourDefaultProfileImage } from "@/assets";
import HwContainer from "@/components/DetailInfo/HwContainer";
import CompletionRate from "@/components/DetailInfo/CompletionRate";
import AddHwBtn from "@/components/DetailInfo/AddHwBtn";
import UserInfoContainer from "@/components/DetailInfo/UserInfoContainer";
import { api } from "@/api";
import { useUser } from "@/contexts/UserContext";

// 더미 데이터
const aschedules = [
  {
    calendarId: 1,
    date: "2025-09-08",
    subject: "과학",
    themeColor: "blue",
  },
  {
    calendarId: 2,
    date: "2025-09-10",
    subject: "과학",
    themeColor: "blue",
  },
];

const ahomework = [
  {
    homeworkDateId: 1,
    date: "2025-09-09",
    isAllCompleted: true,
    themeColor: "blue",
    homeworkList: [
      {
        homeworkId: 1,
        content: "Ch1-2 Word Test ",
        isCompleted: false,
        isPhotoRequired: false,
      },
      {
        homeworkId: 2,
        content: "Jump to Grammar p.56-61, 72-75",
        isCompleted: false,
        isPhotoRequired: false,
      },
    ],
  },
  {
    homeworkDateId: 2,
    date: "2025-09-11",
    isAllCompleted: false,
    themeColor: "blue",
    homeworkList: [
      {
        homeworkId: 1,
        content: "Ch1-2 Word Test ",
        isCompleted: true,
        isPhotoRequired: true,
        isPhotoUploaded: true,
      },
      {
        homeworkId: 2,
        content: "Jump to Grammar p.56-61, 72-75",
        isCompleted: false,
        isPhotoRequired: true,
        isPhotoUploaded: false,
      },
      {
        homeworkId: 3,
        content: "Jump to Grammar p.56-61, 72-75",
        isCompleted: false,
        isPhotoRequired: true,
        isPhotoUploaded: false,
      },
    ],
  },
  {
    homeworkDateId: 3,
    date: "2025-09-13",
    isAllCompleted: true,
    themeColor: "blue",
    homeworkList: [
      {
        homeworkId: 1,
        content: "Ch1-2 Word Test ",
        isCompleted: false,
        isPhotoRequired: false,
      },
      {
        homeworkId: 2,
        content: "Jump to Grammar p.56-61, 72-75",
        isCompleted: false,
        isPhotoRequired: false,
      },
    ],
  },
];

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
  const [schedules, setSchedules] = useState(aschedules);
  const [homework, setHomework] = useState(ahomework);

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
        } else {
          const response = await api.get(`/connection/teachers`);
          const userInfo = response.data.data.filter(
            (teacher) => teacher.teacherId == id
          )[0];
          setInfo(userInfo);
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
        setHomework(response.data.data);
        console.log("숙제 데이터 불러오기");
        console.log(JSON.stringify(response.data.data, null, 2));
      } catch (e) {
        console.error(e);
      }
    };

    loadUserInfo();
    loadCalendar();
    loadHomework();
  }, [start, end]);

  const changeWeek = (diff) =>
    setCurrentWeekStart(addDays(currentWeekStart, diff * 7));

  const goToChatRoom = () => router.push(`/chatroom/${id}`);

  const addHw = async () => {
    console.log("숙제 추가하기");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 사용자 정보 */}
      <UserInfoContainer
        info={info}
        profileImage={info.profileImage || yourDefaultProfileImage()}
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
          schedules={schedules}
          homework={homework}
        />
      </View>

      <CompletionRate
        month={currentWeekStart.getMonth() + 1}
        color={getHexFromBackend(info.themeColor)}
        connectionId={info.connectionId}
      />

      <View style={styles.addHWAndSortContainer}>
        <AddHwBtn onPress={addHw} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false} // 세로 스크롤바 숨김
        showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨김
      >
        <View style={{ gap: 25, marginHorizontal: 28 }}>
          {homework?.map((hw) => (
            <HwContainer
              key={hw.homeworkDateId}
              date={hw.date}
              color={info.themeColor}
              homeworkList={hw.homeworkList}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
});
