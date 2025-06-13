import { Image, StyleSheet, Text, View } from "react-native";
import { todaysLessonImages } from "../../assets";
import TodaysStudentContainer from "./TodaysStudentContainer";
import FeedbackContainer from "./FeedbackContainer";
import NoContainer from "./NoContainer";
import colors from "@/assets/colors";
import { useUser } from "@/contexts/UserContext";

const TodaysHwBox = () => {
  const { userRole } = useUser();
  // const hwInfo = [
  //   {
  //     id: 1,
  //     studentName: "정채영",
  //     studentGrade: "중3",
  //     studentSubject: "수학",
  //     hwlist: [
  //       {
  //         id: 1,
  //         text: "쎈 12~15p",
  //         isChecked: true,
  //       },
  //       {
  //         id: 2,
  //         text: "쎈 C단계 오답노트",
  //         isChecked: false,
  //       },
  //     ],
  //     color: "#FDED91",
  //     feedback: "",
  //   },
  //   {
  //     id: 2,
  //     studentName: "김정은",
  //     studentGrade: "고2",
  //     studentSubject: "수학",
  //     hwlist: [
  //       {
  //         id: 1,
  //         text: "쎈 12~15p",
  //         isChecked: true,
  //       },
  //       {
  //         id: 2,
  //         text: "쎈 C단계 오답노트",
  //         isChecked: true,
  //       },
  //     ],
  //     color: "#D3ED70",
  //     feedback: "공부 잘하자 ^^",
  //   },
  // ];
  const hwInfo = [
    {
      connectionId: 1,
      homeworkDateId: 1,
      name: "정채영", // 학생이 불러올 경우 00선생님
      info: null, // 학생이 조회할 경우 null
      subject: "영어",
      themeColor: "blue",
      isAllCompleted: false,
      feedback: "어려울텐데 잘했어~ 내일도 파이팅!",
      homeworkList: [
        {
          homeworkId: 1,
          content: "Ch1-2 Word Test ",
          isCompleted: true,
          isPhotoRequired: false,
          isPhotoUploaded: false,
        },
        {
          homeworkId: 2,
          content: "Jump to Grammar p.56-61",
          isCompleted: true,
          isPhotoRequired: false,
          isPhotoUploaded: false,
        },
      ],
    },
  ];

  return (
    <>
      {hwInfo ? (
        hwInfo.map((hw) => (
          <View
            key={hw.homeworkDateId}
            style={[
              styles.container,
              { backgroundColor: colors[hw.themeColor] },
            ]}
          >
            <TodaysStudentContainer
              name={hw.name}
              grade={hw.info}
              subject={hw.subject}
              color="white"
            />

            <View style={{ gap: 12 }}>
              {hw.homeworkList &&
                hw.homeworkList.map((elt) => (
                  <View style={styles.hwTask} key={elt.homeworkId}>
                    <Image
                      source={
                        elt.isCompleted
                          ? todaysLessonImages.hwCheckTrue
                          : todaysLessonImages.hwCheckFalse
                      }
                      style={{
                        width: 23,
                        height: 24,
                        marginRight: 8.5,
                      }}
                    />
                    <Text>{elt.content}</Text>
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
            {(userRole === "선생님" ||
              (userRole === "학생" && hw.feedback)) && (
              <FeedbackContainer
                hwId={hw.homeworkDateId}
                feedback={hw.feedback}
              />
            )}
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
