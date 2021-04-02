import React, { useState } from 'react';
import questionMark from "./question_mark.png";

function CreateNFT(props) {

    const [tokenURI, setTokenURI] = useState();
    const [tokenID, setTokenID] = useState();


    let changeURI = (data) => {
        setTokenURI(data)
    }

    let changeID = (data) => {
        setTokenID(data);
    }

  return (
    <div>
      <div className="nes-container is-centered create-nft-container"> 
        <div className="create-nft-box"> 
          <div className="nes-container with-title is-centered create-nft-image">
            <img width="200px" src={questionMark} /> 
          </div>

          <div className="my-nft-container-left">
            <h1> ??? </h1>

            <div> Mint Unique NFT’s , upgrade them, battle and earn rewards. </div>

            <div> Buy the NFT to find what to get! </div>

            <div> Price : 0.1 ETH </div>

            <button className="nes-btn is-success" onClick={props.mintNFT}> Buy </button> 

            <div>
            <form onSubmit={(event) => props.setTokenURI(event, tokenID, tokenURI)}> 
              <input type="input" onChange={(data) => changeID(data.target.value)}/> 
              <input type="input" onChange={(data) => changeURI(data.target.value)}/> 
              <button type="submit"> Set TokenURI </button> 
            </form>
            </div>

          </div>

        </div>

        <div className="create-nft-attributes"> 
            <div> 
              <img width="35px" src={questionMark} /> 
              <div>  Attribute 1 </div> 
            </div>

            <div> 
              <img width="35px" src={questionMark} /> 
              <div>  Attribute 2 </div> 
            </div>


            <div> 
              <img width="35px" src={questionMark} /> 
              <div>  Attribute 3 </div> 
            </div>
        </div>

      </div>
    </div>
  );
}

export default CreateNFT;