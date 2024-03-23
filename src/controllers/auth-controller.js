const createError = require("../utils/createError");
const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


exports.register = async (req, res, next) => {
  try {
    const { email, password, confirmPassword, username, phone, gender } =
      req.body;

    if (!(username && password && confirmPassword && email && phone && gender)) {
      return createError(400, "Please fill in all fields");
    }

    if (confirmPassword !== password) {
      return createError(400, "Passwords do not match");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return createError(400, "Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      username,
      password: hashedPassword,
      email,
      phone,
      gender,
    };

    const newUser = await prisma.user.create({ data }); 
    // ตรวจสอบการป้อนข้อมูลที่ถูกต้อง
    if (!(username && password && username.trim() && password.trim())) {
      throw createError(400, 'Username or password must not be blank');
    }
    
    // ค้นหาข้อมูลผู้ใช้ในฐานข้อมูลโดยใช้ Prisma ORM
    const user = await prisma.user.findFirstOrThrow({ where: { username } });
    
    // ตรวจสอบรหัสผ่าน
    const pwOk = await bcrypt.compare(password, user.password);
    if (!pwOk) {
      throw createError(400, 'Invalid login');
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
    console.log(newUser,token);
    res.json({ message: "Registration successful", user: newUser ,token});
  } catch (err) {
    next(err);
  }
};


exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // ตรวจสอบการป้อนข้อมูลที่ถูกต้อง
    if (!(username && password && username.trim() && password.trim())) {
      throw createError(400, 'Username or password must not be blank');
    }
    
    // ค้นหาข้อมูลผู้ใช้ในฐานข้อมูลโดยใช้ Prisma ORM
    const user = await prisma.user.findFirstOrThrow({ where: { username } });
    
    // ตรวจสอบรหัสผ่าน
    const pwOk = await bcrypt.compare(password, user.password);
    if (!pwOk) {
      throw createError(400, 'Invalid login');
    }
    
    // ออก JWT token 
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
    console.log(token);
    res.json({ token });
  } catch(err) {
    next(err);
  }
};


exports.forgetPassword = (req, res, next) => {
  const { email } = req.body;
  // gen token -> สร้าง link -> ส่ง email
  res.json({ email });
};

// https://api.codecamp.com/auth/forget-password/kdjfkdjfkdjkfjd
exports.verifyForgetPassword = (req, res, next) => {
  const { token } = req.params;
  // logic check token
  // redirect reset password -> ติด token
  res.json({ token });
};

exports.resetPassword = (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  // check token
  // เปลี่ยน Password
  // เก็บ password ใหม่ ลง db
  res.json({ token, password });
};

exports.getme = (req,res,next) => {
  res.json(req.user)
}

