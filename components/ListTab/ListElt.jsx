import { Pressable, StyleSheet, Text, View } from "react-native";

export const ListEltForStudent = ({ elt }) => {
  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      <View style={[styles.listElt, { backgroundColor: elt.color, flex: 1 }]}>
        <Text style={{ fontSize: 20, marginRight: 4 }}>{elt.name}</Text>
        <Text style={styles.roleText}>선생님</Text>
        <Text>{elt.subject}</Text>
      </View>
    </View>
  );
};

export const ListEltForStudentAccept = ({ elt }) => {
  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      <View style={[styles.listElt, { backgroundColor: elt.color, flex: 1 }]}>
        <Text style={{ fontSize: 20, marginRight: 4 }}>{elt.name}</Text>
        <Text style={styles.roleText}>선생님</Text>
      </View>

      <Pressable style={styles.acceptBtn}>
        <Text>수락</Text>
      </Pressable>
      <Pressable style={[styles.acceptBtn, { borderColor: "red" }]}>
        <Text style={{ color: "red" }}>거절</Text>
      </Pressable>
    </View>
  );
};

export const ListEltForTeacher = ({ elt }) => {
  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      <View style={[styles.listElt, { backgroundColor: elt.color, flex: 1 }]}>
        <Text style={{ fontSize: 20, marginRight: 4 }}>{elt.name}</Text>
        <Text style={styles.roleText}>학생</Text>
        <Text style={{ fontSize: 16, marginRight: 15 }}>{elt.grade}</Text>
        <Text>{elt.subject}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listElt: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    paddingVertical: 13,
    paddingLeft: 22,
    paddingRight: 16,
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
