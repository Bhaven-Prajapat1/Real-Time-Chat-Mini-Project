const express = require('express')
const app = express()
const color = require('colors');
const path = require('path');
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3000;

app.set("view engine",'ejs');
app.use(express.static('public'));

http.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`.bgBlue);
})

app.get('/', (req,res)=>{
  res.render("index")
})

// socket io

io.on("connection",(socket)=>{
  console.log("User connected...".bgYellow);
  socket.on('message', (msg)=>{ // coming from frontend
    socket.broadcast.emit('message', msg) // passing to all the users
  })
})



