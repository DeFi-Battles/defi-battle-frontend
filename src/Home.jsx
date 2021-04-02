import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Home(props) {
  console.log(props.loggedIn);
  return (
    <div>
      <div class="nes-container is-centered home-container">
        <p> Mint Unique NFT’s , upgrade them, battle and earn rewards. </p>
        <p> Connect your wallet to get started! </p>
        {props.loggedIn ? <Link to="/mynfts"> My NFTs </Link> :  <button class="nes-btn is-error" onClick={props.signInWithWallet}> Connect </button>}
        
      </div>

      <div class="nes-container home-container">
        <h3> Recently minted NFTs </h3>
      </div>


    </div>
  );
}

export default Home;