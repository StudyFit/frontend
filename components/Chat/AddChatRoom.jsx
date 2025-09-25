import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useUser } from "@/contexts/UserContext";
import { api } from "@/api";
import { getId, getName, getStatus } from "@/util/roleBranch";
import { yourDefaultProfileImage } from "@/assets";

const AddChatRoom = ({ visible, closeModal }) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const { userRole } = useUser();

  // 승인된 연결만 필터링
  const acceptedList = (data = []) =>
    data.filter((item) => getStatus(userRole, item) === "ACCEPTED");

  // 연결된 학생/선생님 데이터 불러오기
  const loadList = async () => {
    setError(""); // 에러 초기화
    try {
      const endpoint = userRole === "학생" ? "teachers" : "students";
      const response = await api.get(`/connection/${endpoint}`);
      setList(acceptedList(response.data.data));
    } catch (err) {
      console.error(err);
      setError("목록을 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (visible) loadList();
  }, [visible]);

  const handleSelectItem = async (item) => {
    try {
      await api.post("/chat/rooms", { connectionId: item.connectionId });
      closeModal();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 400) setError("이미 존재하는 채팅방입니다.");
      else setError("채팅방 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      transparent
      animationType="slide"
    >
      <Pressable style={styles.overlay} onPress={closeModal}>
        <View style={styles.modalBox}>
          <Text style={styles.header}>학생/선생님 추가</Text>

          <ScrollView style={styles.scroll}>
            {list.map((item) => (
              <Pressable
                key={getId(userRole, item)}
                style={styles.listItem}
                onPress={() => handleSelectItem(item)}
              >
                <Image
                  source={
                    item.profileImg
                      ? { uri: item.profileImg }
                      : yourDefaultProfileImage()
                  }
                  style={styles.profileImage}
                />
                <Text style={styles.listText}>
                  {getName(userRole, item)} - {item.subject}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </Pressable>
    </Modal>
  );
};

export default AddChatRoom;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "60%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  scroll: {
    maxHeight: 200,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  listText: {
    fontSize: 15,
    fontFamily: "Pretendard-Regular",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "center",
    marginTop: 10,
  },
});
