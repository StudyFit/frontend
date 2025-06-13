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
import { listImage } from "@/assets/images/list";
import NoList from "@/components/ListTab/NoList";
import { useUser } from "@/contexts/UserContext";
import {
  ListEltForStudent,
  ListEltForStudentAccept,
  ListEltForTeacher,
} from "@/components/ListTab/ListElt";

export default function List() {
  const { userRole } = useUser();
  const showRole = userRole == "학생" ? "선생님" : "학생";

  const data = [
    {
      connectionId: 1,
      teacherId: 1,
      teacherName: "엔젤라",
      subject: "영어",
      themeColor: "blue",
      connectionStatus: "ACCEPTED",
    },
    {
      connectionId: 2,
      teacherId: 2,
      teacherName: "장유빈",
      subject: "수학",
      themeColor: null,
      connectionStatus: "REQUESTED",
    },
    /* {
      connectionId: 2,
      teacherId: 2,
      teacherName: "장유빈",
      subject: "수학",
      themeColor: "green",
      connectionStatus: "ACCEPTED",
    }, */
  ];

  // const list = [
  //   {
  //     id: 1,
  //     name: "정채영",
  //     grade: "고1",
  //     subject: "수학",
  //     color: "#FDEC91",
  //   },
  //   {
  //     id: 2,
  //     name: "김정은",
  //     grade: "중3",
  //     subject: "과학",
  //     color: "#D3ED70",
  //   },
  // ];

  // const waitingList = [
  //   {
  //     id: 1,
  //     name: "유빙구",
  //     grade: "초2",
  //     subject: "영어",
  //     color: "#BBD9FB",
  //   },
  //   {
  //     id: 2,
  //     name: "밥빙구",
  //     grade: "중1",
  //     subject: "수학",
  //     color: "#D3BDFE",
  //   },
  // ];

  const list = data.filter((elt) => elt.connectionStatus === "ACCEPTED");
  const waitingList = data.filter(
    (elt) => elt.connectionStatus === "REQUESTED"
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <View style={styles.mainTitleContainer}>
          <MainTitle text={showRole + " 목록"} />
          <Image
            source={listImage.listIcon}
            style={{ width: 24, height: 24 }}
          />
        </View>

        {list.length > 0 &&
          (userRole == "학생" ? (
            <View style={[styles.listContainer, { marginTop: 29 }]}>
              {list.map((elt) => (
                <ListEltForStudent elt={elt} key={elt.connectionId} />
              ))}
            </View>
          ) : (
            <View style={[styles.listContainer, { marginTop: 29 }]}>
              {list.map((elt) => (
                <ListEltForTeacher elt={elt} key={elt.connectionId} />
              ))}
            </View>
          ))}

        {waitingList.length > 0 && (
          <>
            {userRole == "학생" ? (
              <>
                <Text style={styles.waitingText}>수락 요청</Text>
                <View style={styles.listContainer}>
                  {waitingList.map((elt) => (
                    <ListEltForStudentAccept elt={elt} key={elt.connectionId} />
                  ))}
                </View>
              </>
            ) : (
              <>
                <Text style={styles.waitingText}>수락 대기 중</Text>
                <View style={styles.listContainer}>
                  {waitingList.map((elt) => (
                    <ListEltForTeacher
                      elt={elt}
                      key={elt.connectionId}
                      waiting
                    />
                  ))}
                </View>
              </>
            )}
          </>
        )}

        {list.length === 0 && waitingList.length === 0 && <NoList />}
      </ScrollView>

      {userRole == "선생님" && <AddStudentBtn />}
    </SafeAreaView>
  );
}

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
  mainTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 7,
  },
  listContainer: {
    gap: 7,
  },

  waitingText: {
    marginTop: 22,
    marginBottom: 7,
    fontSize: 20,
    fontFamily: "Pretendard-Bold",
  },
});
