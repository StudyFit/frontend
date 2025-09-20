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
import { api } from "@/api";

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

  const getStatus = (elt) =>
    userRole === "학생" ? elt.connectionStatus : elt.friendStatus;

  // 검색 기준 이름 필드
  const getName = (elt) =>
    userRole === "학생" ? elt.teacherName : elt.studentName;

  // 검색어 필터
  const filteredData = data.filter((elt) =>
    getName(elt)?.toLowerCase().includes(searchText.toLowerCase())
  );

  // 최종 리스트
  const list = filteredData.filter((elt) => getStatus(elt) === "ACCEPTED");
  const waitingList = filteredData.filter(
    (elt) => getStatus(elt) === "REQUESTED"
  );

  // 띄울 데이터 설정
  const loadData = async () => {
    try {
      const url =
        userRole == "학생" ? `/connection/teachers` : `/connection/students`;
      const response = await api.get(url);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
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
          <MemberList
            list={waitingList}
            title="수락 대기 중"
            userRole={userRole}
            waiting
            loadData={loadData}
          />
          <MemberList
            list={list}
            userRole={userRole}
            title={"나의 " + (showRole == "학생" ? "학생들" : "선생님")}
          />
        </View>

        {list.length === 0 && waitingList.length === 0 && (
          <NoList showRole={showRole} />
        )}
      </ScrollView>
      {/* 친구 추가 버튼 (선생님용) */}
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
