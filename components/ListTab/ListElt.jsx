import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { HorizontalLine } from ".";
import { listImage } from "@/assets";

const MemberList = ({ list, title, waiting }) => {
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
                  leftBtnElt={waiting ? <AcceptButton /> : <InfoButton />}
                  rightBtnElt={
                    waiting ? <RejectButton /> : <SendMessageButton />
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
          source={elt.profileImage}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
        />
      </View>

      <View style={{ gap: 5 }}>
        <Text style={{ fontSize: 15, fontFamily: "Pretendard-Medium" }}>
          {elt.studentName || elt.teacherName}
        </Text>
        <Text style={{ fontSize: 12 }}>{elt.subject}</Text>
      </View>

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
