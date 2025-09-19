import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
const imageLinks = [
  "https://i.imgur.com/FJZTusI.png",
  "https://i.imgur.com/j5qM2uX.png",
  "https://i.imgur.com/ABCD123.png",
  "https://i.imgur.com/XYZ987.png",
  "https://i.imgur.com/LMNO456.png",
  "https://i.imgur.com/QWER789.png",
  "https://i.imgur.com/6ja0pyC.png",
  "https://i.imgur.com/IXyj8az.png",
];

const Screen_2 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(
        "https://68cd5784da4697a7f3059f13.mockapi.io/medicins"
      );
      const data = await res.json();

      const mapped = data.map((item) => ({
        ...item,
        image: item.image,
      }));

      setMedicines(mapped);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>

      <View style={styles.priceStarContainer}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.star}>★ {item.star}</Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity>
        <Text style={styles.readMore}>Read More +</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View
              style={[
                styles.searchBox,
                searchFocused && styles.inputContainerFocused,
              ]}
            >
              <Image
                source={require("../assets/anh01.png")}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search here..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onChangeText={setSearchQuery}
              />
            </View>
            <View style={styles.logoBackground}>
              <Image
                source={require("../assets/anh02.png")}
                style={styles.logoicon}
              />
            </View>
          </View>
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={require("../assets/anh03.png")}
            style={styles.banner}
          />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Free Consultation</Text>
            <Text style={styles.bannerText}>
              Feel free to consult with one of our experienced {"\n"} doctors
              for personalized advice.
            </Text>
            <TouchableOpacity style={styles.roundButton}></TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <View style={styles.subtitleContainer}>
            <Text style={styles.greeting}>Hello, User!</Text>
            <Text style={styles.subtitle}>
              We have some additional suggestions for you.
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All +</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <ScrollView style={{ flex: 1 }}>
          <FlatList
            data={medicines}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.flatListContent}
          />
        </ScrollView>

        {/* Footer giữ nguyên */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // giữ nguyên styles bạn đã viết
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },
  bannerContainer: { position: "relative", width: "100%", height: 150 },
  banner: { width: "100%", height: "100%", resizeMode: "cover" },
  bannerContent: { position: "absolute", bottom: 10, left: 20 },
  bannerTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  bannerText: { color: "#fff", fontSize: 12, marginVertical: 5 },
  roundButton: {
    position: "absolute",
    bottom: 10,
    right: -100,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: { padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoBackground: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  logoicon: { width: 15, height: 15 },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  inputContainerFocused: { borderColor: "#1f1f1f" },
  searchInput: { flex: 1, backgroundColor: "transparent", marginLeft: 10 },
  searchIcon: { width: 20, height: 20 },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    marginBottom: 20,
  },
  subtitleContainer: { flex: 1, marginRight: 10 },
  greeting: { color: "#1a73e8", fontSize: 28, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#555" },
  seeAll: { color: "#1a73e8", fontSize: 16 },
  flatListContent: { padding: 10 },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "flex-start",
  },
  image: { width: 155, height: 100, borderRadius: 8 },
  name: { fontSize: 16, fontWeight: "bold" },
  priceStarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 5,
    marginTop: 5,
  },
  price: { fontSize: 14, color: "#1a73e8" },
  star: { fontSize: 14, color: "#f1c40f" },
  description: { fontSize: 12, color: "#888", marginVertical: 4 },
  readMore: { color: "#1a73e8", fontWeight: "bold" },
});

export default Screen_2;
