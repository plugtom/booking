require("dotenv").config();
const express = require("express")
const cors = require("cors");

const errorHandler = require("./middlewares/error");
const notFoundHandler = require("./middlewares/notFound");


const authRoute = require("./routes/auth-route");
const adminRoute = require("./routes/admin-router")
const authenticate = require("./middlewares/authenticate");
const admin = require("./middlewares/admin");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/showprodut",()=>{})
app.use("/admin",authenticate,admin, adminRoute)








app.use(errorHandler);
app.use("*", notFoundHandler);


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server run on port" + " " + port);
});