import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateRoom({ uuid, setUser, socket }) {

  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(roomId)
      .then(() => {
        toast.success("Room code copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy room code to clipboard:", error);
      });
  };
  const handleCreateRoom = (e) => {

    e.preventDefault();

    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
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
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group border rounded-2">
        <div className="inputGroup d-flex align-items-center justify-content-center gap-1">
          <input
            type="text"
            style={styles.code}
            className="my-2 rounded-2 p-1 border-0"
            placeholder="Generate room code"
            value={roomId}
            disabled
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary btn-sm me-1"
              onClick={() => setRoomId(uuid())}
              type="button"
            >
              Generate
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              type="button"
              onClick={handleCopyToClipboard}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 btn btn-primary btn-block form-control"
        onClick={handleCreateRoom}
      >
        Create Room
      </button>
    </form>
  );
}

export default CreateRoom;
