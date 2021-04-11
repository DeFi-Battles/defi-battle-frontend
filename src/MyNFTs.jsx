import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Page from "./Page";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function MyNFTs(props) {

  let history = useHistory();

  // useEffect(() => {
  //   props.getMyNFTs()
  //   }, []);     
  
  const characters = props.characters;

  const listItems = characters.map((character, index) =>
    <div className="nes-container is-rounded my-nfts-list">

      <video width="320" height="240" className="nes-container is-rounded" autoPlay >
        <source src={character.image} type="video/mp4" />
      </video>
      <div key={character.name.toString()}>{character.name}</div> 
      <Link to={`/page/${index}`}> >>> </Link>
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