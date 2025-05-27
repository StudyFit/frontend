import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { CustomHeader } from "@/components/CustomHeader";

export default function AuthLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
        headerBackTitleVisible: false,
        headerLeft: (props) => <CustomHeader {...props} />,
        headerStyle: {
          backgroundColor: "white",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="signUp"
        options={{ headerShown: false, title: "회원가입" }}
      />
    </Stack>
  );
}
