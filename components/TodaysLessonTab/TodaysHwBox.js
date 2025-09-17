import { Image, StyleSheet, Text, View } from "react-native";
import { themeColors, todaysLessonImages } from "@/assets";
import TodaysStudentContainer from "./TodaysStudentContainer";
import FeedbackContainer from "./FeedbackContainer";
import NoContainer from "./NoContainer";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { api } from "@/api";

const getName = (userRole, hw) =>
  userRole == "학생" ? hw.teacherName : hw.studentName;

const TodaysHwBox = ({ currentDate }) => {
  const { userRole } = useUser();
  const [hwList, setHwList] = useState([]);

  const hwInfo = [
    {
      connectionId: 1,
      homeworkDateId: 1,
      date: "2025-05-07",
      teacherName: "정채영",
      teacherProfileImg: "ex.com",
      studentName: "김정은",
      studentProfileImg: "ex.com",
      grade: "숙명중 2",
      subject: "수학",
      isAllCompleted: false,
      feedback: "잘햇다. 굿~!",
      homeworkList: [
        {
          homeworkId: 1,
          content: "여기여기 풀어오셈",
          isCompleted: false,
          isPhotoRequired: false,
        },
        {
          homeworkId: 2,
          content: "여기저기 풀어오셈",
          isCompleted: false,
          isPhotoRequired: false,
        },
      ],
    },
  ];

  useEffect(() => {
    const loadHw = async () => {
      try {
        const url = `/calendar/homeworks?role=${
          userRole == "학생" ? "STUDENT" : "TEACHER"
        }&startDate=${currentDate}&endDate=${currentDate}`;
        const response = await api.get(url);
        setHwList(response.data.data);
        console.log(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadHw();
  }, [currentDate]);

  return (
    <>
      {hwList.length ? (
        hwList.map((hw) => (
          <View
            key={hw.homeworkDateId}
            style={[
              styles.container,
              { backgroundColor: themeColors[hw.themeColor] },
            ]}
          >
            <TodaysStudentContainer
              name={getName(userRole, hw)}
              grade={hw.grade}
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
                    {elt.isPhotoRequired && (
                      <Image
                        source={
                          elt.isPhotoUploaded
                            ? todaysLessonImages.hwAfterUpload
                            : todaysLessonImages.hwBeforeUpload
                        }
                        style={{ width: 18, height: 18, marginLeft: "auto" }}
                      />
                    )}
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
