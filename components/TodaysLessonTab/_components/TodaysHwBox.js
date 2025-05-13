import { Image, StyleSheet, Text, View } from "react-native";
import { todaysLessonImages } from "../../../assets";
import TodaysStudentContainer from "./TodaysStudentContainer";

const TodaysHwBox = () => {
  const hwInfo = {
    studentName: "정채영",
    studentSubject: "수학",
    hwlist: [
      { id: 1, text: "쎈 12~15p", isChecked: true },
      { id: 2, text: "쎈 C단계 오답노트", isChecked: false },
    ],
  };

  return (
    <View style={styles.container}>
      <TodaysStudentContainer
        name={hwInfo.studentName}
        subject={hwInfo.studentSubject}
      />

      <View style={{ gap: 12 }}>
        {hwInfo &&
          hwInfo.hwlist.map((elt) => (
            <View style={styles.hwTask} key={elt.id}>
              <Image
                source={todaysLessonImages.hwCheckFalse}
                style={{
                  width: 23,
                  height: 24,
                  marginRight: 8.5,
                }}
              />
              <Text>{elt.text}</Text>
              <Image
                source={todaysLessonImages.hwBeforeUpload}
                style={{ width: 18, height: 18, marginLeft: "auto" }}
              />
            </View>
          ))}
      </View>
      <View style={styles.feedbackContainer}>
        <Text style={{ color: "#676767" }}>피드백 남기기</Text>
      </View>
    </View>
  );
};

export default TodaysHwBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D3ED70",
    paddingHorizontal: 17,
    paddingVertical: 12,
    borderRadius: 15,
    gap: 12,
  },

  hwTask: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingBottom: 5,
  },

  feedbackContainer: {
    backgroundColor: "#E8E8E8",
    borderRadius: 17,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
