import React, { useState } from 'react';

function MyNFTs(props) {

    const characters = props.characters;
    const listItems = characters.map((character) =>
    <div>
      <div key={character.name.toString()}>{character.name}</div> 
      <div key={character.description.toString()}>{character.description}</div> 
      {
        character.attributes.map((attribute) => {
          return (<div>{attribute.trait_type} : {attribute.value}</div>)
          
        })
      }

      <video width="320" height="240" controls>
        <source src={character.image} type="video/mp4" />
      </video>

    </div> 
      
    );

  return (
    <div>
        <ul>{listItems}</ul>
        <button onClick={props.getMyNFTs}> Get em!</button>
    </div>
  );
}

export default MyNFTs;