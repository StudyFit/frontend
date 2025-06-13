import { StyleSheet, Text, View } from "react-native";
import TodaysStudentContainer from "./TodaysStudentContainer";
import NoContainer from "./NoContainer";
import { themeColors } from "@/assets";

const TodaysLessonBox = () => {
  const classList = [
    {
      memberId: 101,
      scheduleId: 32,
      name: "정채영",
      grade: "중3",
      subject: "수학",
      themeColor: "blue",
      note: null,
      address: null,
      startTime: "13:00",
      endTime: "16:00",
    },
  ];

  return (
    <View style={styles.container}>
      {classList ? (
        classList.map((student) => (
          <View key={student.memberId}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TodaysStudentContainer
                name={student.name}
                grade={student.grade}
                subject={student.subject}
                color={themeColors[student.themeColor]}
              />
              <Text>{student.startTime + " ~ " + student.endTime}</Text>
            </View>
            {student.note && (
              <View>
                <Text style={styles.studentMemo}>{student.note}</Text>
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
