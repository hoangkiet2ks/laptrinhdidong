import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";

// ⚡ Đổi URL tùy môi trường
// - Web: "http://localhost:4000"
// - Android Emulator: "http://10.0.2.2:4000"
// - Device thật: "http://<IP máy bạn>:4000"
const API_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

const mongoService = {
  list: async () => {
    const res = await api.get("/medicine");
    return res.data;
  },
  create: async (medicine) => {
    const res = await api.post("/medicine", medicine);
    return res.data;
  },
  update: async (id, medicine) => {
    const res = await api.put(`/medicine/${id}`, medicine);
    return res.data;
  },
  remove: async (id) => {
    const res = await api.delete(`/medicine/${id}`);
    return res.data;
  },
};

const Screen_3 = () => {
  const [medicines, setMedicines] = useState([]);
  const [selected, setSelected] = useState(null); // thuốc được chọn để sửa
  const [loading, setLoading] = useState(true);

  const loadMedicines = async () => {
    try {
      const data = await mongoService.list();
      console.log("Medicines:", data); // ⚡ kiểm tra dữ liệu API trả về
      setMedicines(data);
    } catch (err) {
      console.error("Lỗi load dữ liệu:", err);
      Alert.alert("Lỗi", "Không tải được danh sách thuốc");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  const updateMedicine = async () => {
    try {
      await mongoService.update(selected._id, selected);
      Alert.alert("Thành công", "Cập nhật thuốc thành công");
      setSelected(null);
      loadMedicines();
    } catch (err) {
      console.error(err);
      Alert.alert("Lỗi", "Không thể cập nhật");
    }
  };

  const deleteMedicine = async (id) => {
    try {
      await mongoService.remove(id);
      Alert.alert("Thành công", "Đã xoá thuốc");
      setSelected(null);
      loadMedicines();
    } catch (err) {
      console.error(err);
      Alert.alert("Lỗi", "Không thể xoá");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selected ? (
        // ---------------- Form Edit ----------------
        <View>
          <Text style={styles.title}>Chỉnh sửa thuốc</Text>

          <Text style={styles.label}>Tên thuốc</Text>
          <TextInput
            value={selected.name}
            onChangeText={(t) => setSelected({ ...selected, name: t })}
            style={styles.input}
          />

          <Text style={styles.label}>Giá</Text>
          <TextInput
            value={String(selected.price)}
            onChangeText={(t) => setSelected({ ...selected, price: Number(t) })}
            style={styles.input}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Ảnh</Text>
          <TextInput
            value={selected.image}
            onChangeText={(t) => setSelected({ ...selected, image: t })}
            style={styles.input}
          />

          <Text style={styles.label}>Số sao</Text>
          <TextInput
            value={String(selected.star)}
            onChangeText={(t) => setSelected({ ...selected, star: Number(t) })}
            style={styles.input}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Mô tả</Text>
          <TextInput
            value={selected.description}
            onChangeText={(t) => setSelected({ ...selected, description: t })}
            style={[styles.input, { height: 80 }]}
            multiline
          />

          <View style={styles.buttonRow}>
            <Button title="Cập nhật" onPress={updateMedicine} />
            <Button
              title="Xoá"
              color="red"
              onPress={() => deleteMedicine(selected._id)}
            />
          </View>

          <Button
            title="Quay lại danh sách"
            onPress={() => setSelected(null)}
          />
        </View>
      ) : medicines.length === 0 ? (
        <Text>Không có dữ liệu thuốc</Text>
      ) : (
        // ---------------- Danh sách thuốc ----------------
        <FlatList
          data={medicines}
          keyExtractor={(item) => item._id || item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => setSelected(item)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>💲 {item.price}</Text>
              <Text style={styles.star}>⭐ {item.star}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: "#f5f5f5",
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
  },
  image: { width: "100%", height: 120, borderRadius: 8 },
  name: { fontSize: 16, fontWeight: "bold", marginTop: 8 },
  price: { color: "#1a73e8" },
  star: { color: "#f1c40f" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  label: { marginTop: 10, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginTop: 5,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default Screen_3;
