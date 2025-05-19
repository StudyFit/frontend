import { Image, StyleSheet, Text, View } from "react-native";
import { todaysLessonImages } from "../../assets";
import TodaysStudentContainer from "./TodaysStudentContainer";
import FeedbackContainer from "./FeedbackContainer";
import NoContainer from "./NoContainer";

const TodaysHwBox = () => {
  const hwInfo = [
    {
      id: 1,
      studentName: "정채영",
      studentGrade: "중3",
      studentSubject: "수학",
      hwlist: [
        {
          id: 1,
          text: "쎈 12~15p",
          isChecked: true,
        },
        {
          id: 2,
          text: "쎈 C단계 오답노트",
          isChecked: false,
        },
      ],
      color: "#FDED91",
      feedback: "",
    },
    {
      id: 2,
      studentName: "김정은",
      studentGrade: "고2",
      studentSubject: "수학",
      hwlist: [
        {
          id: 1,
          text: "쎈 12~15p",
          isChecked: true,
        },
        {
          id: 2,
          text: "쎈 C단계 오답노트",
          isChecked: true,
        },
      ],
      color: "#D3ED70",
      feedback: "공부 잘하자 ^^",
    },
  ];

  return (
    <>
      {hwInfo ? (
        hwInfo.map((hw) => (
          <View
            key={hw.id}
            style={[styles.container, { backgroundColor: hw.color }]}
          >
            <TodaysStudentContainer
              name={hw.studentName}
              grade={hw.studentGrade}
              subject={hw.studentSubject}
              color="white"
            />

            <View style={{ gap: 12 }}>
              {hw.hwlist &&
                hw.hwlist.map((elt) => (
                  <View style={styles.hwTask} key={elt.id}>
                    <Image
                      source={
                        elt.isChecked
                          ? todaysLessonImages.hwCheckTrue
                          : todaysLessonImages.hwCheckFalse
                      }
                      style={{
                        width: 23,
                        height: 24,
                        marginRight: 8.5,
                      }}
                    />
                    <Text>{elt.text}</Text>
                    {/* 
                    사진 업로드 버튼
                    {elt.isPhotoRequired && (
                      <Image
                        source={
                          elt.isPhotoUploaded
                            ? todaysLessonImages.hwAfterUpload
                            : todaysLessonImages.hwBeforeUpload
                        }
                        style={{ width: 18, height: 18, marginLeft: "auto" }}
                      />
                    )} */}
                  </View>
                ))}
            </View>
            <FeedbackContainer hwId={hw.id} feedback={hw.feedback} />
          </View>
        ))
      ) : (
        <NoContainer text="숙제" />
      )}
    </>
  );
};

export default TodaysHwBox;

const styles = StyleSheet.create({
  container: {
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E8E8E8",
    borderRadius: 17,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  feedbackInput: {
    fontSize: 11,
  },
  feedbackBtn: {
    width: 11,
    height: 8,
  },
});
