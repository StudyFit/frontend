import { Stack } from "expo-router";
import { SignUpProvider } from "@/contexts/SignUpContext";
import { useRouter } from "expo-router";
import { CustomHeader } from "@/components/CustomHeader";

export default function SignUpLayout() {
  const router = useRouter();

  return (
    <SignUpProvider>
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
          headerTitle: "회원가입",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="step1" />
        <Stack.Screen name="step2" />
        <Stack.Screen name="step3" />
        <Stack.Screen name="step4" />
        <Stack.Screen name="SignUpComplete" options={{ headerShown: false }} />
      </Stack>
    </SignUpProvider>
  );
}
