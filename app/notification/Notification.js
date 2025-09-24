import { notiImage } from "@/assets/images/notification";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const data = [
  {
    id: 5,
    receiverId: 1,
    receiverRole: "STUDENT",
    senderName: "string",
    senderProfileImg: null,
    content: "8월 25일 숙제를 완료하세요!",
    createdAt: "2025-09-22T22:55:35.745247",
    hasRead: true,
  },
  {
    id: 4,
    receiverId: 1,
    receiverRole: "STUDENT",
    senderName: "string",
    senderProfileImg: null,
    content: "8월 25일 숙제를 완료하세요!",
    createdAt: "2025-09-22T22:55:34.098341",
    hasRead: false,
  },
  {
    id: 3,
    receiverId: 1,
    receiverRole: "STUDENT",
    senderName: "string",
    senderProfileImg: null,
    content: "8월 25일 숙제를 완료하세요!",
    createdAt: "2025-09-22T22:55:32.330496",
    hasRead: true,
  },
  {
    id: 2,
    receiverId: 1,
    receiverRole: "STUDENT",
    senderName: "string",
    senderProfileImg: null,
    content: "8월 25일 숙제를 완료하세요!",
    createdAt: "2025-09-22T22:55:22.578494",
    hasRead: false,
  },
  {
    id: 1,
    receiverId: 1,
    receiverRole: "STUDENT",
    senderName: "string",
    senderProfileImg: null,
    content: "9월 21일 숙제를 완료하세요!",
    createdAt: "2025-09-22T21:18:01.154499",
    hasRead: true,
  },
];

const Notification = ({ closeNoti }) => {
  return (
    <View>
      <View>
        <Pressable onPress={closeNoti}>
          <Image source={notiImage.backBtn} style={{ width: 24, height: 24 }} />
        </Pressable>
        <Text>알림</Text>
      </View>
      <ScrollView>
        {data.map((noti) => (
          <View
            key={noti.id}
            style={{ backgroundColor: noti.hasRead && "#EAEAEA" }}
          >
            <Image source={{ uri: noti.senderProfileImg }} />
            <Text>{noti.senderName}</Text>
            <Text>{noti.createdAt.split("T")[0]}</Text>
            <Text>{noti.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Notification;
