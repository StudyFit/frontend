import { themeColors, themeSoftColors, todaysLessonImages } from "@/assets";
import { format, isBefore, isToday, isAfter } from "date-fns";
import { enUS } from "date-fns/locale";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HwContainer({ color, date, homeworkList }) {
  const dateObj = new Date(date);
  const today = new Date();
  const formattedDate = format(dateObj, "MMM d", { locale: enUS });
  const backgroundColor = getBackgroundColor(dateObj, today, color);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* 날짜 & 알림 버튼 */}
      <View style={styles.header}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <CompletionRate homeworkList={homeworkList} />

        {(isToday(dateObj, today) || isAfter(dateObj, today)) && (
          <Pressable style={{ marginLeft: 18 }}>
            <Image
              source={todaysLessonImages.alarmBtn}
              style={styles.alarmIcon}
            />
          </Pressable>
        )}
      </View>

      {/* 숙제 리스트 */}
      {homeworkList?.map((hw) => (
        <HomeworkItem key={hw.homeworkId} hw={hw} />
      ))}

      {/* 피드백 입력 */}
      <View style={styles.feedbackBox}>
        <TextInput placeholder="피드백 남기기" style={styles.feedbackInput} />
        <Image
          source={todaysLessonImages.feedbackBtn}
          style={styles.feedbackIcon}
        />
      </View>
    </View>
  );
}

/* === 서브 컴포넌트 === */
function HomeworkItem({ hw }) {
  return (
    <View style={styles.homeworkItem}>
      <Pressable style={styles.hwCheckBtn}>
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
        <Pressable style={styles.photoBtn}>
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
  if (isToday(dateObj)) return themeColors[color];
  if (isBefore(dateObj, today)) return "#DDDDDD";
  if (isAfter(dateObj, today)) return themeSoftColors[color];
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
    height: 25,
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
