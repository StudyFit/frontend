import { chatImage, themeColors, yourDefaultProfileImage } from "@/assets";
import { RouterName } from "@/components";
import { useUser } from "@/contexts/UserContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getAuthData } from "@/contexts/AuthSecureStore";

const data = {
  name: "정채영",
  subject: "고3 수학",
  profileImage: "",
  color: "lightGreen",
  messages: [
    {
      id: 1,
      sender: "me",
      content: "안녕하세요! 오늘 숙제 다 했나요?",
      time: "12:00",
    },
    { id: 2, sender: "정채영", content: "네! 다 했어요~", time: "12:01" },
    {
      id: 3,
      sender: "me",
      content: "아주 잘했어요! 사진도 올려주세요.",
      time: "12:02",
    },
    { id: 4, sender: "정채영", content: "네! 사진 올릴게요.", time: "12:04" },
    {
      id: 5,
      sender: "정채영",
      content:
        "https://study-fit-bucket.s3.ap-northeast-2.amazonaws.com/13014d3a-0133-464b-acf3-b09729ea0b26_스크린샷 2025-07-07 222343.png",
      time: "12:04",
      type: "image",
    },
    {
      id: 6,
      sender: "me",
      content: "확인했습니다~ 수고했어요!",
      time: "12:05",
    },
    {
      id: 7,
      sender: "정채영",
      content: "쌤, 내일 수업 준비물 뭐예요?",
      time: "12:06",
    },
    {
      id: 8,
      sender: "me",
      content: "교과서랑 노트만 챙겨오면 돼요!",
      time: "12:07",
    },
    { id: 9, sender: "정채영", content: "네 알겠어요~", time: "12:08" },
    { id: 10, sender: "me", content: "오늘도 고생 많았어요 :)", time: "12:09" },
    {
      id: 11,
      sender: "정채영",
      content: "감사합니다! 좋은 하루 보내세요!",
      time: "12:10",
    },
    { id: 12, sender: "me", content: "네~", time: "12:11" },
    {
      id: 13,
      sender: "정채영",
      content: "쌤, 다음주에 일본 여행 가요!",
      time: "12:12",
    },
    {
      id: 14,
      sender: "me",
      content: "와! 재밌게 다녀오고 사진도 보여줘요~",
      time: "12:13",
    },
    {
      id: 15,
      sender: "정채영",
      content: "네! 숙제도 꼭 할게요!",
      time: "12:14",
    },
    { id: 16, sender: "me", content: "기대할게요 :)", time: "12:15" },
    {
      id: 17,
      sender: "정채영",
      content: "쌤, 오늘 수업 너무 재밌었어요!",
      time: "12:16",
    },
    {
      id: 18,
      sender: "me",
      content: "정채영이 열심히 해서 그래요~",
      time: "12:17",
    },
    { id: 19, sender: "정채영", content: "감사합니다!", time: "12:18" },
    { id: 20, sender: "me", content: "다음 시간에 봐요!", time: "12:19" },
  ],
};

export default function ChatRoom() {
  const { chatId } = useLocalSearchParams();
  const router = useRouter();
  const { userRole } = useUser();
  const scrollViewRef = useRef(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [profileImage, setProfileImage] = useState(yourDefaultProfileImage());
  const [color, setColor] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const { accessToken } = getAuthData();
      const ws = new WebSocket(
        `wss://port-0-studyfit-backend-mb6gji2d509e5b57.sel4.cloudtype.app/ws/chat?token=${accessToken}&chatRoomId=${chatId}`
      );

      ws.onopen = () => console.log("WebSocket 연결 성공");

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
      };

      ws.onerror = (error) => console.error("WebSocket 오류:", error);
    } catch (e) {
      console.error(e);
    }

    // chatId로 채팅 정보와 내역 검색
    setName(data.name);
    setSubject(data.subject);
    setColor(data.color);

    // 화면 진입 시 자동 스크롤
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
      setTimeout(() => {
        scrollViewRef.current.scrollTo({ y: 99999, animated: false });
      }, 10);
    }
  }, []);

  // 첨부파일 불러오기 함수
  const pickAttachment = async () => {
    console.log("첨부파일 불러오기");
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("사진 접근 권한이 필요합니다.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      quality: 1,
    });
    if (!result.canceled) {
      // result.assets[0].uri에 파일 경로가 들어있음
      console.log("첨부파일 URI:", result.assets[0].uri);
      // 파일 업로드/미리보기 등 추가
    }
  };

  const sendMessage = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.header}>
        <Pressable onPress={() => router.push(RouterName.ChatTab)}>
          <Image source={chatImage.backBtn} style={{ width: 14, height: 22 }} />
        </Pressable>
        <Image
          source={profileImage}
          style={{ width: 50, height: 50, marginLeft: 18, marginRight: 13 }}
        />
        <View>
          <Text style={{ fontSize: 18, fontFamily: "Pretendard-Bold" }}>
            {name}
            {userRole === "선생님" ? " 학생" : " 선생님"}
          </Text>
          <Text style={{ fontSize: 13, fontFamily: "Pretendard-Medium" }}>
            {subject}
          </Text>
        </View>
      </View>

      {/* 메시지 목록 */}
      <View style={styles.messagesWrapper}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {data.messages.map((msg, idx, arr) => {
            // 다음 메시지의 시간과 다르거나, 마지막 메시지면 showTime = true
            const isLast = idx === arr.length - 1;
            const nextMsg = arr[idx + 1];
            const showTime = isLast || msg.time !== nextMsg?.time;

            return (
              <ChatBubble
                key={msg.id}
                me={msg.sender === "me"}
                time={msg.time}
                type={msg.type}
                content={msg.content}
                showTime={showTime}
                color={color}
              />
            );
          })}
        </ScrollView>
      </View>

      {/* 메시지 입력창 */}
      <View style={styles.inputBar}>
        <Pressable onPress={pickAttachment}>
          <Image source={chatImage.attachmentBtn} style={styles.inputIcon} />
        </Pressable>
        <TextInput
          value={text}
          placeholder="Messages . . ."
          style={styles.textInput}
          onChangeText={setText}
        />
        <Pressable onPress={sendMessage}>
          <Image source={chatImage.sendBtn} style={styles.sendIcon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const ChatBubble = ({ me, time, content, showTime, color, type }) => {
  const formattedtime = formatTime(time);

  // 시간 포맷 함수
  function formatTime(time) {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    const isAM = h < 12;
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${isAM ? "오전" : "오후"} ${hour12}:${m
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <View
      style={[
        styles.messageRow,
        {
          alignItems: me ? "flex-end" : "flex-start",
        },
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          me
            ? styles.myMessage
            : {
                alignSelf: "flex-start",
                borderBottomLeftRadius: 0,
                backgroundColor: themeColors[color],
              },
        ]}
      >
        {type === "image" ? (
          <Image
            source={{ uri: content }}
            style={{ minWidth: 200, height: 200, borderRadius: 8 }}
          />
        ) : (
          <Text style={styles.messageText}>{content}</Text>
        )}
      </View>
      {showTime && (
        <View>
          <Text
            style={[
              styles.timeText,
              me ? { marginLeft: 6 } : { marginRight: 6 },
            ]}
          >
            {formattedtime}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 17,
    backgroundColor: "#F1F1F1",
  },
  messagesWrapper: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 0,
  },
  messageRow: {
    width: "100%",
    marginBottom: 19,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "75%",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  myMessage: {
    backgroundColor: "#F1F1F1",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  messageText: {
    fontSize: 14,
  },
  timeText: {
    fontSize: 10,
    color: "#939393",
    marginTop: 6,
  },
  inputBar: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E4E4E4",
  },
  inputIcon: {
    width: 22,
    height: 22,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
});
