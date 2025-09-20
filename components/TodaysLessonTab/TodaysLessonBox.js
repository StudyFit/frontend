import { StyleSheet, Text, View } from "react-native";
import TodaysStudentContainer from "./TodaysStudentContainer";
import NoContainer from "./NoContainer";
import { themeColors } from "@/assets";
import { useEffect, useState } from "react";
import { api } from "@/api";
import { useUser } from "@/contexts/UserContext";

const showName = (userRole, classInfo) =>
  userRole === "학생" ? classInfo.teacherName : classInfo.studentName;

const showThemeColor = (userRole, classInfo) =>
  userRole === "학생"
    ? classInfo.teacherThemeColor
    : classInfo.studentThemeColor;

const TodaysLessonBox = ({ currentDate }) => {
  const [todaysLesson, setTodaysLesson] = useState([]);
  const { userRole } = useUser();

  useEffect(() => {
    const loadData = async () => {
      try {
        const role = userRole == "학생" ? "STUDENT" : "TEACHER";
        const response = await api.get(
          `/calendar/todayclass?date=${currentDate}&role=${role}`
        );
        console.log("오늘의 수업 데이터", response.data.data);
        setTodaysLesson(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
  }, [currentDate]);

  return (
    <View style={styles.container}>
      {todaysLesson.length ? (
        todaysLesson.map((classInfo) => (
          <View key={classInfo.calendarId}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TodaysStudentContainer
                name={showName(userRole, classInfo)}
                grade={classInfo.grade}
                subject={classInfo.subject}
                color={themeColors[showThemeColor(userRole, classInfo)]}
              />
              <Text>
                {classInfo.classStartedAt + " ~ " + classInfo.classEndedAt}
              </Text>
            </View>
            {classInfo.content && (
              <View>
                <Text style={styles.studentMemo}>{classInfo.content}</Text>
              </View>
            )}
          </View>
        ))
      ) : (
        <NoContainer text="수업" />
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

  studentMemo: {
    fontSize: 11,
    color: "#676767",
  },
});
