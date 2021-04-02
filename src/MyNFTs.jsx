import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Page from "./Page";



function MyNFTs(props) {

  let history = useHistory();

  useEffect(() => {
    props.getMyNFTs()
    }, []);     
  
  let redirect = () => {
    history.push("/page");
  }

  const characters = props.characters;

  const listItems = characters.map((character) =>
    <div className="nes-container is-rounded my-nfts-list" onClick={redirect}>
      <video width="320" height="240" className="nes-container is-rounded" autoPlay >
        <source src={character.image} type="video/mp4" />
      </video>
      <div key={character.name.toString()}>{character.name}</div> 
      {/* <div key={character.description.toString()}>{character.description}</div> 
      {
        character.attributes.map((attribute) => {
          return (<div>{attribute.trait_type} : {attribute.value}</div>)
          
        })
      } */}

    </div> 
  );

  return (
    <div>
      <div className="nes-container is-centered my-nfts-container"> 
      <div> Tokens Owned by you : {props.tokenCount} </div> 
      {listItems}
      </div>
       
        {/* <button onClick={props.getMyNFTs}> Get em!</button> */}
    </div>
  );
}

export default MyNFTs;