import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const Canvas = ({ canvasRef, ctxRef, elements, setElements, tool }) => {

  const styles = {
    canvasArea: {
      cursor: `pointer`,
    },
};

  const [isDrawing, setIsdrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
  }, []);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    if (elements.length > 0) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
    elements.forEach(element => {
      if (element.type === "rect") {
        roughCanvas.draw(
          roughGenerator.rectangle(element.offsetX, element.offsetY, element.width, element.height)
        )
      }
      else if (element.type === "pencil") {
        roughCanvas.linearPath(element.path);
      } else if (element.type === "line") {
        roughCanvas.draw(
          roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height));
      }
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    console.log(offsetX, offsetY);

    if (tool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          storke: "black",
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
          storke: "black"
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
          storke: "black"
        },
      ]);
    }


    setIsdrawing(true);
  }


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
                ...ele, path: newPath
              }
            } else {
              return ele;
            }
          })
        )
      } else if (tool === "line") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY
              }
            } else {
              return ele;
            }
          })
        )
      }
      else if (tool === "rect") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX-ele.offsetX,
                height: offsetY-ele.offsetY
              }
            } else {
              return ele;
            }
          })
        )
      }
      console.log(offsetX, offsetY)
    }
  }

  const handleMouseUp = (e) => {
    setIsdrawing(false);
  }

  return (

    <div
      className="h-100 w-100 border border-4 border-seconday shadow-sm p-1 mb-5 bg-white rounded-2 overflow-hidden "
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} style={styles.canvasArea}/>
    </div>

  );
};

export default Canvas;
