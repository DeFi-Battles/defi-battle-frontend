import React, { useState } from 'react';

function Home(props) {
  return (
    <div>
        <button onClick={props.signInWithWallet}> Connect </button> 
    </div>
  );
}

export default Home;