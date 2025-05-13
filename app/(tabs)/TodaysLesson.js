import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { todaysLessonImages } from "../../assets";
import TodaysLessonBox from "@/components/TodaysLessonTab/_components/TodaysLessonBox";
import TodaysHwBox from "@/components/TodaysLessonTab/_components/TodaysHwBox";

export default function TodaysLessonPage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <DateContainer />
        <View>
          <Text style={[styles.titleText, { marginBottom: 17 }]}>
            오늘의 수업
          </Text>
          <TodaysLessonBox />
        </View>
        <View style={{ marginTop: 32, gap: 15 }}>
          <Text style={styles.titleText}>오늘의 숙제</Text>
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
  },
  dateBtn: { width: 30, height: 30 },
  dateText: {
    marginHorizontal: 13,
    fontSize: 30,
    fontWeight: "bold",
  },

  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
