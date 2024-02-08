const createError = require("../utils/createError");
const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


exports.register = async (req, res, next) => {
  try {
    const { email, password , confirmPassword, username, phone, gender } =
      req.body;

    if (!(username && password && confirmPassword )) {
      return createError(400, "Fulfill all inputs"); 
    }
   
    if (confirmPassword !== password) 
      return createError(400, "confirm password not match");  
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const data = {
      username,
      password: hashedPassword,
      email,
      phone, 
      gender
    };

    const rs = await prisma.user.create({ data });
    console.log(rs);

    res.json({ message: "register success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const {username, password} = req.body
  try {
    // ตรวจสอบการป้อนข้อมูลที่ถูกต้อง
    if (!(username.trim() && password.trim())) {
      return createError(400,'username or password must not blank')
    }
    
    // ค้นหาข้อมูลผู้ใช้ในฐานข้อมูลโดยใช้ Prisma ORM
    const user = await prisma.user.findFirstOrThrow({ where : { username }})
    
    // ตรวจสอบรหัสผ่าน
    const pwOk = await bcrypt.compare(password, user.password)
    if (!pwOk) {
      return createError(400,'invalid login')
    }
    
    // ออก JWT token 
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn:  process.env.JWT_EXPIRES_IN
    })
    console.log(token)
    res.json({ token })
  } catch(err) {
    next(err)
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

