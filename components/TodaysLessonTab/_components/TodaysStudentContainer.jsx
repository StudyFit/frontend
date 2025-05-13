import { StyleSheet, Text, View } from "react-native";

const TodaysStudentContainer = ({ name, subject }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.studentNameText}>{name}</Text>
      <Text style={styles.studentText}>학생</Text>
      <View>
        <Text>{subject}</Text>
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
    fontWeight: "bold",
  },
  studentText: {
    fontSize: 14,
  },
});
