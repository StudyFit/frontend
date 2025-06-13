import { Image, StyleSheet, Text, View } from "react-native";
import { themeColors, todaysLessonImages } from "@/assets";
import TodaysStudentContainer from "./TodaysStudentContainer";
import FeedbackContainer from "./FeedbackContainer";
import NoContainer from "./NoContainer";
import { useUser } from "@/contexts/UserContext";

const TodaysHwBox = () => {
  const { userRole } = useUser();

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
              { backgroundColor: themeColors[hw.themeColor] },
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
                role={userRole}
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
