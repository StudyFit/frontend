import { useUser } from "@/contexts/UserContext";
import { Alert, Pressable, StyleSheet, Text } from "react-native";

const LogoutBtn = () => {
  const { logout } = useUser();

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "확인", onPress: logout },
    ]);
  };
  return (
    <Pressable onPress={handleLogout} style={styles.logoutBtn}>
      <Text style={styles.logoutText}>로그아웃</Text>
    </Pressable>
  );
};

export { LogoutBtn };

const styles = StyleSheet.create({
  logoutBtn: {
    marginVertical: 17,
  },
  logoutText: {
    color: "#797979",
    textDecorationLine: "underline",
  },
});
