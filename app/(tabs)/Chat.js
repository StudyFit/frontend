import { View, Text, StyleSheet } from "react-native";

export default function Chat() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>이곳은 네 번째 탭입니다!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
