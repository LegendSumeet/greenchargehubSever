const express = require("express");

const connectDB = require("./utils/db.js");
const adminRouter = require("./controller/admin");
const stationRouter = require("./controller/station");
const bookingRouter = require("./controller/booking");
const userRouter = require("./controller/user");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());



app.use("/superuser",adminRouter);
app.use("/createstation",stationRouter);
app.use("/createbooking",bookingRouter);
app.use("/createuser",userRouter);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});



connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });