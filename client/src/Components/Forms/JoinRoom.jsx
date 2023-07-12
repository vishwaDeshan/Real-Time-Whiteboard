import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinRoom({ uuid,socket, setUser }) {
  
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate=useNavigate();

  const handleRoomJoin = (e) => {
    e.preventDefault();

    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: false,
      presenter: false,
    };
    
    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined", roomData);
  };

  const styles = {
    name: {
      width: "100%",
    },
  };

  return (
    <form className="form w-100 col-md-12 mt-5">
      <div className="formGroup ">
        <input
          type="text"
          style={styles.name}
          className="my-2 rounded-2 p-1 border"
          placeholder="Enter your name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </div>
      <div className="form-group rounded-2">
        <input
          type="text"
          style={styles.name}
          className="my-2 rounded-2 p-1 border"
          placeholder="Enter room code"
          value={roomId}
          onChange={(e=>setRoomId(e.target.value))}
        />
      </div>
      <button
        type="submit"
        className="mt-4 btn btn-primary btn-block form-control"
        onClick={handleRoomJoin}
      >
        Join Room
      </button>
    </form>
  );
}

export default JoinRoom;
