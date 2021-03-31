import React, { useState } from 'react';

function MyNFTs(props) {

    const characters = props.characters;
    const listItems = characters.map((character) =>
      <li key={character.name.toString()}>{character.name}</li>
    );

  return (
    <div>
        <ul>{listItems}</ul>
        <button onClick={props.getMyNFTs}> Get em!</button>
    </div>
  );
}

export default MyNFTs;