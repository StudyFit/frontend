import { registerIcon } from "@/assets";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";

const TextInputBox = ({
  placeholder,
  value,
  onChangeText,
  onPress,
  editable = true,
  rightElement = null,
}) => {
  const isColor = placeholder === "색상";
  const isMemo = placeholder === "메모";

  return (
    <Pressable
      style={[styles.container, isMemo && styles.memoContainer]}
      onPress={onPress}
    >
      <Image
        source={registerIcon[placeholder]}
        style={[styles.icon, isMemo && styles.memoIcon]}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, isColor && styles.colorInput]}
        placeholderTextColor="#676767"
        editable={editable}
        pointerEvents={editable ? "auto" : "none"}
        multiline={isMemo}
      />
      {rightElement && (
        <View style={styles.rightElementWrapper}>{rightElement}</View>
      )}
    </Pressable>
  );
};

export { TextInputBox };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    height: 40,
    paddingLeft: 8,
    paddingVertical: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
  },
  memoContainer: {
    height: 150,
    alignItems: "flex-start",
  },
  icon: {
    width: 24,
    height: 24,
    alignSelf: "center",
  },
  memoIcon: {
    alignSelf: "flex-start",
  },
  input: {
    flex: 1, // width 고정 대신 flex 사용
    fontFamily: "Pretendard-Medium",
    fontSize: 15,
  },
  colorInput: {
    flex: 0, // width 고정 필요시 flex 제거
    width: 70,
  },
  rightElementWrapper: {
    marginLeft: "auto",
    alignSelf: "center",
    marginRight: 7,
  },
});
