const {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} = require("react-native");

function RegisterModal({ visible, registerModalType, closeRegisterModal }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={closeRegisterModal}
    >
      <TouchableWithoutFeedback onPress={closeRegisterModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                padding: 24,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                {registerModalType} 일정 등록
              </Text>
              {/* 등록 폼 등 원하는 내용 추가 */}
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  padding: 10,
                  backgroundColor: "#eee",
                  borderRadius: 8,
                }}
                onPress={closeRegisterModal}
              >
                <Text>닫기</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export { RegisterModal };
