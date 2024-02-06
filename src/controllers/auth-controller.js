const createError = require("../utils/createError");
const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs")
const userService = require("../services/user-service");



exports.register = async (req, res, next) => {
    try {
        const { email, password, username ,firstName,lastName } = req.body;

        if(typeof username !== "string" || firstName ){

        }
    
        if (!email || !password) {
          return createError(400, "Email and password are required");
        }
    
        if (typeof email !== "string" || typeof password !== "string") {
          return createError(400, "Email or password is invalid");
        }
    
        const isUserExist = await userService.getUserByEmail(email);
    
        if (isUserExist) {
          return createError(400, "User already exist");
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        await userService.createUser(email, hashedPassword);
    
        res.json({ message: "register success" });
      } catch (err) {
        next(err);
      }
}

exports.login = async (req, res, next) => {
    res.json({ message: "login success" })
}

