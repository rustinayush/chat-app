const express = require("express");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// socket

const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("connected...");

  //recieving message from client
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});