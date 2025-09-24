import { calendarImage } from "@/assets/images/calendar";
import { commonStyles } from "./ModalInputStyle";
import { Image, Pressable, Text, TextInput, View } from "react-native";

const ContentInput = ({
  content,
  setContent,
  photoRequired,
  togglePhotoRequired,
  registerModalType,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={commonStyles.titleText}>내용</Text>

        {registerModalType == "숙제" && (
          <Pressable
            onPress={togglePhotoRequired}
            style={{ flexDirection: "row", gap: 4 }}
          >
            <Text>숙제 사진 업로드</Text>
            <Image
              source={
                photoRequired
                  ? calendarImage.photoRequiredOnBtn
                  : calendarImage.photoRequiredOffBtn
              }
              style={{ width: 30, height: 16, marginRight: 10 }}
            />
          </Pressable>
        )}
      </View>
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
