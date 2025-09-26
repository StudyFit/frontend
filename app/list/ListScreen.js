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
import { getName, getStatus } from "@/util/roleBranch";

export default function ListScreen({ setAddMode, setStudentInfo }) {
  const [data, setData] = useState([]);
  const { userRole } = useUser();
  const showRole = userRole == "학생" ? "선생님" : "학생";
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // 검색어 필터
  const filteredData = data.filter((elt) =>
    getName(userRole, elt)?.toLowerCase().includes(searchText.toLowerCase())
  );

  // 최종 리스트
  const list = filteredData.filter(
    (elt) => getStatus(userRole, elt) === "ACCEPTED"
  );
  const waitingList = filteredData.filter(
    (elt) => getStatus(userRole, elt) === "REQUESTED"
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
      console.log(e);
      // console.errsor(e);
    }
  };

  useEffect(() => {
    loadData();
    setRefresh(false);
  }, [refresh]);

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
            setRefresh={setRefresh}
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
