import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { todaysLessonImages } from "../../assets";
import { useState } from "react";

const FeedbackContainer = ({ hwId, feedback }) => {
  const [feedbackText, setFeedbackText] = useState(feedback);

  return (
    <View style={styles.feedbackContainer}>
      <TextInput
        value={feedbackText}
        onChangeText={setFeedbackText}
        placeholder="피드백 남기기"
        placeholderTextColor="#676767"
        style={styles.feedbackInput}
      />
      <Pressable>
        <Image
          source={todaysLessonImages.feedbackBtn}
          style={styles.feedbackBtn}
        />
      </Pressable>
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
    paddingVertical: 6,
  },
  feedbackInput: {
    fontSize: 11,
  },
  feedbackBtn: {
    width: 11,
    height: 8,
  },
});
