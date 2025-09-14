import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { listImage, yourDefaultProfileImage } from "@/assets";
import { HorizontalLine } from "./HorizontalLine";
import { router } from "expo-router";
import { api } from "@/api";
import { RouterName } from "../RouterName";

const MemberList = ({ list, title, userRole, waiting, loadData }) => {
  const handlePress = async (connectionId, action) => {
    try {
      const response = await api.post(`/connection/response`, {
        connectionId,
        action,
      });
      await loadData();
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
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
                            handlePress(elt.connectionId, "accepted")
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
                            handlePress(elt.connectionId, "rejected")
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
