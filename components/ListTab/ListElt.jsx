import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  getColorName,
  listImage,
  themeColorName,
  yourDefaultProfileImage,
} from "@/assets";
import { HorizontalLine } from "./HorizontalLine";
import { router } from "expo-router";
import { api } from "@/api";
import { ColorModal } from "./register";
import { useState } from "react";

const MemberList = ({ list, title, userRole, waiting, loadData }) => {
  const [showColorModal, setShowColorModal] = useState(false);
  const [color, setColor] = useState("");
  const [selectedConnectionId, setSelectedConnectionId] = useState(null);

  const handleConnectionRequest = async (connectionId, action) => {
    try {
      const response = await api.post(`/connection/response`, {
        connectionId,
        action,
      });
      console.log(response.data);
      setSelectedConnectionId(connectionId);
      if (action == "ACCEPTED") setShowColorModal(true);
    } catch (e) {
      console.error(e);
    }
  };

  const closeColorModal = async () => {
    if (!color) return;
    try {
      const response = await api.patch(`/connection/color`, {
        connectionId: selectedConnectionId,
        themeColor: getColorName(color),
      });
      console.log(getColorName(color));
      console.log(response.data);
      setShowColorModal(false);
      setSelectedConnectionId(null);
      // await loadData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {showColorModal && (
        <ColorModal
          onRequestClose={closeColorModal}
          selectedColor={color}
          setColor={setColor}
        />
      )}
      {list.length > 0 ? (
        <>
          <HorizontalLine text={title} />
          <View style={{ gap: 20 }}>
            {list &&
              list.map((elt, i) => (
                <ListElt
                  elt={elt}
                  key={i}
                  leftBtnElt={
                    waiting ? (
                      userRole == "학생" && (
                        <AcceptButton
                          onPress={() =>
                            handleConnectionRequest(
                              elt.connectionId,
                              "ACCEPTED"
                            )
                          }
                        />
                      )
                    ) : (
                      <InfoButton />
                    )
                  }
                  rightBtnElt={
                    waiting ? (
                      userRole == "학생" && (
                        <RejectButton
                          onPress={() =>
                            handleConnectionRequest(
                              elt.connectionId,
                              "REJECTED"
                            )
                          }
                        />
                      )
                    ) : (
                      <SendMessageButton />
                    )
                  }
                />
              ))}
          </View>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const ListElt = ({ elt, leftBtnElt, rightBtnElt }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginRight: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0.3, height: 0.3 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 6,
        }}
      >
        <Image
          source={elt.profileImage || yourDefaultProfileImage()}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
        />
      </View>

      <Pressable
        style={{ gap: 5, width: "55%" }}
        onPress={() => {
          router.push(`/detailInfo/${elt.studentId || elt.teacherId}`);
        }}
      >
        <Text style={{ fontSize: 15, fontFamily: "Pretendard-Medium" }}>
          {elt.studentName || elt.teacherName}
        </Text>
        <Text style={{ fontSize: 12 }}>{elt.subject}</Text>
      </Pressable>

      <View
        style={{
          gap: 7,
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
        }}
      >
        {leftBtnElt}
        {rightBtnElt}
      </View>
    </View>
  );
};

const AcceptButton = ({ onPress }) => {
  return (
    <Pressable style={styles.btnContainer} onPress={onPress}>
      <Text style={[styles.btnText]}>수락</Text>
    </Pressable>
  );
};

const RejectButton = ({ onPress }) => {
  return (
    <Pressable
      style={[styles.btnContainer, { borderColor: "red" }]}
      onPress={onPress}
    >
      <Text style={[styles.btnText, { color: "red" }]}>거절</Text>
    </Pressable>
  );
};

const InfoButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Image source={listImage.infoBtn} style={{ width: 38, height: 38 }} />
    </Pressable>
  );
};

const SendMessageButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={listImage.sendMessageBtn}
        style={{ width: 38, height: 38 }}
      />
    </Pressable>
  );
};

export { MemberList };

const styles = StyleSheet.create({
  btnContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontSize: 11 },
});
