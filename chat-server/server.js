var socket = require("socket.io");
var http = require("http");
var server = http.createServer();
var socket = socket.listen(server);

socket.on("connection", function(connection) {
  console.log("User Connected");

  connection.on("message", function(msg) {
    socket.emit("message", msg);
  });
});

server.listen(3000, function() {
  console.log("Server started");
});
