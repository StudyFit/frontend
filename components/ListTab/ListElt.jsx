import React, { useState } from "react";
import colors from "@/assets/colors";
import { Pressable, StyleSheet, Text, View, Modal } from "react-native";

// 학생이 보는 선생님 목록
export const ListEltForStudent = ({ elt }) => {
  return (
    <View style={styles.listEltContainer}>
      <View
        style={[styles.listElt, { backgroundColor: colors[elt.themeColor] }]}
      >
        <Text style={styles.nameText}>{elt.teacherName}</Text>
        <Text style={styles.roleText}>선생님</Text>
        <Text>{elt.subject}</Text>
      </View>
    </View>
  );
};

// 학생이 보는 선생님 수락 대기 목록
export const ListEltForStudentAccept = ({ elt }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState(null); // "accept" or "reject"

  const handlePress = (type) => {
    setActionType(type);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    // 실제 수락/거절 처리 로직을 여기에 추가
    if (actionType === "accept") {
      // 수락 처리
      console.log("수락:", elt.teacherName);
    } else {
      // 거절 처리
      console.log("거절:", elt.teacherName);
    }
  };

  return (
    <>
      <View style={styles.listEltContainer}>
        <View style={[styles.listElt, { backgroundColor: "#E1E1E1" }]}>
          <Text style={styles.nameText}>{elt.teacherName}</Text>
          <Text style={styles.roleText}>선생님</Text>
        </View>

        <ActionButton text="수락" onPress={() => handlePress("accept")} />
        <ActionButton
          text="거절"
          color="red"
          onPress={() => handlePress("reject")}
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.content}>
            <Text style={modalStyles.text}>
              {actionType === "accept"
                ? "정말 수락하시겠습니까?"
                : "정말 거절하시겠습니까?"}
            </Text>
            <View style={modalStyles.buttonRow}>
              <Pressable style={modalStyles.button} onPress={handleConfirm}>
                <Text>확인</Text>
              </Pressable>
              <Pressable
                style={modalStyles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text>취소</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

// 공통 버튼 컴포넌트
const ActionButton = ({ text, color, onPress }) => (
  <Pressable
    style={[styles.acceptBtn, color === "red" && { borderColor: "red" }]}
    onPress={onPress}
  >
    <Text
      style={{
        fontFamily: "Pretendard-Bold",
        color: color === "red" ? "red" : undefined,
      }}
    >
      {text}
    </Text>
  </Pressable>
);

// 선생님이 보는 학생 목록
export const ListEltForTeacher = ({ elt, waiting }) => {
  return (
    <View style={styles.listEltContainer}>
      <View
        style={[
          styles.listElt,
          { backgroundColor: !waiting ? colors[elt.themeColor] : "#E1E1E1" },
        ]}
      >
        <Text style={styles.nameText}>{elt.studentName}</Text>
        <Text style={styles.roleText}>학생</Text>
        {elt.grade && (
          <Text style={{ fontSize: 16, marginRight: 15 }}>{elt.grade}</Text>
        )}
        <Text>{elt.subject}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listEltContainer: { flexDirection: "row", gap: 4 },
  listElt: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    paddingVertical: 13,
    paddingLeft: 22,
    paddingRight: 16,
    flex: 1,
  },
  nameText: {
    fontSize: 20,
    marginRight: 4,
    fontFamily: "Pretendard-Bold",
  },
  roleText: {
    marginRight: "auto",
    marginBottom: 2,
    alignSelf: "flex-end",
  },
  acceptBtn: {
    width: 48,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
    width: 240,
  },
  text: {
    fontSize: 16,
    marginBottom: 18,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginHorizontal: 4,
  },
});
