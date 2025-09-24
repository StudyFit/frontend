import React, { useState } from "react";
import { View, Platform, Pressable, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ClassPeriodModal({
  setDate,
  backToMain,
  minimum,
  maximum,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [error, setError] = useState("");

  const handleChange = (event, selectedDate) => {
    if (event.type === "dismissed") return;
    setCurrentDate(selectedDate);
    setError("");
  };

  const closeModal = () => {
    const formattedDate = formatDate(currentDate);

    if (minimum && formattedDate <= minimum) {
      setError(`종료일은 시작일(${minimum}) 이후여야 합니다.`);
      return;
    }

    if (maximum && formattedDate >= maximum) {
      setError(`시작일은 종료일(${maximum}) 이전이어야 합니다.`);
      return;
    }

    setDate(formattedDate);
    backToMain();
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        value={currentDate}
        mode="date"
        display={Platform.OS === "ios" ? "inline" : "default"}
        onChange={handleChange}
      />
      <Text>{currentDate}</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Pressable style={styles.confirmButton} onPress={closeModal}>
        <Text style={styles.confirmText}>확인</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 14,
  },
  confirmButton: {
    width: 300,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  confirmText: {
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
  },
});
