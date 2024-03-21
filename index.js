const PORT = process.env.PORT || 4000;

const express = require("express");
const connectDatabase = require("./config/db");
const app = express();
app.use(express.json());
connectDatabase();
app.use("/api/users", require("./Routes/Users"));
app.use("/api/posts", require("./Routes/Posts"));
app.use("/api/profile", require("./Routes/Profile"));
app.use("/api/auth", require("./Routes/Auth"));
app.get("/", (request, response) => response.send("Thank You"));
app.listen(PORT, () => {
    console.log("start server");
});
