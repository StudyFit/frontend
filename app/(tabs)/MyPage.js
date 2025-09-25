import * as ImagePicker from "expo-image-picker";
import { myPageImage } from "@/assets/images/my-page";
import { ChangePwModal, LogoutBtn, UserInfo } from "@/components";
import MainTitle from "@/components/MainTitle";
import { useEffect, useState } from "react";
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
import { api } from "@/api";
import { useUser } from "@/contexts/UserContext";

export default function MyPage() {
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const profileSource = profileImage
    ? { uri: profileImage }
    : myDefaultProfileImage();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const response = await api.get(`/mypage/profile`);
        console.log(response.data.data);
        setUserInfo(response.data.data);
        setName(response.data.data.name);
      } catch (e) {
        console.error(e);
      }
    };
    loadUserInfo();
  }, []);

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
        const imageUri = result.assets[0].uri;
        console.log(result.assets[0]);
        setProfileImage(imageUri);

        // FormData 생성
        const formData = new FormData();
        formData.append("file", {
          uri: imageUri,
          type: "image/jpeg",
          name: "profile.jpg",
        });

        try {
          const response = await api.patch(`/mypage/profile-image`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log("프로필 이미지 업데이트 성공:", response.data);
        } catch (error) {
          console.error("프로필 이미지 업데이트 실패:", error);
        }
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
            <UserInfo
              setModalVisible={setModalVisible}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
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
    paddingVertical: 30,
  },
  mainTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 13,
    paddingHorizontal: 27,
    marginLeft: 7,
  },
  centered: {
    marginTop: 30,
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
    borderRadius: 53,
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
