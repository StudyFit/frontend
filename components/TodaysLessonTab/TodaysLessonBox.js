import { StyleSheet, Text, View } from "react-native";
import TodaysStudentContainer from "./TodaysStudentContainer";

const TodaysLessonBox = () => {
  const classList = [
    {
      id: 1,
      name: "정채영",
      grade: "중3",
      subject: "수학",
      classTime: "12:00 ~ 14:00",
      memo: "집 주소 : 서울특별시 동대문구 이문동 123-45 678호",
      color: "#FDED91",
    },
    {
      id: 2,
      name: "김정은",
      grade: "고2",
      subject: "영어",
      classTime: "12:00 ~ 14:00",
      memo: "진도 빨리 나가야 함.",
      color: "#D3ED70",
    },
  ];

  return (
    <View style={styles.container}>
      {classList &&
        classList.map((student) => (
          <View key={student.id}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TodaysStudentContainer
                name={student.name}
                grade={student.grade}
                subject={student.subject}
                color={student.color}
              />
              <Text>{student.classTime}</Text>
            </View>
            <View>
              <Text style={styles.studentMemo}>{student.memo}</Text>
            </View>
          </View>
        ))}
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
