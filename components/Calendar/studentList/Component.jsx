import { yourDefaultProfileImage } from "@/assets";
import { calendarImage } from "@/assets/images/calendar";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const TotalComponent = ({ onPress, on }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={
          on ? calendarImage.basicProfileOn : calendarImage.basicProfileOff
        }
        style={on ? { width: 46, height: 46 } : { width: 36, height: 36 }}
      />
      <Text style={on ? styles.totalTextOn : styles.totalTextOff}>전체</Text>
    </Pressable>
  );
};

const StudentComponent = ({ profileImage, name, subject, onPress, on }) => {
  console.log(profileImage);
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {on ? (
        <>
          <Image
            source={
              profileImage ? { uri: profileImage } : yourDefaultProfileImage()
            }
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              marginBottom: 5,
            }}
          />
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: 14,
                marginBottom: 5,
              }}
            >
              {name}
            </Text>
            {subject && (
              <Text style={{ fontFamily: "Pretendard-Bold", fontSize: 10 }}>
                {subject}
              </Text>
            )}
          </View>
        </>
      ) : (
        <>
          <Image
            source={
              profileImage ? { uri: profileImage } : yourDefaultProfileImage()
            }
            style={{ width: 36, height: 36, borderRadius: 18, marginBottom: 5 }}
          />
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                color: "#BEBEBE",
                marginBottom: 5,
              }}
            >
              {name}
            </Text>
            {subject && (
              <Text style={{ fontSize: 8, color: "#BEBEBE" }}>{subject}</Text>
            )}
          </View>
        </>
      )}
    </Pressable>
  );
};

export { TotalComponent, StudentComponent };

const styles = StyleSheet.create({
  container: {
    width: 46,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  totalTextOn: {
    fontSize: 14,
    fontFamily: "Pretendard-Bold",
    marginTop: 15,
  },
  totalTextOff: {
    fontSize: 12,
    color: "#BEBEBE",
    marginTop: 13,
  },
});
