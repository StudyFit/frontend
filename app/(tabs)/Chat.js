import { chatImage } from "@/assets";
import { AddStudentBtn, ProfileListItem } from "@/components";
import MainTitle from "@/components/MainTitle";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { api } from "@/api";
import { useUser } from "@/contexts/UserContext";
import AddChatRoom from "@/components/Chat/AddChatRoom";
import { getName } from "@/util/roleBranch";

const data = [
  {
    id: 1,
    imageSrc: "",
    name: "정채영",
    content: "선생님 저 오늘 숙제 다 했게요 안했게요~",
    time: "12:00",
    unreadCount: 0,
  },
  {
    id: 2,
    imageSrc: "",
    name: "장유빈",
    content: "저 일본 가서도 숙제 했습니다 짱이죠?",
    time: "12:00",
    unreadCount: 1,
  },
  {
    id: 3,
    imageSrc: "",
    name: "김정은",
    content: "쌤 수학 공식 적용하는 법을 모르겠어요",
    time: "12:00",
    unreadCount: 10,
  },
  {
    id: 4,
    imageSrc: "",
    name: "박지민",
    content: "오늘 수업 너무 재밌었어요!",
    time: "13:15",
    unreadCount: 0,
  },
  {
    id: 5,
    imageSrc: "",
    name: "이서연",
    content: "다음주에 결석해도 될까요?",
    time: "14:22",
    unreadCount: 2,
  },
  {
    id: 6,
    imageSrc: "",
    name: "최민준",
    content: "숙제 파일 첨부했어요 확인 부탁드려요.",
    time: "15:40",
    unreadCount: 0,
  },
  {
    id: 7,
    imageSrc: "",
    name: "한지우",
    content: "질문 있는데 전화해도 될까요?",
    time: "16:05",
    unreadCount: 1,
  },
  {
    id: 8,
    imageSrc: "",
    name: "윤서진",
    content: "오늘 숙제 너무 어려웠어요 ㅠㅠ",
    time: "16:30",
    unreadCount: 3,
  },
  {
    id: 9,
    imageSrc: "",
    name: "정하늘",
    content: "선생님 내일 수업 준비물 뭐예요?",
    time: "17:00",
    unreadCount: 0,
  },
  {
    id: 10,
    imageSrc: "",
    name: "오세훈",
    content: "출석체크 부탁드려요!",
    time: "17:45",
    unreadCount: 5,
  },
];

export default function Chat() {
  const router = useRouter();
  const [chatList, setChatList] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const { userRole } = useUser();

  useEffect(() => {
    const loadChatList = async () => {
      try {
        const response = await api.get(`/chat/rooms`);
        console.log(response.data.data);
        setChatList(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadChatList();
  }, [addModalVisible]);

  const addStudent = () => {
    // 채팅방에 학생 추가하는 로직
    setAddModalVisible(true);
  };

  // 채팅방 이동 함수
  const goToChatRoom = (chatId) => {
    if (!chatId) return;
    router.push(`/chatroom/${chatId}`);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingVertical: 30 }}
    >
      <AddChatRoom
        visible={addModalVisible}
        closeModal={() => setAddModalVisible(false)}
      />
      <View style={styles.mainTitleContainer}>
        <MainTitle text="채팅" />
        <Image source={chatImage.chatIcon} style={styles.headerIcon} />
      </View>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {chatList.length > 0 ? (
            chatList.map((elt) => (
              <Pressable
                key={elt.id}
                style={styles.chatItemWrapper}
                onPress={() => goToChatRoom(elt.id)}
              >
                <ProfileListItem
                  name={getName(userRole, elt)}
                  content={elt.lastMessageContent || "채팅을 시작해보세요."}
                  imageUri={elt.opponentProfileImg}
                  rightElement={
                    <View style={styles.rightElement}>
                      <Text style={styles.timeText}>{elt.lastMessageTime}</Text>
                      {!!elt.unreadCount && (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadText}>
                            {elt.unreadCount}
                          </Text>
                        </View>
                      )}
                    </View>
                  }
                />
              </Pressable>
            ))
          ) : (
            <NoList />
          )}
        </ScrollView>
      </View>
      <AddStudentBtn onPress={addStudent} />
    </SafeAreaView>
  );
}

const NoList = () => {
  return (
    <View style={styles.noListContainer}>
      <Text style={{ fontSize: 20 }}>채팅방이 아직 없습니다.</Text>
      <Text style={{ fontSize: 12 }}>
        아래의 추가 버튼을 눌러 채팅방을 만들어보세요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
  },
  mainTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 13,
    paddingHorizontal: 27,
    marginLeft: 7,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  scrollView: {
    marginVertical: 18,
  },
  chatItemWrapper: {
    paddingVertical: 19,
  },
  rightElement: {
    flex: 1,
    alignItems: "flex-end",
    gap: 8,
    paddingVertical: 7,
  },
  timeText: {
    color: "#676767",
    fontSize: 11,
  },
  unreadBadge: {
    backgroundColor: "red",
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  unreadText: {
    color: "white",
    fontSize: 9,
    fontFamily: "Pretendard-Medium",
  },

  noListContainer: {
    height: 124,
    backgroundColor: "#F0F0F0",
    gap: 8,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
