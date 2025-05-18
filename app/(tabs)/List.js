import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import MainTitle from "@/components/MainTitle";
import { listImage } from "../../assets/images/list";
import NoList from "@/components/ListTab/NoList";

export default function List() {
  const list = [
    {
      id: 1,
      name: "정채영",
      grade: "고1",
      subject: "수학",
      color: "#FDEC91",
    },
    {
      id: 2,
      name: "김정은",
      grade: "중3",
      subject: "과학",
      color: "#D3ED70",
    },
  ];

  const waitingList = [
    {
      id: 1,
      name: "유빙구",
      grade: "초2",
      subject: "영어",
      color: "#BBD9FB",
    },
    {
      id: 2,
      name: "밥빙구",
      grade: "중1",
      subject: "수학",
      color: "#D3BDFE",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 29,
            marginLeft: 7,
          }}
        >
          <MainTitle text="학생 목록" />
          <Image
            source={listImage.listIcon}
            style={{ width: 24, height: 24 }}
          />
        </View>

        <View style={styles.listContainer}>
          {list ? list.map((elt) => <ListElt elt={elt} />) : <NoList />}
        </View>

        {waitingList && (
          <>
            <Text style={{ marginTop: 22, marginBottom: 7, fontSize: 20 }}>
              수락 대기 중
            </Text>
            <View style={styles.listContainer}>
              {waitingList.map((elt) => (
                <ListElt elt={elt} key={elt.id} />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <AddStudentBtn />
    </SafeAreaView>
  );
}

const ListElt = ({ elt }) => {
  return (
    <View style={[styles.listElt, { backgroundColor: elt.color }]}>
      <Text style={{ fontSize: 20, marginRight: 4 }}>{elt.name}</Text>
      <Text style={{ marginRight: "auto", alignSelf: "flex-end" }}>학생</Text>
      <Text style={{ fontSize: 16, marginRight: 15 }}>{elt.grade}</Text>
      <Text>{elt.subject}</Text>
    </View>
  );
};

const AddStudentBtn = () => {
  const addStudent = () => {};

  return (
    <Pressable
      onPress={addStudent}
      style={{
        position: "absolute",
        bottom: 37,
        right: 19,
      }}
    >
      <Image
        source={listImage.addStudentBtn}
        style={{ width: 43, height: 43 }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 13,
    paddingHorizontal: 27,
    paddingBottom: 32,
    backgroundColor: "white",
  },
  listContainer: {
    gap: 7,
  },
  listElt: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 13,
    paddingLeft: 22,
    paddingRight: 16,
  },
});
