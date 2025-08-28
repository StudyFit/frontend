import { useUser } from "@/contexts/UserContext";
import { Pressable, StyleSheet, Text } from "react-native";

const LogoutBtn = () => {
  const { logout } = useUser();

  return (
    <Pressable onPress={logout} style={styles.logoutBtn}>
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
