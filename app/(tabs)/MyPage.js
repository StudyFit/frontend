import api from "@/api";
import { defaultProfileImage } from "@/assets";
import { myPageImage } from "@/assets/images/my-page";
import { LogoutBtn, UserInfo } from "@/components";
import MainTitle from "@/components/MainTitle";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";

export default function MyPage() {
  const [name, setName] = useState("");

  const editProfileImage = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 상단 타이틀 */}
        <View style={styles.mainTitleContainer}>
          <MainTitle text="마이페이지" />
          <Image source={myPageImage.myPageIcon} style={styles.myPageIcon} />
        </View>

        {/* 프로필 */}
        <View style={styles.centered}>
          <View style={styles.profileBox}>
            <Image source={defaultProfileImage} style={styles.profileImage} />
            <Pressable onPress={editProfileImage}>
              <Image source={myPageImage.editImageBtn} style={styles.editBtn} />
            </Pressable>
          </View>

          <Text style={styles.userName}>{name}</Text>

          {/* 카드 리스트 */}
          <View style={styles.cardList}>
            {/* 개인정보 */}
            <UserInfo setName={setName} />

            {/* 이번 달 통계 */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>이번 달 통계</Text>
            </View>
          </View>

          {/* 로그아웃 버튼 */}
          <LogoutBtn />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
  },
  mainTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 13,
    marginLeft: 21,
    marginBottom: 28,
  },
  centered: {
    alignItems: "center",
  },
  profileBox: {
    width: 106,
    height: 109,
    position: "relative",
  },
  profileImage: {
    width: 106,
    height: 106,
  },
  editBtn: {
    width: 27,
    height: 27,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  userName: {
    marginTop: 17,
    marginBottom: 13,
    fontFamily: "Pretendard-Bold",
    fontSize: 25,
  },
  cardList: {
    width: 331,
    gap: 11,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 23,
    paddingHorizontal: 27,
    gap: 12,
  },
  cardTitle: {
    fontFamily: "Pretendard-Bold",
    fontSize: 18,
    paddingVertical: 4,
  },

  myPageIcon: { width: 24, height: 24 },
});
