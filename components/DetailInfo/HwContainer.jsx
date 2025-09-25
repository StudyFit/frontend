import { getHexFromBackend, todaysLessonImages } from "@/assets";
import { format, isBefore, isToday, isAfter } from "date-fns";
import { enUS } from "date-fns/locale";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@/contexts/UserContext";
import FeedbackContainer from "../TodaysLessonTab/FeedbackContainer";
import { api } from "@/api";

export default function HwContainer({
  color,
  date,
  homeworkList,
  requireRefresh,
  homeworkDateId,
}) {
  const dateObj = new Date(date);
  const today = new Date();
  const formattedDate = format(dateObj, "MMM d", { locale: enUS });
  const backgroundColor = getBackgroundColor(dateObj, today, color);
  const { userRole } = useUser();

  const toggleHwComplete = async (isCompleted) => {
    if (!homeworkDateId) return;
    try {
      const formData = new FormData();
      formData.append("isChecked", !isCompleted);

      const response = await api.patch(
        `/homeworks/${homeworkDateId}/check`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response.data);
      requireRefresh();
    } catch (e) {
      console.error(e);
    }
  };

  const uploadPhoto = async () => {
    if (!homeworkDateId) return;
    try {
      // 이미지 선택
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.3,
      });

      if (!result.canceled) {
        const formData = new FormData();
        formData.append("photo", {
          uri: result.assets[0].uri,
          name: "photo.jpg",
          type: "image/jpeg",
        });

        await api.patch(
          `/homeworks/${homeworkDateId}/check?isChecked=${true}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        requireRefresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* 날짜 & 알림 버튼 */}
      <View style={styles.header}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <CompletionRate homeworkList={homeworkList} />

        {/* {(isToday(dateObj, today) || isAfter(dateObj, today)) && (
          <Pressable style={{ marginLeft: 18 }}>
            <Image
              source={todaysLessonImages.alarmBtn}
              style={styles.alarmIcon}
            />
          </Pressable>
        )} */}
      </View>

      {/* 숙제 리스트 */}
      {homeworkList?.map((hw) => (
        <View key={hw.homeworkId} style={{ gap: 10 }}>
          <HomeworkItem
            hw={hw}
            toggleHwComplete={toggleHwComplete}
            uploadPhoto={uploadPhoto}
          />
          {/* 피드백 입력 */}
          {(userRole === "선생님" || (userRole === "학생" && hw.feedback)) && (
            <FeedbackContainer
              homeworkDateId={homeworkDateId}
              feedback={hw.feedback}
              role={userRole}
              toggleRefresh={() => setRefresh(false)}
            />
          )}
        </View>
      ))}
    </View>
  );
}

/* === 서브 컴포넌트 === */
function HomeworkItem({ hw, toggleHwComplete, uploadPhoto }) {
  return (
    <View style={styles.homeworkItem}>
      <Pressable
        style={styles.hwCheckBtn}
        onPress={() => toggleHwComplete(hw.isCompleted)}
      >
        <Image
          source={
            hw.isCompleted
              ? todaysLessonImages.hwCheckTrue
              : todaysLessonImages.hwCheckFalse
          }
          style={styles.hwCheckIcon}
        />
      </Pressable>
      <Text style={styles.hwText}>{hw.content}</Text>
      {hw.isPhotoRequired && (
        <Pressable style={styles.photoBtn} onPress={uploadPhoto}>
          <Image
            source={
              hw.isPhotoUploaded
                ? todaysLessonImages.hwAfterUpload
                : todaysLessonImages.hwBeforeUpload
            }
            style={styles.photoIcon}
          />
        </Pressable>
      )}
    </View>
  );
}

function CompletionRate({ homeworkList }) {
  const completedCount = homeworkList.filter((hw) => hw.isCompleted).length;
  const totalCount = homeworkList.length;
  const textList = [`${completedCount}`, "/", `${totalCount}`, "달성"];

  return (
    <View style={styles.completionRateContainer}>
      {textList.map((text, index) => (
        <Text key={index} style={styles.completionRateText}>
          {text}
        </Text>
      ))}
    </View>
  );
}

function getBackgroundColor(dateObj, today, color) {
  if (isToday(dateObj)) return getHexFromBackend(color);
  if (isBefore(dateObj, today)) return "#DDDDDD";
  if (isAfter(dateObj, today)) return getHexFromBackend(color, true);
  return "#FFFFFF";
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 20,
  },
  alarmIcon: {
    width: 18,
    height: 18,
  },
  homeworkItem: {
    height: 29,
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  hwCheckBtn: {
    marginRight: 8.5,
  },
  hwCheckIcon: {
    width: 24,
    height: 24,
  },
  hwText: {
    fontSize: 15,
  },
  photoBtn: {
    marginLeft: "auto",
  },
  photoIcon: {
    width: 18,
    height: 18,
  },
  feedbackBox: {
    height: 35,
    flexDirection: "row",
    backgroundColor: "#E8E8E8",
    borderRadius: 17,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  feedbackInput: {
    fontSize: 11,
  },
  feedbackIcon: {
    width: 11,
    height: 8,
  },

  completionRateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: "auto",
  },
  completionRateText: { fontSize: 13 },
});
