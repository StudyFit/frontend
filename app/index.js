// app/index.js 또는 app/home.js
import { Redirect } from "expo-router";
import { RouterName } from "@/components/RouterName";
import { useUser } from "@/contexts/UserContext";

export default function Home() {
  const { isLoggedIn } = useUser(); // 로그인 상태 가져오기

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href={RouterName.TodaysLessonTab} />;
}
