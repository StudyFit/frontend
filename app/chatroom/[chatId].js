import {
  chatImage,
  getHexFromBackend,
  themeColors,
  yourDefaultProfileImage,
} from "@/assets";
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
import { api } from "@/api";
import { getName } from "@/util/roleBranch";

export default function ChatRoom() {
  const { chatId, sender } = useLocalSearchParams();
  const parsedSender = JSON.parse(sender);
  const router = useRouter();
  const { userRole } = useUser();
  const scrollViewRef = useRef(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [color, setColor] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [text, setText] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { accessToken } = await getAuthData();
        if (!accessToken || !chatId) return;
        const ws = new WebSocket(
          `wss://port-0-studyfit-backend-mb6gji2d509e5b57.sel4.cloudtype.app/ws/chat?token=${accessToken}&chatRoomId=${chatId}`
        );

        const response = await api.get(`/chat/rooms/${chatId}/messages`);
        console.log(response.data.data);
        setMessageList(response.data.data);

        ws.onopen = () => console.log("WebSocket 연결 성공");
        ws.onmessage = (event) => {
          const message = JSON.parse(event.data);
          console.log(message);
        };
        // 연결 끊김 시 자동 재연결
        ws.onclose = function (event) {
          console.log("연결이 끊어졌습니다. 재연결을 시도합니다...");
          setTimeout(() => {
            // 재연결 로직
          }, 3000);
        };
        // PONG 응답 처리
        ws.onmessage = function (event) {
          if (event.data === "PING") {
            ws.send("PONG");
          }
        };
        ws.onerror = (error) => console.error("WebSocket 오류:", error);
      } catch (e) {
        // console.error(e);
        console.log(e);
      }
    };
    loadData();

    // chatId로 채팅 정보와 내역 검색
    setName(getName(userRole, parsedSender));
    setSubject(parsedSender.studentInfo);
    setColor(parsedSender.themeColor);
    parsedSender.profileImg && setProfileImage(parsedSender.profileImg);

    // 화면 진입 시 자동 스크롤
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
      setTimeout(() => {
        scrollViewRef.current.scrollTo({ y: 99999, animated: false });
      }, 10);
    }
  }, [refresh]);

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

  const sendMessage = async () => {
    try {
      const requestBody = {
        chatRoomId: chatId,
        content: text,
        messageType: "TEXT",
      };
      const response = await api.post(`/chat/messages`, requestBody);
      console.log(response.data);
      setText("");
      setRefresh(true);
    } catch (e) {
      console.log(e);
      // console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.header}>
        <Pressable onPress={() => router.push(RouterName.ChatTab)}>
          <Image source={chatImage.backBtn} style={{ width: 14, height: 22 }} />
        </Pressable>
        <Image
          source={
            profileImage ? { uri: profileImage } : yourDefaultProfileImage()
          }
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginLeft: 18,
            marginRight: 13,
          }}
        />
        <View>
          <Text style={{ fontSize: 18, fontFamily: "Pretendard-Bold" }}>
            {name}
            {userRole === "선생님" ? " 학생" : " 선생님"}
          </Text>
          {subject && (
            <Text style={{ fontSize: 13, fontFamily: "Pretendard-Medium" }}>
              {subject}
            </Text>
          )}
        </View>
      </View>

      {/* 메시지 목록 */}
      <View style={styles.messagesWrapper}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {[...messageList].reverse().map((msg, idx, arr) => {
            // 다음 메시지의 시간과 다르거나, 마지막 메시지면 showTime = true
            const isLast = idx === arr.length - 1;
            const nextMsg = arr[idx + 1];
            const showTime =
              isLast ||
              (nextMsg &&
                !isSameDateTimeWithoutSeconds(msg.sentAt, nextMsg.sentAt));

            return (
              <ChatBubble
                key={msg.id}
                me={msg.senderName !== name}
                time={msg.sentAt}
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
  // 시간 포맷 함수
  function formatToKoreanTime() {
    const date = new Date(time); // 문자열 -> Date 객체
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours < 12 ? "오전" : "오후";
    hours = hours % 12 === 0 ? 12 : hours % 12; // 12시간제로 변환
    return `${ampm} ${hours}:${minutes.toString().padStart(2, "0")}`;
  }

  return (
    <View
      style={[
        styles.messageRow,
        { alignItems: me ? "flex-end" : "flex-start" },
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          me
            ? styles.myMessage
            : {
                alignSelf: "flex-start",
                backgroundColor: getHexFromBackend(color),
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
            {formatToKoreanTime()}
          </Text>
        </View>
      )}
    </View>
  );
};

function isSameDateTimeWithoutSeconds(dateTime1, dateTime2) {
  // 문자열 앞부분만 잘라서 시:분까지만 비교
  const dt1 = dateTime1.slice(0, 16); // "YYYY-MM-DD HH:MM"
  const dt2 = dateTime2.slice(0, 16);
  return dt1 === dt2;
}

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
