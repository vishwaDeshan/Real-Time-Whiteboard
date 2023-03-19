const { Socket } = require("dgram");
const express=require("express");
const req=require("express/lib/request");
const app=express();

const server=require("http").createServer(app);
const {Server}=require("socket.io");

const io=new Server(server);

//routes
app.get("/",(req,res)=>{
    res.send("Real time whiteboard sharing app is working");
});

io.on("connection", (socket)=>{
    console.log("User connected");
})

const port=process.env.PORT || 5000;
server.listen(port,()=>console.log(`server is running port on http://localhost:${port}`));