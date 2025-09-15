import api from "@/api";
import * as ImagePicker from "expo-image-picker";
import { myPageImage } from "@/assets/images/my-page";
import { ChangePwModal, LogoutBtn, UserInfo } from "@/components";
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
import { myDefaultProfileImage } from "@/assets";

export default function MyPage() {
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const profileSource = profileImage
    ? { uri: profileImage }
    : myDefaultProfileImage();

  const editProfileImage = async () => {
    try {
      // 권한 요청
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("사진 접근 권한이 필요합니다.");
        return;
      }

      // 갤러리 열기
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // 편집 가능(자르기 등)
        aspect: [1, 1], // 정사각형 비율
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri); // 선택한 이미지 URI 저장
        // api로 변경된 프사 저장하는 로직 추가
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleModal = () => setModalVisible((prev) => !prev);

  return (
    <SafeAreaView style={styles.container}>
      {modalVisible && <ChangePwModal toggleModal={toggleModal} />}
      <ScrollView>
        {/* 상단 타이틀 */}
        <View style={styles.mainTitleContainer}>
          <MainTitle text="마이페이지" />
          <Image source={myPageImage.myPageIcon} style={styles.myPageIcon} />
        </View>

        {/* 프로필 */}
        <View style={styles.centered}>
          <View style={styles.profileBox}>
            <Image source={profileSource} style={styles.profileImage} />
            <Pressable onPress={editProfileImage}>
              <Image source={myPageImage.editImageBtn} style={styles.editBtn} />
            </Pressable>
          </View>

          <Text style={styles.userName}>{name}</Text>

          {/* 카드 리스트 */}
          <View style={styles.cardList}>
            {/* 개인정보 */}
            <UserInfo setName={setName} setModalVisible={setModalVisible} />

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
    borderRadius: "100%",
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
