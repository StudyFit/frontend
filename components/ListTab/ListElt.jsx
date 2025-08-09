import { themeColors } from "@/assets";
import { Pressable, StyleSheet, Text, View } from "react-native";

// 학생이 보는 선생님 목록
const ListEltForStudent = ({ elt }) => {
  return (
    <View style={styles.listEltContainer}>
      <View
        style={[
          styles.listElt,
          { backgroundColor: themeColors[elt.themeColor] },
        ]}
      >
        <Text style={styles.nameText}>{elt.teacherName}</Text>
        <Text style={styles.roleText}>선생님</Text>
        <Text>{elt.subject}</Text>
      </View>
    </View>
  );
};

// 학생이 보는 선생님 수락 대기 목록
const ListEltForStudentAccept = ({ elt }) => {
  return (
    <View style={styles.listEltContainer}>
      <View style={[styles.listElt, { backgroundColor: "#E1E1E1" }]}>
        <Text style={styles.nameText}>{elt.teacherName}</Text>
        <Text style={styles.roleText}>선생님</Text>
      </View>

      <Pressable style={styles.acceptBtn}>
        <Text style={{ fontFamily: "Pretendard-Bold" }}>수락</Text>
      </Pressable>
      <Pressable style={[styles.acceptBtn, { borderColor: "red" }]}>
        <Text style={{ fontFamily: "Pretendard-Bold", color: "red" }}>
          거절
        </Text>
      </Pressable>
    </View>
  );
};

// 선생님이 보는 학생 목록
const ListEltForTeacher = ({ elt, waiting }) => {
  const backgroundColor = !waiting ? themeColors[elt.themeColor] : "#E1E1E1";
  return (
    <View style={styles.listEltContainer}>
      <View style={[styles.listElt, { backgroundColor: backgroundColor }]}>
        <Text style={styles.nameText}>{elt.studentName}</Text>
        <Text style={styles.roleText}>학생</Text>
        <Text style={{ fontSize: 16, marginRight: 15 }}>{elt.grade}</Text>
        <Text>{elt.subject}</Text>
      </View>
    </View>
  );
};

export { ListEltForStudent, ListEltForStudentAccept, ListEltForTeacher };

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
