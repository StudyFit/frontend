import api from "@/api";
import { defaultProfileImage } from "@/assets";
import { myPageImage } from "@/assets/images/my-page";
import { LogoutBtn } from "@/components";
import MainTitle from "@/components/MainTitle";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";

export default function MyPage() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    id: "",
    school: "",
    grade: "",
    subject: [],
  });
  const [editMode, setEditMode] = useState(false);
  const { userRole } = useUser();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        if (userRole == "학생") {
          setUserInfo({
            name: "김학생",
            id: "asdf1234",
            school: "숙명여자고등학교",
            grade: "1학년",
            subject: [],
          });
        } else {
          setUserInfo({
            name: "김선생",
            id: "asdf1234",
            school: "",
            grade: "",
            subject: ["수학", "과학"],
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadUserInfo();
  }, []);

  const editProfileImage = () => {};

  const completeEditUserInfo = () => {
    // api 호출해서 유저 정보 변경사항 저장
    setEditMode(false);
  };

  const editPw = () => {};

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

          <Text style={styles.userName}>{userInfo.name}</Text>

          {/* 카드 리스트 */}
          <View style={styles.cardList}>
            {/* 개인정보 */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>개인정보</Text>
                {editMode ? (
                  <Pressable
                    onPress={completeEditUserInfo}
                    style={styles.completeBtnBox}
                  >
                    <Text style={styles.completeBtn}>완료</Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={() => setEditMode(true)}>
                    <Image
                      source={myPageImage.editInfoBtn}
                      style={styles.editInfoBtn}
                    />
                  </Pressable>
                )}
              </View>

              <UserInfoRow text="아이디">
                <TextInput
                  style={[
                    styles.input,
                    editMode && { borderColor: "#797979", color: "black" },
                  ]}
                  value={userInfo.id}
                  onChangeText={(text) =>
                    setUserInfo((prev) => ({ ...prev, id: text }))
                  }
                  editable={editMode}
                  maxLength={20}
                />
              </UserInfoRow>

              <UserInfoRow text="비밀번호">
                <ChangePwBtn onPress={editPw} />
              </UserInfoRow>

              {userRole === "학생" && (
                <>
                  <UserInfoRow text="학교">
                    <TextInput
                      style={[
                        styles.input,
                        editMode && { borderColor: "#797979", color: "black" },
                      ]}
                      value={userInfo.school}
                      onChangeText={(text) =>
                        setUserInfo((prev) => ({ ...prev, school: text }))
                      }
                      editable={editMode}
                      maxLength={20}
                    />
                  </UserInfoRow>

                  <UserInfoRow text="학년">
                    <TextInput
                      style={[
                        styles.input,
                        editMode && { borderColor: "#797979", color: "black" },
                      ]}
                      value={userInfo.grade}
                      onChangeText={(text) =>
                        setUserInfo((prev) => ({ ...prev, grade: text }))
                      }
                      editable={editMode}
                      maxLength={20}
                    />
                  </UserInfoRow>
                </>
              )}
            </View>

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

const UserInfoRow = ({ text, children }) => (
  <View style={styles.rowBetween}>
    <Text>{text}</Text>
    {children}
  </View>
);

const ChangePwBtn = ({ onPress }) => {
  return (
    <Pressable style={styles.changePwBtn} onPress={onPress}>
      <Text style={styles.changePwText}>변경하기</Text>
    </Pressable>
  );
};

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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 13,
  },
  cardTitle: {
    fontFamily: "Pretendard-Bold",
    fontSize: 18,
    paddingVertical: 4,
  },
  completeBtnBox: {
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 13,
    marginLeft: "auto",
  },
  completeBtn: { fontSize: 11, fontFamily: "Pretendard-Bold" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    maxWidth: 200,
    textAlign: "right",
    borderBottomWidth: 1,
    paddingHorizontal: 3,
    borderColor: "white",
    color: "#797979",
  },

  myPageIcon: { width: 24, height: 24 },
  editInfoBtn: { width: 22, height: 22 },
  changePwBtn: {
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 11,
  },
  changePwText: {
    color: "#797979",
  },
});
