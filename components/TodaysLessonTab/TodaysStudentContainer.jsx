import { Pressable, StyleSheet, Text, View } from "react-native";

const TodaysStudentContainer = ({ name, subject, grade, color = "white" }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("학생 클릭")}>
        <Text style={styles.studentNameText}>{name}</Text>
      </Pressable>
      <Text style={styles.studentText}>학생</Text>
      <Text style={styles.gradeText}>{grade}</Text>
      <View style={[styles.subjectContainer, { backgroundColor: color }]}>
        <Text style={styles.subjectText}>{subject}</Text>
      </View>
    </View>
  );
};

export default TodaysStudentContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginBottom: 4,
  },
  studentNameText: {
    fontSize: 18,
    fontFamily: "Pretendard-Bold",
  },
  studentText: {
    fontSize: 14,
  },
  gradeText: {
    fontSize: 12,
  },
  subjectContainer: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  subjectText: {
    fontSize: 10,
    fontFamily: "Pretendard-Bold",
  },
});
