import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { todaysLessonImages } from "../../assets";
import TodaysLessonBox from "@/components/TodaysLessonTab/TodaysLessonBox";
import TodaysHwBox from "@/components/TodaysLessonTab/TodaysHwBox";
import MainTitle from "@/components/MainTitle";

// 날짜 포맷 함수
function formatDate(date) {
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = String(date.getDate()).padStart(2, "0");
  return `${month} ${day}`;
}

export default function TodaysLessonPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pickerVisible, setPickerVisible] = useState(false);

  const moveDate = (diff) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + diff);
      return newDate;
    });
  };

  const handleDateChange = (event, selectedDate) => {
    setPickerVisible(false);
    if (selectedDate) setCurrentDate(selectedDate);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <DateContainer
          date={currentDate}
          onPrev={() => moveDate(-1)}
          onNext={() => moveDate(1)}
          onPressDate={() => setPickerVisible(true)}
        />
        <View>
          <MainTitle text="오늘의 수업" style={{ marginBottom: 17 }} />
          <TodaysLessonBox />
        </View>
        <View style={{ marginTop: 32, gap: 15 }}>
          <MainTitle text="오늘의 숙제" />
          <TodaysHwBox />
        </View>
      </ScrollView>

      {/* 달력 모달 */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <DateTimePicker
              value={currentDate}
              mode="date"
              display="inline"
              onChange={handleDateChange}
              style={styles.datePicker}
            />
            <Pressable
              style={styles.closeBtn}
              onPress={() => setPickerVisible(false)}
            >
              <Text>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const DateContainer = ({ date, onPrev, onNext, onPressDate }) => {
  return (
    <View style={styles.dateContainer}>
      <Pressable onPress={onPrev}>
        <Image source={todaysLessonImages.dateLeftBtn} style={styles.dateBtn} />
      </Pressable>
      <Pressable onPress={onPressDate}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </Pressable>
      <Pressable onPress={onNext}>
        <Image
          source={todaysLessonImages.dateRightBtn}
          style={styles.dateBtn}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 27,
    paddingBottom: 32,
    backgroundColor: "white",
  },
  dateContainer: {
    marginBottom: 35,
    flexDirection: "row",
    alignItems: "center",
  },
  dateBtn: { width: 30, height: 30 },
  dateText: {
    marginHorizontal: 13,
    fontSize: 30,
    fontFamily: "Pretendard-Bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    width: 370,
    paddingBottom: 17,
  },
  datePicker: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },
  closeBtn: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: "#eee",
    borderRadius: 6,
  },
});
