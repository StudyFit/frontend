import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { calendarImage } from "@/assets/images/calendar";
import { commonStyles, ModalButton, modalStyles } from "./ModalInputStyle";

// ScheduleTimeInput (12시간제 + AM/PM)
const ScheduleTimeInput = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  visible,
}) => {
  const [startModalVisible, setStartModalVisible] = useState(false);
  const [endModalVisible, setEndModalVisible] = useState(false);

  // 12시간제 상태
  const [timeState, setTimeState] = useState({
    startHour: to12Hour(startTime).hour,
    startMinute: to12Hour(startTime).minute,
    startPeriod: to12Hour(startTime).period,
    endHour: to12Hour(endTime).hour,
    endMinute: to12Hour(endTime).minute,
    endPeriod: to12Hour(endTime).period,
  });

  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    if (!visible) {
      setTimeState({
        startHour: "12",
        startMinute: "00",
        startPeriod: "PM",
        endHour: "12",
        endMinute: "00",
        endPeriod: "PM",
      });
      setStartTime("");
      setEndTime("");
      setTimeError("");
    }
  }, [visible]);

  // 시작 시간 모달 확인
  const handleStartConfirm = () => {
    const start = getMinutes(
      timeState.startHour,
      timeState.startMinute,
      timeState.startPeriod
    );
    const end = getMinutes(
      timeState.endHour,
      timeState.endMinute,
      timeState.endPeriod
    );
    if (endTime && end < start) {
      setTimeError("시작 시간은 종료 시간보다 같거나 빨라야 합니다.");
      return;
    }
    setStartTime(
      to24Hour(
        timeState.startHour,
        timeState.startMinute,
        timeState.startPeriod
      )
    );
    closeStartModal(); // 중복 제거!
  };

  // 종료 시간 모달 확인
  const handleEndConfirm = () => {
    const start = getMinutes(
      timeState.startHour,
      timeState.startMinute,
      timeState.startPeriod
    );
    const end = getMinutes(
      timeState.endHour,
      timeState.endMinute,
      timeState.endPeriod
    );
    if (end < start) {
      setTimeError("종료 시간은 시작 시간보다 같거나 늦어야 합니다.");
      return;
    }
    setEndTime(
      to24Hour(timeState.endHour, timeState.endMinute, timeState.endPeriod)
    );
    closeEndModal();
  };

  const openStartModal = () => {
    setStartModalVisible(true);
    setTimeError("");
  };

  const openEndModal = () => {
    setEndModalVisible(true);
    setTimeError("");
  };

  const closeStartModal = () => {
    setStartModalVisible(false);
    setTimeError("");
  };

  const closeEndModal = () => {
    setEndModalVisible(false);
    setTimeError("");
  };

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        {/* 시작 시간 */}
        <Pressable
          style={[commonStyles.inputBox, { flex: 1, height: 40 }]}
          onPress={openStartModal}
        >
          <Text style={commonStyles.selectedText}>
            {startTime
              ? `${timeState.startPeriod} ${timeState.startHour}:${timeState.startMinute}`
              : ""}
          </Text>
          <Image
            source={calendarImage.clockIcon}
            style={{ width: 15, height: 15, marginLeft: 8 }}
          />
        </Pressable>
        <Image source={calendarImage.dash} style={{ width: 24, height: 24 }} />
        {/* 종료 시간 */}
        <Pressable
          style={[commonStyles.inputBox, { flex: 1, height: 40 }]}
          onPress={openEndModal}
        >
          <Text style={commonStyles.selectedText}>
            {endTime
              ? `${timeState.endPeriod} ${timeState.endHour}:${timeState.endMinute}`
              : ""}
          </Text>
          <Image
            source={calendarImage.clockIcon}
            style={{ width: 15, height: 15, marginLeft: 8 }}
          />
        </Pressable>
      </View>

      {/* 시작 시간 모달 */}
      <TimeSelectModal
        visible={startModalVisible}
        onClose={closeStartModal}
        onConfirm={handleStartConfirm}
        title="시작 시간 선택"
        selectedHour={timeState.startHour}
        setSelectedHour={(h) =>
          setTimeState((prev) => ({ ...prev, startHour: h }))
        }
        selectedMinute={timeState.startMinute}
        setSelectedMinute={(m) =>
          setTimeState((prev) => ({ ...prev, startMinute: m }))
        }
        selectedPeriod={timeState.startPeriod}
        setSelectedPeriod={(p) =>
          setTimeState((prev) => ({ ...prev, startPeriod: p }))
        }
        hourOptions={hourOptions}
        minuteOptions={minuteOptions}
        error={timeError}
      />

      {/* 종료 시간 모달 */}
      <TimeSelectModal
        visible={endModalVisible}
        onClose={closeEndModal}
        onConfirm={handleEndConfirm}
        title="종료 시간 선택"
        selectedHour={timeState.endHour}
        setSelectedHour={(h) =>
          setTimeState((prev) => ({ ...prev, endHour: h }))
        }
        selectedMinute={timeState.endMinute}
        setSelectedMinute={(m) =>
          setTimeState((prev) => ({ ...prev, endMinute: m }))
        }
        selectedPeriod={timeState.endPeriod}
        setSelectedPeriod={(p) =>
          setTimeState((prev) => ({ ...prev, endPeriod: p }))
        }
        hourOptions={hourOptions}
        minuteOptions={minuteOptions}
        error={timeError}
      />
    </View>
  );
};

// 시간 선택 모달 (AM/PM 버튼 추가)
const TimeSelectModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
  selectedPeriod,
  setSelectedPeriod,
  hourOptions,
  minuteOptions,
  error,
}) => (
  <Modal visible={visible} transparent animationType="fade">
    <Pressable style={modalStyles.overlay} onPress={onClose}>
      <Pressable
        style={[
          modalStyles.modalContent,
          { minHeight: 260, justifyContent: "flex-start" },
        ]}
        onPress={(e) => e.stopPropagation()}
      >
        <Text style={styles.timeModalTitle}>{title}</Text>
        <View style={styles.timeModalRow}>
          <View style={{ justifyContent: "center", marginLeft: 8 }}>
            {["AM", "PM"].map((period, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedPeriod(period)}
                style={[
                  styles.ampmButton,
                  selectedPeriod === period && styles.selectedOption,
                ]}
              >
                <Text style={styles.optionText}>{period}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView
            style={styles.timeScroll}
            contentContainerStyle={styles.timeScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {hourOptions.map((h) => (
              <TouchableOpacity
                key={h}
                onPress={() => setSelectedHour(h)}
                style={[
                  { width: "100%", alignItems: "center", borderRadius: 5 },
                  selectedHour === h && styles.selectedOption,
                ]}
              >
                <Text style={styles.optionText}>{h}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.timeColon}>:</Text>
          <ScrollView
            style={styles.timeScroll}
            contentContainerStyle={styles.timeScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {minuteOptions.map((m) => (
              <TouchableOpacity
                key={m}
                onPress={() => setSelectedMinute(m)}
                style={[
                  {
                    width: "100%",
                    alignItems: "center",
                    borderRadius: 5,
                  },
                  selectedMinute === m && styles.selectedOption,
                ]}
              >
                <Text style={styles.optionText}>{m}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.errorContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <View style={styles.modalButtonRow}>
          <ModalButton text="확인" onPress={onConfirm} />
          <ModalButton text="취소" onPress={onClose} />
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);

// 12시간제 옵션
const hourOptions = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const minuteOptions = Array.from({ length: 12 }, (_, i) =>
  (i * 5).toString().padStart(2, "0")
);

// 24시간 → 12시간 변환
function to12Hour(time) {
  if (!time) return { hour: "12", minute: "00", period: "AM" };
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  let hour = h % 12;
  if (hour === 0) hour = 12;
  return {
    hour: hour.toString().padStart(2, "0"),
    minute: m.toString().padStart(2, "0"),
    period,
  };
}
// 12시간 → 24시간 변환
function to24Hour(hour, minute, period) {
  let h = Number(hour);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:${minute}`;
}
function getMinutes(hour, minute, period) {
  let h = Number(hour);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h * 60 + Number(minute);
}

export { ScheduleTimeInput };

const styles = StyleSheet.create({
  optionText: {
    fontSize: 15,
    color: "#222",
    textAlign: "center",
  },
  ampmButton: {
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 5,
    marginBottom: 8,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#E0E0E0",
  },
  timeModalTitle: {
    fontSize: 18,
    fontFamily: "Pretendard-Bold",
    marginBottom: 35,
  },
  timeModalRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  timeScroll: {
    height: 120,
  },
  timeScrollContent: {
    gap: 5,
    alignItems: "center",
  },
  timeColon: {
    fontSize: 18,
    alignSelf: "center",
  },
  modalButtonRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 12,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  errorContainer: {
    minHeight: 32,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
