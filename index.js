require("dotenv").config();

const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pipeline
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const time = new Date().toLocaleString("vi-VN");
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.static(path.join(__dirname, "public")));

const isValidAge = (age) => {
  const numberAge = Number(age);
  return Number.isInteger(numberAge) && numberAge > 0 && numberAge <= 120;
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateInfo = (req, res, next) => {
  const { name, age } = req.query;

  if (!name || !age) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập đầy đủ tên và tuổi."
    });
  }

  if (!isValidAge(age)) {
    return res.status(400).json({
      success: false,
      message: "Tuổi phải là số nguyên từ 1 đến 120."
    });
  }

  next();
};

const validateRegister = (req, res, next) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập đầy đủ tên, tuổi và email."
    });
  }

  if (!isValidAge(age)) {
    return res.status(400).json({
      success: false,
      message: "Tuổi phải là số nguyên từ 1 đến 120."
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Email không hợp lệ."
    });
  }

  next();
};

// Route 1: form kiểm tra thông tin gửi bằng GET
app.get("/api/info", validateInfo, (req, res) => {
  const { name, age } = req.query;

  res.json({
    success: true,
    message: "Lấy thông tin thành công.",
    data: {
      name: name.trim(),
      age: Number(age)
    }
  });
});

// Route 2: form đăng ký người dùng gửi bằng POST
app.post("/api/register", validateRegister, (req, res) => {
  const { name, age, email } = req.body;

  res.status(201).json({
    success: true,
    message: "Đăng ký người dùng thành công.",
    data: {
      name: name.trim(),
      age: Number(age),
      email: email.trim().toLowerCase()
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Không tìm thấy route."
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
