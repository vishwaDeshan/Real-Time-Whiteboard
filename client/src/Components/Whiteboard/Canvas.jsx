import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const Canvas = ({ canvasRef, ctxRef, elements, setElements }) => {

  const [isDrawing, setIsdrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
  }, []);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    elements.forEach(element => {
      roughCanvas.linearPath(element.path);
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    console.log(offsetX, offsetY);

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

    setIsdrawing(true);
  }


  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
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
      console.log(offsetX,offsetY)
    }
  }

  const handleMouseUp = (e) => {
    setIsdrawing(false);
  }

  return (

    <canvas
      ref={canvasRef}
      className="h-100 w-100 border border-4 border-seconday shadow-sm p-1 mb-5 bg-white rounded-2 "
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    ></canvas>
  );
};

export default Canvas;
