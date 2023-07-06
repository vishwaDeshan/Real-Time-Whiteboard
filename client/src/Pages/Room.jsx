import React, { useState, useRef } from "react";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import Canvas from "../Components/Whiteboard/Canvas";
import { Button, Modal } from "react-bootstrap";

const Room = ({ user, socket, users }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const styles = {
    canvasBox: {
      height: "550px",
      width: "1500px",
    },
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setElements([]);
  };

  const undo = () => {
    setHistory((prevHistory) => {
      return [...prevHistory, elements[elements.length - 1]];
    });
    setElements((prevElements) => {
      return prevElements.slice(0, prevElements.length - 1);
    });
  };

  const redo = () => {
    setElements((prevElements) => {
      return [...prevElements, history[history.length - 1]];
    });
    setHistory((prevHistory) => {
      return prevHistory.slice(0, prevHistory.length - 1);
    });
  };

  return (
    <div className="row">
      <div className="header" style={{ display: "flex", marginLeft: "0px" }}>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ marginTop: "15px", marginLeft: "5px", color: "#fff" }}
          onClick={handleButtonClick}
        >
          Users Online: {users.length}
        </button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> Users Online: {users.length}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {users.map((usr, index) => (
            <p key={index * 999}>
              {usr.name}
              {user && user.id === usr.userId && "(You)"}
            </p>
          ))}
        </Modal.Body>
      </Modal>
      {user?.presenter && (
        <div className="col-md-10 mx-auto gap-3 px-5 mb-5 d-flex align-items-center justify-content-center">
          <div className="d-flex col-md-4 justify-content-center gap-5">
            <div className="d-flex gap-1">
              <input
                className="mt-1"
                checked={tool === "pencil"}
                type="radio"
                name="tool"
                id="pencil"
                value="pencil"
                onChange={(e) => setTool(e.target.value)}
              />
              <label for="pencil">Pencil</label>
            </div>
            <div className="d-flex gap-1">
              <input
                className="mt-1"
                checked={tool === "line"}
                type="radio"
                name="tool"
                id="line"
                value="line"
                onChange={(e) => setTool(e.target.value)}
              />
              <label for="line">Line</label>
            </div>
            <div className="d-flex gap-1">
              <input
                className="mt-1"
                checked={tool === "rect"}
                type="radio"
                name="tool"
                id="rect"
                value="rect"
                onChange={(e) => setTool(e.target.value)}
              />
              <label for="rect">Rectangle</label>
            </div>
          </div>
          <div className="col-md-2 mx-auto">
            <div className="d-flex align-items-center">
              <label for="color">Color: </label>
              <input
                type="color"
                id="color"
                value={color}
                className="mt-1 ms-2"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3 d-flex justify-content-center gap-2">
            <button
              className="btn btn-primary"
              disabled={elements.length === 0}
              onClick={() => undo()}
            >
              <UndoIcon /> Undo
            </button>
            <button
              className="btn btn-outline-primary"
              disabled={history.length < 1}
              onClick={() => redo()}
            >
              Redo <RedoIcon />
            </button>
          </div>
          <div className="col-md-2">
            <button className="btn btn-danger" onClick={handleClearCanvas}>
              Clear Canvas
            </button>
          </div>
        </div>
      )}

      <div className="col-md-10 mx-auto" style={styles.canvasBox}>
        <Canvas
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          tool={tool}
          color={color}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default Room;
