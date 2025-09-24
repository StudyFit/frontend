import { api } from "@/api";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

const CompletionRate = ({ month, color, connectionId }) => {
  // 이 파일 내부에서 데이터 관리
  const [completionRate, setCompletionRate] = useState(0);
  const [status, setStatus] = useState(""); // HAS_HOMEWORK or NO_HOMEWORK
  const progressWidth = `${completionRate}%`;

  useEffect(() => {
    const loadRate = async () => {
      if (!connectionId) return;
      try {
        const response = await api.get(`/homeworks/rate/${connectionId}`);
        console.log(response.data.data);
        setCompletionRate(month == 9 ? response.data.data.rate : 0);
        setStatus(response.data.data.status);
      } catch (e) {
        console.error(e);
      }
    };
    loadRate();
  }, [connectionId]);

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, month == 9 && { borderColor: color }]}>
        <View
          style={[
            styles.progressFill,
            { width: progressWidth, backgroundColor: color },
          ]}
        ></View>
        <Text style={styles.progressText}>
          {status == "HAS_HOMEWORK" && month === 9
            ? `${month}월 숙제 달성률 : ${completionRate}%`
            : "아직 숙제가 없습니다."}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 28,
    marginBottom: 13,
  },
  progressBar: {
    width: "100%",
    height: 27,
    borderRadius: 7,
    borderWidth: 1,
    position: "relative",
  },
  progressFill: {
    height: "100%",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  },
});

export default CompletionRate;
