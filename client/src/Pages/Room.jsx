import React, { useState, useRef } from 'react'
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Canvas from '../Components/Whiteboard/Canvas';


const Room = () => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const[elements,setElements]=useState([]);
    const styles = {
        canvasBox: {
            height: '550px',
            width: '1500px'
        },
    };

    return (
        <div className="row">
            <h4 className='text-primary mt-3'>Users Online: 0</h4>
            <div className="col-md-10 mx-auto gap-3 px-5 mb-5 d-flex align-items-center justify-content-center">
                <div className="d-flex col-md-4 justify-content-center gap-5">
                    <div className="d-flex gap-1">
                        <input className='mt-1' checked={tool === "pencil"} type="radio" name="tool" id="pencil" value="pencil" onChange={(e) => setTool(e.target.value)} />
                        <label for="pencil">Pencil</label>
                    </div>
                    <div className="d-flex gap-1">
                        <input className='mt-1' checked={tool === "line"} type="radio" name="tool" id="line" value="line" onChange={(e) => setTool(e.target.value)} />
                        <label for="line">Line</label>
                    </div>
                    <div className="d-flex gap-1">
                        <input className='mt-1' checked={tool === "rect"} type="radio" name="tool" id="rect" value="rect" onChange={(e) => setTool(e.target.value)} />
                        <label for="rect">Rectangle</label>
                    </div>
                </div>
                <div className="col-md-2 mx-auto">
                    <div className="d-flex align-items-center">
                        <label for="color">Color: </label>
                        <input type="color" id="color" value={color} className='mt-1 ms-2' onChange={(e) => setColor(e.target.value)} />
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center gap-2">
                    <button className='btn btn-primary'> <UndoIcon /> Undo</button>
                    <button className='btn btn-outline-primary'>Redo <RedoIcon /></button>


                </div>
                <div className="col-md-2">
                    <button className='btn btn-danger'>Clear Canvas</button>
                </div>
            </div>
            <div className="col-md-10 mx-auto" style={styles.canvasBox}>
                <Canvas canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements} tool={tool}/>
            </div>
        </div>
    )
}

export default Room