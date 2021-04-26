import React, {useState, useEffect} from 'react';

// import contractData from './battleContract.json';

function App(props) {

    const [r, setR] = useState();
    const [socket, setSocket] = useState();

// useEffect(async () => {

// const kaboom = await axios.get("https://kaboomjs.com/lib/0.2.0/kaboom.js");

// console.log(kaboom.data);

//     // const socket = io("http://localhost:9018/");

//     // setSocket(socket);

//     // socket.on('chat', function(code) {
//     //     console.log(code);
//     //   });

//     scene("main", () => {

//         // add a text at position (100, 100)
//         add([
//             text("ohhimark", 32),
//             pos(100, 100),
//         ]);
    
//     });
 
// }, []);

    let data = () => {
        // console.log(socket);
        // socket.emit('chat', r);
        // console.log(kaboom.global());
    }


    return(
        <div> 
            {/* <form> <input type="text" id="tex" onChange={(i) => setR(i.target.value)}/> </form>
            <button onClick={data}>fsfs </button> */}

        </div>
    )
}

export default App;