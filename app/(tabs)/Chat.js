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

export default function Chat() {
  const router = useRouter();
  const [chatList, setChatList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const { userRole } = useUser();

  useEffect(() => {
    const loadChatList = async () => {
      try {
        const response = await api.get(`/chat/rooms`);
        console.log(response.data.data);
        setChatList(response.data.data);
      } catch (e) {
        console.error("loadChatList", e);
      }
    };
    const loadPeopleList = async () => {
      try {
        const url = `/connection/${
          userRole == "학생" ? "teachers" : "students"
        }`;
        const response = await api.get(url);
        setPeopleList(response.data.data);
        console.log(response.data.data);
      } catch (e) {
        console.error("loadPeopleList", e);
      }
    };

    loadChatList();
    loadPeopleList();
  }, [addModalVisible]);

  const addStudent = () => setAddModalVisible(true);

  // 채팅방 이동 함수
  const goToChatRoom = (elt) => {
    if (!elt) return;
    const senderName = getName(userRole, elt);
    const connectionId = elt.connectionId;
    const selectedPerson = peopleList.find(
      (item) =>
        item.connectionId === connectionId &&
        getName(userRole, item) == senderName
    );
    router.push({
      pathname: "/chatroom/[chatId]",
      params: {
        chatId: String(elt.id),
        sender: JSON.stringify(selectedPerson),
      },
    });
  };

  const lastSenderIsMe = (elt) => {
    const lastSenderRole = elt.lastMessageSender;
    // 마지막으로 보낸 사람이 나면
    if (
      (lastSenderRole == "TEACHER" && userRole == "선생님") ||
      (lastSenderRole == "STUDENT" && userRole == "학생")
    )
      return true;
    // 마지막으로 보낸 사람이 상대면
    else return false;
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
                onPress={() => goToChatRoom(elt)}
              >
                <ProfileListItem
                  name={getName(userRole, elt)}
                  content={elt.lastMessageContent || "채팅을 시작해보세요."}
                  imageUri={elt.opponentProfileImg}
                  rightElement={
                    <View style={styles.rightElement}>
                      <Text style={styles.timeText}>
                        {elt.lastMessageTime?.split("T")[0]}
                      </Text>
                      {!!elt.unreadCount && !lastSenderIsMe(elt) && (
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
