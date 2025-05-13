import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { RouterName } from "@/components/RouterName";

export default function TabsLayout() {
  const demoVersion = false; // 자진프 모드면 true

  return (
    <Tabs
      initialRouteName={RouterName.TodaysLessonTab}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name={RouterName.TodaysLessonTab}
        options={{
          title: "오늘의 수업",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={RouterName.StudentListTab}
        options={{
          title: "학생 목록",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={RouterName.CalendarTab}
        options={{
          title: "캘린더",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={RouterName.ChatTab}
        options={{
          title: "채팅",
          href: demoVersion ? null : undefined,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={RouterName.Mypage}
        options={{
          title: "마이페이지",
          href: demoVersion ? null : undefined,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
