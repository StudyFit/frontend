import { Image, Pressable, TextInput } from "react-native";

export const CustomTextInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  style,
  rightElement,
  secureTextEntry,
  maxLength = 1000,
  keyboardType,
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
        paddingHorizontal: 5,
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
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
      {rightElement && <>{rightElement}</>}
    </Pressable>
  );
};
