import { Text, View } from "react-native";

const NoList = () => {
  return (
    <View
      style={{
        height: 124,
        backgroundColor: "#F0F0F0",
        gap: 8,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 29,
        marginHorizontal: 26,
      }}
    >
      <Text style={{ fontSize: 20 }}>학생이 없습니다.</Text>
      <Text style={{ fontSize: 12 }}>
        아래의 추가 버튼을 눌러 학생을 추가해보세요.
      </Text>
    </View>
  );
};

export { NoList };
