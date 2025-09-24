import { myPageImage } from "@/assets";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const UserInfo = ({ userInfo, setUserInfo, setModalVisible }) => {
  const { userRole } = useUser();
  const [editMode, setEditMode] = useState(false);

  const completeEditUserInfo = () => {
    // api 호출해서 유저 정보 변경사항 저장
    setEditMode(false);
  };

  const editPw = () => {
    setModalVisible(true);
  };

  return (
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
          value={userInfo.loginId}
          onChangeText={(text) =>
            setUserInfo((prev) => ({ ...prev, loginId: text }))
          }
          editable={editMode}
          maxLength={20}
        />
      </UserInfoRow>

      <UserInfoRow text="비밀번호">
        <ChangePwBtn onPress={editPw} />
      </UserInfoRow>

      <UserInfoRow text="전화번호">
        <TextInput
          style={[
            styles.input,
            editMode && { borderColor: "#797979", color: "black" },
          ]}
          value={userInfo.phoneNumber}
          onChangeText={(text) =>
            setUserInfo((prev) => ({ ...prev, phoneNumber: text }))
          }
          editable={editMode}
          maxLength={20}
        />
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
              value={String(userInfo.grade ?? "")} // 숫자 → 문자열 변환
              onChangeText={(text) =>
                setUserInfo((prev) => ({
                  ...prev,
                  grade: text === "" ? null : Number(text), // 문자열 → 숫자 변환
                }))
              }
              editable={editMode}
              maxLength={20}
              keyboardType="numeric" // 숫자 키패드 띄우기
            />
          </UserInfoRow>
        </>
      )}
    </View>
  );
};

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

export { UserInfo };

const styles = StyleSheet.create({
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
