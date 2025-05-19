import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { todaysLessonImages } from "../../assets";
import TodaysLessonBox from "@/components/TodaysLessonTab/TodaysLessonBox";
import TodaysHwBox from "@/components/TodaysLessonTab/TodaysHwBox";
import MainTitle from "@/components/MainTitle";

export default function TodaysLessonPage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <DateContainer />
        <View>
          <MainTitle text="오늘의 수업" style={{ marginBottom: 17 }} />
          <TodaysLessonBox />
        </View>
        <View style={{ marginTop: 32, gap: 15 }}>
          <MainTitle text="오늘의 숙제" />
          <TodaysHwBox />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DateContainer = () => {
  return (
    <View style={styles.dateContainer}>
      <Image source={todaysLessonImages.dateLeftBtn} style={styles.dateBtn} />
      <Text style={styles.dateText}>Feb 01</Text>
      <Image source={todaysLessonImages.dateRightBtn} style={styles.dateBtn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 27,
    paddingBottom: 32,
    backgroundColor: "white",
  },

  dateContainer: {
    marginBottom: 35,
    flexDirection: "row",
    alignItems: "center",
  },
  dateBtn: { width: 30, height: 30 },
  dateText: {
    marginHorizontal: 13,
    fontSize: 30,
    fontFamily: "Pretendard-Bold",
  },
});
