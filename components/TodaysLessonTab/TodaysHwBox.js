import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getHexFromBackend, todaysLessonImages } from "@/assets";
import TodaysStudentContainer from "./TodaysStudentContainer";
import FeedbackContainer from "./FeedbackContainer";
import NoContainer from "./NoContainer";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { api } from "@/api";
import { getName, getThemeColor } from "@/util/roleBranch";

const TodaysHwBox = ({ currentDate }) => {
  const { userRole } = useUser();
  const [hwList, setHwList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const loadHw = async () => {
      try {
        const url = `/calendar/homeworks?role=${
          userRole == "학생" ? "STUDENT" : "TEACHER"
        }&startDate=${currentDate}&endDate=${currentDate}`;
        console.log(url);
        const response = await api.get(url);
        setHwList(response.data.data);
        console.log("숙제 데이터", response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadHw();
    setRefresh(false);
  }, [currentDate, refresh]);

  const toggleHwComplete = async (homeworkId, isCompleted) => {
    try {
      const formData = new FormData();
      formData.append("isChecked", !isCompleted);

      const response = await api.patch(
        `/homeworks/${homeworkId}/check`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response.data);
      setRefresh(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {hwList.length ? (
        hwList.map((hw) => (
          <View
            key={hw.homeworkDateId}
            style={[
              styles.container,
              {
                backgroundColor: getHexFromBackend(getThemeColor(userRole, hw)),
              },
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
                    <Pressable
                      onPress={() => {
                        console.log(elt);
                        toggleHwComplete(elt.homeworkId, elt.isCompleted);
                      }}
                    >
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
                    </Pressable>
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
                homeworkDateId={hw.homeworkDateId}
                feedback={hw.feedback}
                role={userRole}
                toggleRefresh={() => setRefresh(false)}
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
