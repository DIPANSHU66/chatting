const express = require("express");
const cors = require("cors");
const cookieParesr = require("cookie-parser");

const path = require("path");

const _dirname = path.resolve();

const { app, server } = require("./socket/socket");


app.use(cookieParesr());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.URL, // Replace with the URL of the frontend application
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));

const connectdb = require("./config/database");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const userroute = require("./routes/userRoute");

const messageroute = require("./routes/messageRoute");

app.use("/api/v1", userroute);

app.use("/api/v1/message", messageroute);

connectdb();

app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`server listen at port:${PORT}`);
});
