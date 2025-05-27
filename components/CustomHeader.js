import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export function CustomHeader({ canGoBack }) {
  const router = useRouter();

  if (!canGoBack) return null;

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ paddingHorizontal: 15 }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
  );
}
