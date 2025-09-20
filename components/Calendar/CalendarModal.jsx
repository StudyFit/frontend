import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { HwIcon } from "./HwIcon";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { calendarImage } from "@/assets/images/calendar";
import { useUser } from "@/contexts/UserContext";
import { themeColors } from "@/assets";

function CalendarModal({
  visible,
  onClose,
  modalDate,
  schedules,
  homework,
  setRegisterModalType,
}) {
  const { userRole } = useUser();
  const [isScheduleButtonClicked, setIsScheduleButtonClicked] = useState(false);

  const getModalDateLabel = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "M월 d일 (E)", { locale: ko });
  };

  const handleModalClose = () => {
    onClose();
    setIsScheduleButtonClicked(false);
  };

  const handleScheduleButtonClick = (type) => {
    handleModalClose();
    setRegisterModalType(type);
  };

  const getName = (item) =>
    userRole === "학생" ? item.teacherName.slice(1) : item.studentName.slice(1);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleModalClose}
    >
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.dayText}>{getModalDateLabel(modalDate)}</Text>

              <View style={{ gap: 11 }}>
                {schedules.length > 0 &&
                  schedules.map((item) => (
                    <ScheduleItem
                      key={item.calendarId}
                      item={item}
                      name={getName(item)}
                    />
                  ))}

                {homework.length > 0 &&
                  homework.map((item) => (
                    <HomeworkItem
                      key={item.homeworkDateId}
                      item={item}
                      name={getName(item)}
                    />
                  ))}
              </View>

              {/* 일정 등록하기 버튼 (선생님용) */}
              {userRole == "선생님" && (
                <View style={styles.buttonContainer}>
                  {!isScheduleButtonClicked ? (
                    <ButtonComponent
                      text="일정 등록"
                      style={styles.button}
                      onPress={() => setIsScheduleButtonClicked(true)}
                    />
                  ) : (
                    <View style={{ gap: 13, alignItems: "center" }}>
                      <View style={[styles.button, { height: 67, gap: 13 }]}>
                        <ButtonComponent
                          text="수업 일정"
                          onPress={() => handleScheduleButtonClick("수업")}
                        />
                        <ButtonComponent
                          text="기타 일정"
                          onPress={() => handleScheduleButtonClick("기타")}
                        />
                      </View>
                      <Pressable
                        onPress={() => setIsScheduleButtonClicked(false)}
                      >
                        <Image
                          source={calendarImage.scheduleRegisterCancelBtn}
                          style={{ width: 40, height: 40 }}
                        />
                      </Pressable>
                    </View>
                  )}
                  <ButtonComponent
                    text="숙제 등록"
                    style={styles.button}
                    onPress={() => handleScheduleButtonClick("숙제")}
                  />
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const ScheduleItem = ({ item, name }) => {
  return (
    <View
      style={[
        styles.scheduleContainer,
        { backgroundColor: themeColors[item.themeColor] },
      ]}
    >
      <Text style={styles.mainText}>
        {name} {item.subject}
      </Text>
      <Text style={{ fontSize: 10 }}>
        {item.startTime} ~ {item.endTime}
      </Text>
      {item.content && (
        <Text style={{ fontSize: 10, color: "#616161" }}>{item.content}</Text>
      )}
    </View>
  );
};

const HomeworkItem = ({ item, name }) => {
  return (
    <View style={styles.homeworkContainer}>
      <HwIcon
        isAssigned={item.isAllCompleted}
        style={{ width: 11, height: 11 }}
      />
      <Text style={styles.mainText}>{name} 숙제</Text>
    </View>
  );
};

const ButtonComponent = ({ text, style, onPress }) => {
  return (
    <Pressable style={style} onPress={onPress}>
      <Text style={styles.buttonText}>+ {text}</Text>
    </Pressable>
  );
};

export { CalendarModal };

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.22)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 261,
    height: 424,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingTop: 27,
    paddingBottom: 23,
    paddingHorizontal: 22,
  },

  dayText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
    marginBottom: 27,
  },
  scheduleContainer: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 15,
    gap: 4,
  },
  homeworkContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingLeft: 17,
    borderWidth: 0.5,
    borderColor: "#676767",
    borderRadius: 10,
    paddingVertical: 7,
  },
  mainText: {
    fontSize: 12,
    fontFamily: "Pretendard-Bold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: "auto",
    alignItems: "flex-end",
  },
  button: {
    width: 105,
    height: 40,
    backgroundColor: "#E9E9E9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonText: { fontSize: 12 },
});
