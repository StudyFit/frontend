import { Image, Pressable, TextInput } from "react-native";

export const CustomTextInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  style,
  rightElement,
  secureTextEntry,
}) => {
  return (
    <Pressable
      style={{
        width: 310,
        height: 39,
        backgroundColor: "#F2F2F2",
        borderRadius: 4,
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
      }}
    >
      {!!icon && (
        <Image
          source={icon}
          style={{ width: 19, height: 19, marginLeft: 2, marginRight: 5 }}
          resizeMode="contain"
        />
      )}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[{ flex: 1, fontSize: 16 }, style]}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {rightElement && <>{rightElement}</>}
    </Pressable>
  );
};
