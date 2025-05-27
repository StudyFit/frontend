import { useRouter, useNavigation } from "expo-router";
import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { useSignUp } from "@/contexts/SignUpContext";
import { RoleImage, RouterName } from "@/components";

export default function Step1() {
  const router = useRouter();
  const navigation = useNavigation();
  const { signUpData, setSignUpData } = useSignUp();

  const goToStep2 = (role) => {
    setSignUpData((prev) => ({ ...prev, role: role }));
    router.push(RouterName.signUpStep2);
  };

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
      <Text style={styles.questionText}>참여 유형을 선택해주세요</Text>
      <View style={{ flexDirection: "row", gap: 20 }}>
        {[
          ["student", "학생"],
          ["teacher", "선생님"],
        ].map((role, idx) => (
          <Pressable
            onPress={() => goToStep2(role[0])}
            style={{ alignItems: "center" }}
            key={idx}
          >
            <RoleImage role={role[0]} />
            <Text style={styles.roleText}>{role[1]}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  questionText: { fontSize: 16, marginTop: 169, marginBottom: 50 },
  roleText: { fontSize: 16, marginTop: 15 },
});
