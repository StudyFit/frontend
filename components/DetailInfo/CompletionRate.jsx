import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CompletionRate = ({ month, color }) => {
  // 이 파일 내부에서 데이터 관리
  const completionRate = 70; // TODO: API 연동 시 변경
  const progressWidth = `${completionRate}%`;

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { borderColor: color }]}>
        <View
          style={[
            styles.progressFill,
            { width: progressWidth, backgroundColor: color },
          ]}
        >
          <Text style={styles.progressText}>
            {month}월 숙제 달성률 : {completionRate}%
          </Text>
        </View>
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
    overflow: "hidden", // 넘치는 부분 잘림 처리
  },
  progressFill: {
    height: "100%",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 14,
    color: "#000", // 필요 시 color로 조정 가능
    fontWeight: "500",
  },
});

export default CompletionRate;
