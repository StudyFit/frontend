import { Tabs } from "expo-router";
import { RouterName } from "@/components/RouterName";
import { Image, StyleSheet } from "react-native";
import { bottomTabIcon } from "@/assets/images/bottom-tab";

export default function TabsLayout() {
  const demoVersion = false; // 자진프 모드면 true
  return (
    <Tabs
      initialRouteName={RouterName.TodaysLessonTab}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#767676",
      }}
    >
      <Tabs.Screen
        name={RouterName.TodaysLessonTab}
        options={{
          title: "오늘의 수업",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? bottomTabIcon.todaysLessonTabOn
                  : bottomTabIcon.todaysLessonTabOff
              }
              style={styles.bottomTabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={RouterName.StudentListTab}
        options={{
          title: "학생 목록",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused ? bottomTabIcon.listTabOn : bottomTabIcon.listTabOff
              }
              style={styles.bottomTabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={RouterName.CalendarTab}
        options={{
          title: "캘린더",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? bottomTabIcon.calendarTabOn
                  : bottomTabIcon.calendarTabOff
              }
              style={styles.bottomTabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={RouterName.ChatTab}
        options={{
          title: "채팅",
          href: demoVersion ? null : undefined,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused ? bottomTabIcon.chatTabOn : bottomTabIcon.chatTabOff
              }
              style={styles.bottomTabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={RouterName.MypageTab}
        options={{
          title: "마이페이지",
          href: demoVersion ? null : undefined,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused ? bottomTabIcon.mypageTabOn : bottomTabIcon.mypageTabOff
              }
              style={styles.bottomTabIcon}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bottomTabIcon: { width: 24, height: 24 },
});
