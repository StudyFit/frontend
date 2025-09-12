import { detailInfoIcon } from "@/assets";
import React from "react";
import { Image, Pressable, Text, StyleSheet } from "react-native";

const SortBtn = ({ sort, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Image source={detailInfoIcon.sortIcon} style={styles.icon} />
      <Text style={styles.text}>{sort}순</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 57,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: "row",
    gap: 2,
  },
  icon: {
    width: 17,
    height: 17,
  },
  text: {
    fontSize: 10,
  },
});

export default SortBtn;
