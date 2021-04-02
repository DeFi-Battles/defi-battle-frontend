import React, { useState, useEffect } from 'react';


function Page (props) { 

    console.log(props.characters[0])



    return(
        <div> 
        <div className="nes-container is-centered create-nft-container"> 
        <div className="create-nft-box"> 
          <div className="nes-container with-title is-centered create-nft-image">
            <video width="200px" src={props.characters[0].image}/> 
          </div>

          <div className="my-nft-container-left">
            <h1> {props.characters[0].name} </h1>

            <div> {props.characters[0].description} </div>

            <div> Price : 0.1 ETH </div>

            <button className="nes-btn is-success"> Battle </button> 

          </div>

        </div>

        <div className="create-nft-attributes"> 
            <div> 
                <div> {props.characters[0].attributes[0].trait_type}</div>
                <div>  {props.characters[0].attributes[0].value}</div> 
            </div>

            <div> 
            <div> {props.characters[0].attributes[1].trait_type}</div>
            <div>  {props.characters[0].attributes[1].value}</div> 
            </div>


            <div> 
            <div> {props.characters[0].attributes[2].trait_type}</div>
                <div>  {props.characters[0].attributes[3].value}</div> 
            </div>
        </div>
      </div>
        </div>
    )
}

export default Page;