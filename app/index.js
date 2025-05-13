import { Redirect } from "expo-router";
import { RouterName } from "@/components/RouterName";

export default function Home() {
  return <Redirect href={RouterName.TodaysLessonTab} />;
}
