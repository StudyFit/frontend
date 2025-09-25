import { yourDefaultProfileImage } from "@/assets";
import { Image, Text, View } from "react-native";

const ProfileListItem = ({ imageUri, name, content, rightElement }) => {
  const imageSrc = imageUri
    ? {
        uri: `https://study-fit-bucket.s3.ap-northeast-2.amazonaws.com/${imageUri}`,
      }
    : yourDefaultProfileImage();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 7,
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0.3, height: 0.3 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={imageSrc}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
        />
      </View>
      <View style={{ gap: 5 }}>
        <Text style={{ fontSize: 15, fontFamily: "Pretendard-Medium" }}>
          {name}
        </Text>
        <Text style={{ fontSize: 12, color: "#676767" }}>{content}</Text>
      </View>
      {rightElement && (
        <View style={{ marginLeft: "auto" }}>{rightElement}</View>
      )}
    </View>
  );
};

export { ProfileListItem };
