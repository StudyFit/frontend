import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { calendarImage } from "@/assets/images/calendar";
import { commonStyles, ModalButton } from "./ModalInputStyle";
import {
  Image,
  Pressable,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

const HwDeadlineInput = ({ hwDeadline, setHwDeadline }) => {
  const [pickerVisible, setPickerVisible] = useState(false);

  // 날짜 선택 시
  const onChange = (event, selectedDate) => {
    setPickerVisible(false);
    if (selectedDate) {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const dd = String(selectedDate.getDate()).padStart(2, "0");
      setHwDeadline(`${yyyy}-${mm}-${dd}`);
    }
  };

  return (
    <View>
      <Text style={commonStyles.titleText}>숙제 마감 기한</Text>
      <Pressable
        style={[commonStyles.inputBox, { width: 188, height: 40 }]}
        onPress={() => setPickerVisible(true)}
      >
        <Text style={commonStyles.selectedText}>{hwDeadline}</Text>
        <Image
          source={calendarImage.calendarInputIcon}
          style={{ width: 15, height: 17 }}
        />
      </Pressable>
      {/* 모달로 달력 표시 */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setPickerVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <DateTimePicker
                  value={hwDeadline ? new Date(hwDeadline) : new Date()}
                  mode="date"
                  display="inline"
                  onChange={onChange}
                  style={styles.datePicker}
                />
                <ModalButton
                  text="닫기"
                  onPress={() => setPickerVisible(false)}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    width: 370,
    paddingBottom: 17,
  },
  datePicker: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },
});

export { HwDeadlineInput };
