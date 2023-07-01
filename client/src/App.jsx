import React, { useEffect, useState } from "react";
import "./App.css";
import Forms from "./Components/Forms/Forms";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import Room from "./Pages/Room";

const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if (data.success) {
        alert("UserJoined");
      } else {
        alert("UserJoined error");
      }
    });
  }, []);
  

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={<Forms uuid={uuid} socket={socket} setUser={setUser} />}
          />
          <Route path="/:roomId" exact element={<Room />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
