import api from "@/api";
import { myPageImage } from "@/assets/images/my-page";
import { CustomSwitch } from "@/components";
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
  Alert,
} from "react-native";

export default function MyPage() {
  const [userInfo, setUserInfo] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [isDoNotDisturb, setIsDoNotDisturb] = useState(false);
  const [startDay, setStartDay] = useState("일");
  const { logout } = useUser();

  const toggleStartDate = () => {
    const newStartDay = startDay == "일" ? "월" : "일";
    Alert.alert(
      "달력 시작 요일",
      `달력 시작 요일을 ${newStartDay}요일로 바꾸시겠습니까?`,
      [
        { text: "예", onPress: () => setStartDay(newStartDay) },
        { text: "아니오", style: () => {} },
      ]
    );
  };

  useEffect(() => {
    // api 호출해서 유저 정보 저장
    const loadUserInfo = async () => {
      try {
        // await api.get(``);
        setUserInfo({ name: "장유빈", id: "asdf1234" });
        setDarkMode(false);
        setIsDoNotDisturb(true);
        setStartDay("일");
      } catch (e) {
        console.error(e);
      }
    };
    loadUserInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainTitleContainer}>
        <MainTitle text="마이페이지" />
        <Image
          source={myPageImage.myPageIcon}
          style={{ width: 24, height: 24 }}
        />
      </View>

      <View style={{ paddingHorizontal: 21, gap: 9 }}>
        <UserInfo name={userInfo.name} id={userInfo.id} />

        <CustomView text="개인정보" />

        <CustomView
          text="다크모드"
          rightElement={
            <CustomSwitch
              value={darkMode}
              onValueChange={setDarkMode}
              scale={0.7}
            />
          }
        />
        <CustomView
          text="방해금지모드"
          rightElement={
            <CustomSwitch
              value={isDoNotDisturb}
              onValueChange={setIsDoNotDisturb}
              scale={0.7}
            />
          }
        />
        <CustomView
          text="달력 시작 요일"
          rightElement={
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={{
                  width: 27,
                  height: 27,
                  borderRadius: "100%",
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={toggleStartDate}
              >
                <Text style={styles.textStyle}>{startDay}</Text>
              </Pressable>
            </View>
          }
        />
        <CustomView text="온보딩 다시 보기" />
        <CustomView
          text="개발자 정보"
          rightElement={
            <Text style={[styles.textStyle, { color: "#848484" }]}>
              장유빈 김정은 정채영 let’s go
            </Text>
          }
        />
      </View>

      <Pressable onPress={logout}>
        <Text>로그아웃</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const UserInfo = ({ name, id }) => {
  return (
    <View
      style={[
        styles.boxStyle,
        { height: 50, justifyContent: "flex-start", gap: 14, marginBottom: 9 },
      ]}
    >
      <Text style={{ fontFamily: "Pretendard-Bold", fontSize: 20 }}>
        {name}
      </Text>
      <Text style={{ fontFamily: "Pretendard-Medium", fontSize: 16 }}>
        ID : {id}
      </Text>
    </View>
  );
};

const CustomView = ({
  style,
  text = "",
  rightElement = <></>,
  onPress = () => {},
}) => {
  return (
    <Pressable style={[styles.boxStyle, style]} onPress={onPress}>
      <Text style={styles.textStyle}>{text}</Text>
      {rightElement}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 13,
    marginLeft: 21,
    marginBottom: 90,
  },
  boxStyle: {
    height: 36,
    flexDirection: "row",
    backgroundColor: "#EBEBEB",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 13,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
  },
});
