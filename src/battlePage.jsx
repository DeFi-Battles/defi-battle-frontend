import React, {useState, useEffect} from 'react';
import { io } from "socket.io-client";

function App() {

    const socket = io("http://localhost:3000/");

    let data = () => {

        // console.log(socket);

        socket.emit('chat', "Fuck you");
    }


    let receive = () => {
        socket.on('chat', function(code) {
            console.log(code);
          });
    }

    return(
        <div> 
            <button onClick={data}>fsfs </button>
            <button onClick={receive}> Receive </button>

        </div>
    )
}

export default App;