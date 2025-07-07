import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import MainTitle from "@/components/MainTitle";
import { listImage } from "@/assets/images/list";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import {
  AddStudentBtn,
  ListEltForStudent,
  ListEltForStudentAccept,
  ListEltForTeacher,
  NoList,
} from "@/components";

const teacherData = [
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
    themeColor: null, // REQUESTED(아직 수락 안함) 이면 null로 뜸.
    connectionStatus: "REQUESTED",
  },
];

const studentData = [
  {
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

export default function List() {
  const [data, setData] = useState([]);
  const { userRole } = useUser();
  const showRole = userRole == "학생" ? "선생님" : "학생";

  const [modalVisible, setModalVisible] = useState(false);
  const [studentId, setStudentId] = useState("");

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

  // 학생 추가하는 함수
  const addStudent = () => {
    // 오류1 : 이미 추가한 사용자인 경우
    // 오류2 : 없는 사용자인 경우
    // 성공 : 학생 추가 신청 보내기
    toggleModal();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* 학생 추가 모달창 */}
      {userRole == "선생님" && (
        <Modal visible={modalVisible} transparent animationType="fade">
          <Pressable style={styles.modalBackground} onPress={toggleModal}>
            <Pressable
              style={styles.modalContainer}
              onPress={(e) => e.stopPropagation()}
            >
              <Text style={{ fontSize: 16 }}>학생 ID를 입력해주세요</Text>
              <View style={styles.idInputBox}>
                <Image
                  source={listImage.studentIdIcon}
                  style={{ width: 16, height: 16 }}
                />
                <TextInput
                  placeholder="학생 ID"
                  value={studentId}
                  onChangeText={setStudentId}
                  style={{ fontSize: 16 }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={20}
                />
              </View>
              <Pressable onPress={addStudent} style={styles.confirmBtn}>
                <Text style={{ color: "white" }}>확인</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      )}

      {/* List 탭 본문 */}
      <ScrollView style={styles.container}>
        <View style={styles.mainTitleContainer}>
          <MainTitle text={showRole + " 목록"} />
          <Image
            source={listImage.listIcon}
            style={{ width: 24, height: 24 }}
          />
        </View>

        {/* 학생 목록 띄우기 */}
        {list.length > 0 &&
          (userRole == "학생" ? (
            <View style={[styles.listContainer, { marginTop: 29 }]}>
              {list.map((elt) => (
                <ListEltForStudent elt={elt} key={elt.teacherId} />
              ))}
            </View>
          ) : (
            <View style={[styles.listContainer, { marginTop: 29 }]}>
              {list.map((elt) => (
                <ListEltForTeacher elt={elt} key={elt.studentId} />
              ))}
            </View>
          ))}

        {/* 친구 대기 목록 띄우기 */}
        {waitingList.length > 0 && (
          <>
            {userRole == "학생" ? (
              <>
                <Text style={styles.waitingText}>수락 요청</Text>
                <View style={styles.listContainer}>
                  {waitingList.map((elt) => (
                    <ListEltForStudentAccept elt={elt} key={elt.teacherId} />
                  ))}
                </View>
              </>
            ) : (
              <>
                <Text style={styles.waitingText}>수락 대기 중</Text>
                <View style={styles.listContainer}>
                  {waitingList.map((elt) => (
                    <ListEltForTeacher elt={elt} key={elt.studentId} waiting />
                  ))}
                </View>
              </>
            )}
          </>
        )}

        {list.length === 0 && waitingList.length === 0 && <NoList />}
      </ScrollView>

      {/* 친구 추가 버튼 (선생님용) */}
      {userRole == "선생님" && <AddStudentBtn onPress={toggleModal} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 13,
    paddingHorizontal: 27,
    paddingBottom: 32,
    backgroundColor: "white",
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 24,
    width: 280,
  },
  idInputBox: {
    width: "100%",
    flexDirection: "row",
    gap: 8.6,
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    paddingLeft: 11,
    paddingVertical: 8,
    marginVertical: 10,
  },
  confirmBtn: {
    width: "100%",
    height: 34,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
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
