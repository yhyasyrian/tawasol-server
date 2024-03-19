const PORT = process.env.PORT || 4000;

const express = require("express");
const connectDatabase = require("./config/db");
const app = express();

connectDatabase();
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/auth", require("./routes/users"));
app.get("/", (request, response) => response.send("Thank You"));
app.listen(PORT, () => {
    console.log("start server");
});
