import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const Canvas = ({
  canvasRef,
  ctxRef,
  elements,
  setElements,
  tool,
  color,
  user,
}) => {
  const styles = {
    canvasArea: {
      cursor: "pointer",
    },
  };

  if (user?.view) {
    return (
      <div className="h-100 w-100 border border-4 border-seconday shadow-sm p-1 mb-5 bg-white rounded-2 overflow-hidden mt-5">
        <img
          src=""
          alt="Real time sharing whiteboard image"
          srcset=""
          className="w-100 h-100"
        />
      </div>
    );
  }

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  useLayoutEffect(() => {
      const roughCanvas = rough.canvas(canvasRef.current);
      if (elements.length > 0) {
        ctxRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
      elements.forEach((element) => {
        const { originalColor, type, offsetX, offsetY, width, height, path } =
          element;
        if (type === "rect") {
          roughCanvas.draw(
            roughGenerator.rectangle(offsetX, offsetY, width, height, {
              stroke: originalColor,
              strokeWidth: 4,
              roughness: 0,
            })
          );
        } else if (type === "pencil") {
          roughCanvas.linearPath(path, {
            stroke: originalColor,
            strokeWidth: 4,
            roughness: 0,
          });
        } else if (type === "line") {
          roughCanvas.draw(
            roughGenerator.line(offsetX, offsetY, width, height, {
              stroke: originalColor,
              strokeWidth: 4,
              roughness: 0,
            })
          );
        }
      });
    
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          originalColor: color,
        },
      ]);
    } else if (tool === "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          originalColor: color,
        },
      ]);
    } else if (tool === "rect") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          originalColor: color,
        },
      ]);
    }

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      if (tool === "pencil") {
        const { path } = elements[elements.length - 1];
        const newPath = [...path, [offsetX, offsetY]];
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                path: newPath,
              };
            } else {
              return ele;
            }
          })
        );
      } else if (tool === "line") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      } else if (tool === "rect") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div
      className="h-100 w-100 border border-4 border-seconday shadow-sm p-1 mb-5 bg-white rounded-2 overflow-hidden "
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} style={styles.canvasArea} />
    </div>
  );
};

export default Canvas;
