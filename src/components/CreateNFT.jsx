import React, { useState } from 'react';
import questionMark from "../assets/question_mark.png";

function CreateNFT(props) {

    const [tokenURI, setTokenURI] = useState();
    const [tokenID, setTokenID] = useState();
    const sentences = ["Lorem ipsum dolor sit amet.", "We're making your NFT pretty", "We're adding DNA to your NFT", "Your NFT is almost ready", "Buy Bitcoin","Buy ETH"]
    const [progressValue, setProgressValue] = useState()
    const [arrayValue, setArrayValue] = useState(0)

    let changeURI = (data) => {
        setTokenURI(data)
    }

    let changeID = (data) => {
        setTokenID(data);
    }

    let progress = () => {

      let i = 0;
      let j = 0;

      setInterval(()=> {
        setProgressValue(i);
        i = i + 1;
        console.log(progressValue, i);
      }, 1200)

      setInterval(()=> {
        if(j < sentences.length) {
          setArrayValue(j);
          j++;
        }
        else {
          j = 0;
        }

      },10000)

      
      // console.log(progressValue);
      // setTimeout(() => {
      //   setProgressValue(progressValue + 10);
      // }, 20000);

      // setTimeout(() => {
      //   if(arrayValue < sentences.length ) {
      //     setArrayValue(arrayValue + 1);
      //   }
      //   else {
      //     setArrayValue(0);
      //   }
      //   console.log(arrayValue);

      // }, 5000)
    }

  return (
    <div>

      {
        props.state.creatingNFT ? 
        <div className="nes-container is-centered create-nft-container"> 
          <div> 
          <i class="nes-octocat animate"></i>
          </div>



          <div> {sentences[arrayValue]} </div>


          <div> 
            <progress class="nes-progress is-primary" value={progressValue} max="100"></progress>
          </div>
        </div> 
        
        : 

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

            <div onClick={progress}>            <button className="nes-btn is-success" onClick={props.mintNFT}> Buy </button> </div>


            <div>
              {/* Form for setting tokenURI */}
            {/* <form onSubmit={(event) => props.setTokenURI(event, tokenID, tokenURI)}> 
              <input type="input" onChange={(data) => changeID(data.target.value)}/> 
              <input type="input" onChange={(data) => changeURI(data.target.value)}/> 
              <button type="submit"> Set TokenURI </button> 
            </form> */}

           
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
      } 



    </div>
  );
}

export default CreateNFT;