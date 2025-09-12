import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { detailInfoIcon } from "@/assets";
import { RouterName } from "@/components/RouterName";

export default function UserInfoContainer({
  info,
  profileImage,
  goToChatRoom,
}) {
  return (
    <View style={styles.userContainer}>
      <Pressable
        style={{ marginRight: 14, alignSelf: "center" }}
        onPress={() => router.replace(RouterName.StudentListTab)}
      >
        <Image
          source={detailInfoIcon.backBtn}
          style={{ width: 14, height: 22 }}
        />
      </Pressable>
      <Image source={profileImage} style={styles.profileImage} />

      <View style={{ gap: 5 }}>
        <View style={styles.userHeader}>
          <Text style={styles.userName}>{info.name}</Text>
          <Text style={styles.userGrade}>{info.grade}</Text>
          <View style={styles.subjectBadge}>
            <Text style={styles.subjectText}>{info.subject}</Text>
          </View>
        </View>
        <Text>{info.classTime}</Text>
        <Text>{info.memo}</Text>
      </View>

      <Pressable
        style={{ marginLeft: "auto", marginRight: 11 }}
        onPress={goToChatRoom}
      >
        <Image source={detailInfoIcon.chatIcon} style={styles.icon} />
      </Pressable>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "./ModifyInfo",
            params: { studentId: "1", name: "김정은", grade: "중3" },
          })
        }
      >
        <Image source={detailInfoIcon.settingIcon} style={styles.icon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    marginTop: 22,
    marginLeft: 12,
    marginRight: 22,
    flexDirection: "row",
  },
  profileImage: { width: 60, height: 60, alignSelf: "center", marginRight: 10 },
  userHeader: { flexDirection: "row", gap: 10, alignItems: "center" },
  userName: { fontFamily: "Pretendard-Bold", fontSize: 25 },
  userGrade: { fontSize: 25, color: "#939393" },
  subjectBadge: {
    height: 24,
    backgroundColor: "black",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 9,
  },
  subjectText: { fontFamily: "Pretendard-Bold", fontSize: 13, color: "white" },
  icon: { width: 24, height: 24 },
});
