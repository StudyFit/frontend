import { registerIcon } from "@/assets";
import { BottomBtn } from "@/components/login";
import React from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

const ScheduleModal = ({ onRequestClose, schedule, setSchedule }) => {
  return (
    <Modal transparent animationType="slide" onRequestClose={onRequestClose}>
      <Pressable style={styles.overlay} onPress={onRequestClose}>
        <View style={styles.modalBox}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={registerIcon["수업 일정"]}
              style={styles.headerIcon}
            />
            <Text style={styles.headerText}>수업 일정</Text>
          </View>

          {/* Save Button */}
          <BottomBtn
            text="저장하기"
            onPress={onRequestClose}
            style={styles.saveBtn}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export { ScheduleModal };

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.22)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalBox: {
    width: "100%",
    height: 300,
    paddingHorizontal: 27,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerIcon: { width: 30, height: 30 },
  headerText: { fontSize: 20, fontFamily: "Pretendard-Bold" },
  colorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
    justifyContent: "space-between",
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: { width: 20, height: 20 },
  saveBtn: { width: "100%" },
});
