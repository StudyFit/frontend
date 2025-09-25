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

const ScheduleTimeInput = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  visible,
}) => {
  const [startModalVisible, setStartModalVisible] = useState(false);
  const [endModalVisible, setEndModalVisible] = useState(false);

  const [timeState, setTimeState] = useState({
    startHour: "12",
    startMinute: "00",
    startPeriod: "AM",
    endHour: "12",
    endMinute: "00",
    endPeriod: "AM",
  });

  const [timeError, setTimeError] = useState("");

  // 모달 visible이 false면 초기화
  useEffect(() => {
    if (!visible) {
      setTimeState({
        startHour: "12",
        startMinute: "00",
        startPeriod: "AM",
        endHour: "12",
        endMinute: "00",
        endPeriod: "AM",
      });
      setStartTime("");
      setEndTime("");
      setTimeError("");
    }
  }, [visible]);

  const openStartModal = () => {
    setStartModalVisible(true);
    setTimeError("");
  };

  const openEndModal = () => {
    setEndModalVisible(true);
    setTimeError("");
  };

  const closeStartModal = () => setStartModalVisible(false);
  const closeEndModal = () => setEndModalVisible(false);

  // 시작 시간 저장
  const handleStartConfirm = () => {
    if (
      !timeState.startHour ||
      !timeState.startMinute ||
      !timeState.startPeriod
    )
      return;

    const startMinutes = getMinutes(
      timeState.startHour,
      timeState.startMinute,
      timeState.startPeriod
    );
    const endMinutes = endTime
      ? getMinutes(timeState.endHour, timeState.endMinute, timeState.endPeriod)
      : 0;

    if (endTime && startMinutes > endMinutes) {
      setTimeError("시작 시간은 종료 시간보다 이전이어야 합니다.");
      return;
    }

    setStartTime(
      to24Hour(
        timeState.startHour,
        timeState.startMinute,
        timeState.startPeriod
      )
    );
    closeStartModal();
  };

  // 종료 시간 저장
  const handleEndConfirm = () => {
    if (!timeState.endHour || !timeState.endMinute || !timeState.endPeriod)
      return;

    const startMinutes = startTime
      ? getMinutes(
          timeState.startHour,
          timeState.startMinute,
          timeState.startPeriod
        )
      : 0;
    const endMinutes = getMinutes(
      timeState.endHour,
      timeState.endMinute,
      timeState.endPeriod
    );

    if (startTime && endMinutes < startMinutes) {
      setTimeError("종료 시간은 시작 시간 이후이어야 합니다.");
      return;
    }

    setEndTime(
      to24Hour(timeState.endHour, timeState.endMinute, timeState.endPeriod)
    );
    closeEndModal();
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

// 시간 선택 모달
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
          {/* AM/PM */}
          <View style={{ justifyContent: "center", marginLeft: 8 }}>
            {["AM", "PM"].map((period) => (
              <TouchableOpacity
                key={period}
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
          {/* 시간 */}
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
                  { width: "100%", alignItems: "center", borderRadius: 5 },
                  selectedMinute === m && styles.selectedOption,
                ]}
              >
                <Text style={styles.optionText}>{m}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.modalButtonRow}>
          <ModalButton text="확인" onPress={onConfirm} />
          <ModalButton text="취소" onPress={onClose} />
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);

// 옵션
const hourOptions = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const minuteOptions = Array.from({ length: 12 }, (_, i) =>
  (i * 5).toString().padStart(2, "0")
);

// 12시간 → 24시간
function to24Hour(hour, minute, period) {
  let h = Number(hour);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:${minute}`;
}

// 시간을 분으로 변환
function getMinutes(hour, minute, period) {
  let h = Number(hour);
  if (period === "PM" && h !== 12 && h !== 12) h += 12;
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
