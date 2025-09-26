import { StyleSheet, Text, View } from "react-native";
import TodaysStudentContainer from "./TodaysStudentContainer";
import NoContainer from "./NoContainer";
import { getHexFromBackend } from "@/assets";
import { useEffect, useState } from "react";
import { api } from "@/api";
import { useUser } from "@/contexts/UserContext";
import { shortTime } from "@/util/time";
import { getName, getThemeColor } from "@/util/roleBranch";

const TodaysLessonBox = ({ currentDate }) => {
  const [todaysLesson, setTodaysLesson] = useState([]);
  const { userRole } = useUser();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!userRole) return;
        const role = userRole === "학생" ? "STUDENT" : "TEACHER";
        const { data } = await api.get(
          `/calendar/todayclass?date=${currentDate}&role=${role}`
        );
        setTodaysLesson(data.data);
      } catch (e) {
        console.log("오늘의 수업 데이터 불러오기 실패:", e);
        // console.error("오늘의 수업 데이터 불러오기 실패:", e);
      }
    };

    loadData();
  }, [currentDate, userRole]);

  if (!todaysLesson.length) {
    return (
      <View style={styles.container}>
        <NoContainer text="수업" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {todaysLesson.map((classInfo) => (
        <TodaysLessonItem
          key={classInfo.calendarId}
          classInfo={classInfo}
          userRole={userRole}
        />
      ))}
    </View>
  );
};

const TodaysLessonItem = ({ classInfo, userRole }) => {
  const color = getHexFromBackend(getThemeColor(userRole, classInfo));

  return (
    <View style={styles.lessonItem}>
      <View style={styles.lessonHeader}>
        <TodaysStudentContainer
          name={getName(userRole, classInfo)}
          grade={classInfo.grade}
          subject={classInfo.subject}
          color={color}
        />
        <Text style={styles.timeText}>
          {shortTime(classInfo.classStartedAt)} ~{" "}
          {shortTime(classInfo.classEndedAt)}
        </Text>
      </View>
      {classInfo.content && (
        <Text style={styles.studentMemo}>{classInfo.content}</Text>
      )}
    </View>
  );
};

export default TodaysLessonBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 11,
    gap: 12,
  },
  lessonItem: {
    gap: 4,
  },
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    color: "#333",
  },
  studentMemo: {
    fontSize: 11,
    color: "#676767",
  },
});
