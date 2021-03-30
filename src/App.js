import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import Web3 from 'web3'

import {CONTRACT_ABI, CONTRACT_ADDRESS} from './contractConfig.js';

class App extends Component {

  state = {
    address : "",
    loggedIn : false
  }


  signInWithWallet = () => {
    const web3 = new Web3(window.ethereum); 

    window.ethereum.enable().then(() => {
      this.setState({loggedIn : true, web3})
      this.getAccountInfo(web3);
    })
    .catch(error => {
      console.log(error)
    })
  }

  getAccountInfo = (web3) => {

    let account;

    web3.eth.getAccounts()
    .then(data => {
      console.log(data[0]);
      this.setState({address : data[0]})

      account = data[0];
      // web3.eth.getBalance(data[0])
      // .then(data => {
      //   console.log(data)
      // })

      this.getTokenData(web3, account);

    })



   
    // console.log(CONTRACT_ADDRESS)

  }

  async getTokenData(web3, account) {
    const tokenContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    const tokenCount = await tokenContract.methods.balanceOf(account).call();
    const characters = await tokenContract.methods.characters("0").call();


    console.log(characters);

    this.setState({
      tokenContract,
      tokenCount
    })
  }

  async create(web3, account, tokenContract) {

    const mintNFT = await tokenContract.methods.requestRandomCharacter("123", "Shrey").send({ from: account, to:CONTRACT_ADDRESS })
    .once('receipt', (receipt) => {
      console.log(receipt);
    })

  }

  // Contract address
  // 0x0017cb3Da249AA3e4284D1981b029cF73d9eA56C

  mintNFT = () => {
    this.create(this.state.web3, this.state.address, this.state.tokenContract);
  }

  setTokenURI = async (event) => {
    event.preventDefault();

    let tokenContract = this.state.tokenContract;

    const setTokenURI = await tokenContract.methods.setTokenURI("0", this.tokenURI.value).send({ from: this.state.address, to:CONTRACT_ADDRESS })
    .once('receipt', (receipt) => {
      console.log(receipt);
    })

    
  }


  render() {
    return (
      <div className="App">
        <nav> 
          <div> Address : {this.state.address } </div>
          <div> Connected status : {this.state.loggedIn ? "Connected" : "Not Connected"} </div>
          <div> Characters owned by you : {this.state.tokenCount} </div>

        </nav>
        <button onClick={this.signInWithWallet}> Connect </button> 
        <button onClick={this.mintNFT}> Mint NFT</button> 

        <form onSubmit={(event) => this.setTokenURI(event)}> 
        <input type="input" ref={(input) => this.tokenURI = input}/> 
        <button type="submit"> Set TokenURI </button> 
        </form>

  
  
        <div></div>
      </div>
    );

  }

}

export default App;
