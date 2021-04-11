import React, { useState, useEffect } from 'react';



function Page (props) { 

    console.log(props.match.params.id);

    const id = props.match.params.id;

    return(
        <div> 
        <div className="nes-container is-centered create-nft-container"> 
        <div className="create-nft-box"> 
          <div className="nes-container with-title is-centered create-nft-image">

          <video width="200px" autoPlay>
            <source src={props.characters[id].image} type="video/mp4" />
          </video>

          </div>

          <div className="my-nft-container-left">
            <h1> {props.characters[id].name} </h1>

            <div> {props.characters[id].description} </div>

            <div> Price : 0.1 ETH </div>

            <button className="nes-btn is-success"> Battle </button> 

          </div>

        </div>

        <div className="create-nft-attributes"> 
        {
          props.characters[id].attributes.map((element) => {
            return(
              <div> 
              <div className="create-nft-attributes-traits"> {element.trait_type}</div>
              <div className="create-nft-attributes-value">  {element.value}</div> 
              </div>
            )
          })
        }

{/* 
            <div> 
            <div> {props.characters[id].attributes[1].trait_type}</div>
            <div>  {props.characters[id].attributes[1].value}</div> 
            </div>


            <div> 
            <div> {props.characters[id].attributes[2].trait_type}</div>
                <div>  {props.characters[id].attributes[3].value}</div> 
            </div> */}
        </div>
      </div>
        </div>
    )
}

export default Page;