import React, { Component } from 'react';

import './App.css'

// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Web3
import Web3 from 'web3'

// Contract Info
import {CONTRACT_ABI, CONTRACT_ADDRESS} from './contractConfig.js';

// React components
import Home from './Home';
import CreateNFT from './CreateNFT';
import MyNFTs from './MyNFTs'

class App extends Component {

  state = {
    address : "",
    loggedIn : false,
    charactersOwnedByAddress : []
  }


  // Function called when clicked on "Connect". 
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

  // Once a Web3 wallet is detected in the browser, getAcc
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

    // const characters = await tokenContract.methods.characters("0").call();


    // console.log(characters);

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

  setTokenURI = async (event, tokenURI) => {
    event.preventDefault();

    let tokenContract = this.state.tokenContract;

    console.log(tokenURI);

    // const setTokenURI = await tokenContract.methods.setTokenURI("0", this.tokenURI.value).send({ from: this.state.address, to:CONTRACT_ADDRESS })
    // .once('receipt', (receipt) => {
    //   console.log(receipt);
    // })
  }

  getMyNFTs = async () => {

    let tokenContract = this.state.tokenContract;
    let account = this.state.address;

    const retrieveTokens = await tokenContract.methods.retrieveTokens(account).call();

    // console.log(retrieveTokens);

    retrieveTokens.forEach(element => this.getThem(element));
    }

    getThem = (element) => {
      fetch(element)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          charactersOwnedByAddress : [...prevState.charactersOwnedByAddress, data]
        }))
      });
      }


  render() {
    return (
      <Router> 
      <div className="App">
        
        <nav className="navbar"> 
          <Link to="/">Home</Link>
          {this.state.loggedIn ? 
          <div> 
          <Link to="/createNFT">Create NFT</Link> 
          <Link to="/myNFTs">My NFTs</Link> 
          </div>
          : ""}
          
          <div>  {this.state.address } </div>
          <div> {this.state.loggedIn ? "Connected" : "Not Connected"} </div>
          <div> Character count : {this.state.tokenCount} </div>
        </nav>

        <Switch> 
          <Route path="/" exact>
            <Home signInWithWallet={this.signInWithWallet}/>
          </Route>

          <Route path="/createnft">
            <CreateNFT mintNFT={this.mintNFT} setTokenURI={this.setTokenURI}/>
          </Route>
  
          <Route path="/mynfts"> 
              <MyNFTs getMyNFTs={this.getMyNFTs} characters={this.state.charactersOwnedByAddress}/>
          </Route>
        </Switch>
      </div>
      </Router>
    );

  }

}

export default App;
