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
import HwContainer from "@/components/DetailInfo/HwContainer";
import CompletionRate from "@/components/DetailInfo/CompletionRate";
import AddHwBtn from "@/components/DetailInfo/AddHwBtn";
import SortBtn from "@/components/DetailInfo/SortBtn";

// 더미 데이터
const info = {
  profileImage: "",
  name: "정채영",
  grade: "고1",
  subject: "과학",
  classTime: "월/수 12:00~14:00",
  memo: "기타 메모들",
  themeColor: "blue",
};

const schedules = [
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

const homework = [
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
  const { id } = useLocalSearchParams();
  const [sort, setSort] = useState("날짜"); // 날짜 or 달성
  const today = new Date();

  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(today, { weekStartsOn: 0 })
  );

  const profileImage = info.profileImage || yourDefaultProfileImage();

  const changeWeek = (diff) => {
    setCurrentWeekStart(addDays(currentWeekStart, diff * 7));
  };

  const goToChatRoom = () => router.push(`/chatroom/${id}`);

  const addHw = async () => {
    console.log("숙제 추가하기");
  };

  const handleSort = async () => {
    if (sort === "날짜") setSort("달성");
    else setSort("날짜");
  };

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

      <CompletionRate color={themeColors[info.themeColor]} />

      <View style={styles.addHWAndSortContainer}>
        <AddHwBtn onPress={addHw} />
        <SortBtn sort={sort} onPress={handleSort} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false} // 세로 스크롤바 숨김
        showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨김
      >
        <View style={{ gap: 25, marginHorizontal: 28 }}>
          {homework.map((hw) => (
            <HwContainer
              key={hw.homeworkDateId}
              date={hw.date}
              color={hw.themeColor}
              homeworkList={hw.homeworkList}
            />
          ))}
        </View>
      </ScrollView>
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
  calendarContainer: {
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
