import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { todaysLessonImages } from "@/assets";
import { useState } from "react";
import { api } from "@/api";

const FeedbackContainer = ({
  homeworkDateId,
  feedback,
  role,
  toggleRefresh,
}) => {
  const [feedbackText, setFeedbackText] = useState(feedback);

  const handleFeedback = async () => {
    if (!feedbackText) return;
    try {
      const response = await api.patch(
        `/homeworks/${homeworkDateId}/feedback`,
        { feedback: feedbackText }
      );
      console.log(response.data);
      toggleRefresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.feedbackContainer}>
      <TextInput
        value={feedbackText}
        onChangeText={setFeedbackText}
        placeholder="피드백 남기기"
        placeholderTextColor="#676767"
        style={styles.feedbackInput}
      />
      {role === "선생님" && (
        <Pressable onPress={handleFeedback} style={{ padding: 5 }}>
          <Image
            source={todaysLessonImages.feedbackBtn}
            style={styles.feedbackBtn}
          />
        </Pressable>
      )}
    </View>
  );
};

export default FeedbackContainer;

const styles = StyleSheet.create({
  feedbackContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E8E8E8",
    borderRadius: 17,
    paddingHorizontal: 12,
  },
  feedbackInput: {
    fontSize: 11,
  },
  feedbackBtn: {
    width: 11,
    height: 8,
  },
});
