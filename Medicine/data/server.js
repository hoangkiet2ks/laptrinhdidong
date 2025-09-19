const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ⚡ Kết nối đúng database Medicine
mongoose.connect("mongodb://127.0.0.1:27017/Medicine", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const medicineSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  star: Number,
  description: String,
});

const Medicine = mongoose.model("medicine", medicineSchema);

// Lấy tất cả thuốc
app.get("/medicine", async (req, res) => {
  const list = await Medicine.find();
  res.json(list);
});

// Lấy thuốc theo id
app.get("/medicine/:id", async (req, res) => {
  const med = await Medicine.findById(req.params.id);
  res.json(med);
});

// Tạo mới
app.post("/medicine", async (req, res) => {
  const med = new Medicine(req.body);
  await med.save();
  res.json(med);
});

// Cập nhật
app.put("/medicine/:id", async (req, res) => {
  const med = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(med);
});

// Xoá
app.delete("/medicine/:id", async (req, res) => {
  await Medicine.findByIdAndDelete(req.params.id);
  res.json({ message: "Đã xoá thành công" });
});

app.listen(4000, () => console.log("Server chạy tại http://localhost:4000"));
