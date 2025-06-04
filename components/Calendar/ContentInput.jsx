import { calendarImage } from "@/assets/images/calendar";
import { commonStyles } from "./ModalInputStyle";
import { Image, Text, TextInput, View } from "react-native";

const ContentInput = ({ content, setContent }) => {
  return (
    <View>
      <Text style={commonStyles.titleText}>내용</Text>
      <View
        style={[
          commonStyles.inputBox,
          {
            width: "auto",
            height: 71,
            alignItems: "flex-start",
            paddingVertical: 12,
          },
        ]}
      >
        <TextInput
          style={[commonStyles.selectedText, { flex: 1, padding: 0 }]}
          value={content}
          onChangeText={setContent}
          multiline
        />
        <Image
          source={calendarImage.contentIcon}
          style={{ width: 15, height: 15, marginLeft: 8 }}
        />
      </View>
    </View>
  );
};

export { ContentInput };
