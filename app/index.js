import { Redirect } from "expo-router";
import { useUser } from "@/contexts/UserContext";
import { RouterName } from "@/components";

export default function Home() {
  const { isLoggedIn } = useUser(); // 로그인 상태 가져오기

  return (
    <Redirect
      // 임시로 로그인 없이도 메인 페이지 들어갈 수 있게 변경
      href={isLoggedIn ? RouterName.loginPage : RouterName.TodaysLessonTab}
    />
  );
}
