import { StyleSheet, ScrollView, View, Image, TextInput } from "react-native";
import { listImage } from "@/assets/images/list";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import {
  AddStudentBtn,
  AddStudentModal,
  NoList,
  MemberList,
} from "@/components";

const teacherData = [
  {
    profileImage: "",
    connectionId: 1,
    teacherId: 1,
    teacherName: "엔젤라",
    subject: "영어",
    themeColor: "blue",
    connectionStatus: "ACCEPTED",
  },
  {
    profileImage: "",
    connectionId: 2,
    teacherId: 2,
    teacherName: "장유빈",
    subject: "수학",
    themeColor: null,
    connectionStatus: "REQUESTED",
  },
];

const studentData = [
  {
    profileImage: "",
    connecitonId: 1,
    studentId: 1,
    studentName: "학생1",
    studentInfo: "태원고등학교2",
    subject: "수학",
    themeColor: "blue",
    memo: "메모",
    address: "집 주소",
    connectionStatus: "REQUESTED",
  },
  {
    profileImage: "",
    connecitonId: 1,
    studentId: 1,
    studentName: "학생1",
    studentInfo: "태원고등학교2",
    subject: "수학",
    themeColor: "blue",
    memo: "메모",
    address: "집 주소",
    connectionStatus: "REQUESTED",
  },
  {
    profileImage: "",
    connecitonId: 1,
    studentId: 1,
    studentName: "학생1",
    studentInfo: "태원고등학교2",
    subject: "수학",
    themeColor: "blue",
    memo: "메모",
    address: "집 주소",
    connectionStatus: "REQUESTED",
  },
  {
    profileImage: "",
    connecitonId: 1,
    studentId: 1,
    studentName: "학생1",
    studentInfo: "태원고등학교2",
    subject: "수학",
    themeColor: "blue",
    memo: "메모",
    address: "집 주소",
    connectionStatus: "ACCEPTED",
  },
  {
    profileImage: "",
    connecitonId: 3,
    studentId: 2,
    studentName: "학생2",
    studentInfo: "야탑중2",
    subject: "물리1",
    themeColor: "pink",
    memo: "메모.",
    address: "서울",
    connectionStatus: "ACCEPTED",
  },
];

export default function ListScreen({ setAddMode, setStudentInfo }) {
  const [data, setData] = useState([]);
  const { userRole } = useUser();
  const showRole = userRole == "학생" ? "선생님" : "학생";
  const [searchText, setSearchText] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const list = data.filter((elt) => elt.connectionStatus === "ACCEPTED");
  const waitingList = data.filter(
    (elt) => elt.connectionStatus === "REQUESTED"
  );

  // 띄울 데이터 설정
  useEffect(() => {
    if (userRole == "학생") setData(teacherData);
    else setData(studentData);
  }, []);

  // 모달 여닫기 함수
  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <>
      <ScrollView style={styles.container}>
        {modalVisible && (
          <AddStudentModal
            toggleModal={toggleModal}
            setAddMode={setAddMode}
            setStudentInfo={setStudentInfo}
          />
        )}

        {/* 검색창 */}
        <SearchBar text={searchText} setText={setSearchText} />

        <View style={{ marginHorizontal: 26 }}>
          <MemberList list={waitingList} title="수락 대기 중" waiting />
          <MemberList
            list={list}
            showRole={showRole}
            title={"나의 " + (showRole == "학생" ? "학생들" : "선생님")}
          />
        </View>

        {list.length === 0 && waitingList.length === 0 && <NoList />}

        {/* 친구 추가 버튼 (선생님용) */}
      </ScrollView>
      {userRole == "선생님" && <AddStudentBtn onPress={toggleModal} />}
    </>
  );
}

const SearchBar = ({ text, setText }) => {
  return (
    <View
      style={{
        height: 44,
        borderColor: "#E4E4E4",
        borderWidth: 1,
        borderRadius: 15,
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 12,
        marginTop: 23,
        paddingHorizontal: 14,
      }}
    >
      <Image
        source={listImage.searchIcon}
        style={{ width: 16.8, height: 16.8, marginRight: 13 }}
      />
      <TextInput
        placeholder="Search . . ."
        style={{ fontFamily: "Pretendard-Medium", fontSize: 14 }}
        value={text}
        onChangeText={setText}
        maxLength={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
