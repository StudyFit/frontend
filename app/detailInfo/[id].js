import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { format, startOfWeek, addDays } from "date-fns";
import { enUS } from "date-fns/locale";
import { useLocalSearchParams, router } from "expo-router";

import { CalendarHeader, RouterName, WeekRow } from "@/components";
import { detailInfoIcon, themeColors, yourDefaultProfileImage } from "@/assets";

// 더미 데이터
const info = {
  profileImage: "",
  name: "정채영",
  grade: "고1",
  subject: "과학",
  classTime: "월/수 12:00~14:00",
  memo: "기타 메모들",
};

const schedules = [
  {
    calendarId: 1,
    date: "2025-09-08",
    subject: "과학",
    themeColor: themeColors.blue,
  },
  {
    calendarId: 2,
    date: "2025-09-10",
    subject: "과학",
    themeColor: themeColors.blue,
  },
];

const homework = [
  { homeworkDateId: 1, date: "2025-09-09", isAllCompleted: true },
  { homeworkDateId: 2, date: "2025-09-11", isAllCompleted: false },
];

export default function WeekCalendarTab() {
  const { id } = useLocalSearchParams();
  const today = new Date();

  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(today, { weekStartsOn: 0 })
  );

  const profileImage = info.profileImage || yourDefaultProfileImage();

  const changeWeek = (diff) => {
    setCurrentWeekStart(addDays(currentWeekStart, diff * 7));
  };

  const goToChatRoom = () => router.push(`/chatroom/${id}`);

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 사용자 정보 */}
      <UserInfo
        info={info}
        profileImage={profileImage}
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

      <ScrollView>{/* 필요 시 상세 컨텐츠 */}</ScrollView>
    </SafeAreaView>
  );
}

function UserInfo({ info, profileImage, goToChatRoom }) {
  return (
    <View style={styles.userContainer}>
      <Pressable
        style={{ marginRight: 14, alignSelf: "center" }}
        onPress={() => router.replace(RouterName.StudentListTab)}
      >
        <Image
          source={detailInfoIcon.backBtn}
          style={{ width: 14, height: 22 }}
        />
      </Pressable>
      <Image source={profileImage} style={styles.profileImage} />

      <View style={{ gap: 5 }}>
        <View style={styles.userHeader}>
          <Text style={styles.userName}>{info.name}</Text>
          <Text style={styles.userGrade}>{info.grade}</Text>
          <View style={styles.subjectBadge}>
            <Text style={styles.subjectText}>{info.subject}</Text>
          </View>
        </View>
        <Text>{info.classTime}</Text>
        <Text>{info.memo}</Text>
      </View>

      <Pressable
        style={{ marginLeft: "auto", marginRight: 11 }}
        onPress={goToChatRoom}
      >
        <Image source={detailInfoIcon.chatIcon} style={styles.icon} />
      </Pressable>
      <Pressable>
        <Image source={detailInfoIcon.settingIcon} style={styles.icon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  calendarContainer: { marginTop: 32, marginHorizontal: 30, gap: 9 },

  // 사용자 정보
  userContainer: {
    marginTop: 22,
    marginLeft: 12,
    marginRight: 22,
    flexDirection: "row",
  },
  profileImage: { width: 60, height: 60, alignSelf: "center", marginRight: 10 },
  userHeader: { flexDirection: "row", gap: 10, alignItems: "center" },
  userName: { fontFamily: "Pretendard-Bold", fontSize: 25 },
  userGrade: { fontSize: 25, color: "#939393" },
  subjectBadge: {
    height: 24,
    backgroundColor: "black",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 9,
  },
  subjectText: { fontFamily: "Pretendard-Bold", fontSize: 13, color: "white" },
  icon: { width: 24, height: 24 },
});
