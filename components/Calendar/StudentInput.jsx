import React, { useState } from "react";
import { Modal, View, Text, Pressable, ScrollView, Image } from "react-native";
import { calendarImage } from "@/assets/images/calendar";
import { commonStyles, ModalButton, modalStyles } from "./ModalInputStyle";

const StudentInput = ({
  studentList = [],
  selectedConnectionId,
  setSelectedConnectionId,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  const handleSelect = (student) => {
    setSelectedConnectionId(student.connectionId);
    setSelectedName(student.studentName);
    setModalVisible(false);
  };

  return (
    <View>
      <Text style={commonStyles.titleText}>학생</Text>
      <Pressable
        style={[commonStyles.inputBox, { width: 188, height: 40 }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={commonStyles.selectedText}>{selectedName}</Text>
        <Image
          source={calendarImage.listIcon}
          style={{ width: 15, height: 15 }}
        />
      </Pressable>

      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable
          style={modalStyles.overlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={[
              modalStyles.modalContent,
              { width: 260, maxHeight: 400, gap: 27 },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={modalStyles.titleText}>학생 선택</Text>
            <ScrollView
              style={{ maxHeight: 250, width: "100%" }}
              contentContainerStyle={{ gap: 20 }}
            >
              {studentList.map((student) => (
                <Pressable
                  key={student.studentId}
                  onPress={() => handleSelect(student)}
                  style={{ alignItems: "center" }}
                >
                  <Text style={{ fontSize: 16 }}>
                    {student.studentName} - {student.subject}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <ModalButton text="취소" onPress={() => setModalVisible(false)} />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export { StudentInput };
