import { Pressable, StyleSheet, Text } from "react-native";

// 공통 버튼 컴포넌트
const ModalButton = ({ text, onPress }) => (
  <Pressable
    style={{
      paddingHorizontal: 18,
      paddingVertical: 8,
      borderRadius: 6,
      backgroundColor: "#F0F0F0",
    }}
    onPress={onPress}
  >
    <Text>{text}</Text>
  </Pressable>
);

// 모달창 스타일
const commonStyles = StyleSheet.create({
  titleText: {
    marginBottom: 10,
    fontSize: 20,
    color: "#363636",
  },

  inputBox: {
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#F0F0F0",
    justifyContent: "space-between",
  },
  selectedText: { fontSize: 16 },
});

// 모달창 안에서 입력받기 위해 추가로 뜨는 모달창 스타일
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
    width: 260,
  },
  titleText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 20,
  },
});

export { ModalButton, commonStyles, modalStyles };
