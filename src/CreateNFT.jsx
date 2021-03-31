import React, { useState } from 'react';

function CreateNFT(props) {

    const [tokenURI, setTokenURI] = useState();

    let change = (data) => {
        setTokenURI(data)
    }

  return (
    <div>
        <button onClick={props.mintNFT}> Mint NFT</button> 
        <form onSubmit={(event) => props.setTokenURI(event, tokenURI)}> 
        <input type="input" onChange={(data) => change(data.target.value)}/> 
        <button type="submit"> Set TokenURI </button> 
        </form>
    </div>
  );
}

export default CreateNFT;