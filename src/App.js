import React, { Component } from 'react';

import axios from 'axios';

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
import {CONTRACT_ABI, CONTRACT_ADDRESS, AM} from './contractConfig.js';

// React components
import Home from './Home';
import CreateNFT from './CreateNFT';
import MyNFTs from './MyNFTs';
import Page from "./Page";


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
      console.log(CONTRACT_ADDRESS);
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
    .once('receipt', async (receipt) => {

      console.log(receipt);

      this.setState({
        requestId : receipt.events.RequestId.returnValues.requestId
      })

      this.findEvent(tokenContract);

    })
  }

  async findEvent (tokenContract) {


  const logs = await tokenContract.events.CharacterEvent({
    filter: {requestId : this.state.requestId}, // Using an array means OR: e.g. 20 or 23
    // fromBlock: 0
}, function(error, event){ 
  console.log(event);

  this.setState({
    characterEvent : event
  })

  this.callAPI(event.returnValues.dna, event.returnValues.requestId, event.returnValues.tokenId);

 }.bind(this))

  // setTimeout(() => {
  //   console.log(logs);

  // }, 10000)

  }

  callAPI = async (dna, requestId, tokenId) => {
    console.log(this.state.requestId);
    console.log(dna, requestId, tokenId);


    const resp = await axios.get(
      `https://defi-nft.eastus.cloudapp.azure.com/?dna=${dna}`
    )
    .then(
      data =>  {
        console.log(data.data.cid)
        this.setTokenURI(tokenId, data.data.cid);
      }
    )
    // console.log(resp.data);



  }

  // 36792816897365431580298662583798433218903088783883418869473290157741044165020 0x92afc8f86ecb23faf0ba075b0d51779f68fb17666e4534a95a47e72f29c5e286 62

  // 96991146342228008315758434462710337638045716942171628452365869320145371664596

  // 235677180112682612922228753751472530619048654078310860587450472893954680635717

  // 96991146342228008315758434462710337638045716942171628452365869320145371664596 0x50f9cd8b1e3d88032b092046e7c5ccca8238f244df3f3e51f0d616b61cd0acb2 60

  mintNFT = () => {
    this.create(this.state.web3, this.state.address, this.state.tokenContract);
  }

  setTokenURI = async (tokenID, tokenURI) => {
    // event.preventDefault();

    let tokenContract = this.state.tokenContract;

    // console.log(tokenContract);

    const setTokenURI = await tokenContract.methods.setTokenURI(tokenID, tokenURI).send({ from: this.state.address, to:CONTRACT_ADDRESS })
    .once('receipt', (receipt) => {
      console.log(receipt);
    })
  }

  getMyNFTs = async () => {

    let tokenContract = this.state.tokenContract;
    let account = this.state.address;

    const retrieveTokens = await tokenContract.methods.retrieveTokens(account).call();

    console.log(retrieveTokens);

    retrieveTokens.forEach(element => this.getThem(element));
    }

    getThem = (element) => {
      fetch(element)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          charactersOwnedByAddress : [...prevState.charactersOwnedByAddress, data]
        }))
      });
      }


  render() {
    return (
      <Router> 
      <div className="App">
        
        <nav className="navbar nes-container"> 
          <Link to="/"> <span className="nes-text is-primary">DeFi Battles</span></Link>
          {this.state.loggedIn ? 
          <React.Fragment> 
          <Link to="/createNFT">Create NFT</Link> 
          <Link to="/myNFTs">My NFTs</Link> 
          </ React.Fragment>
          : ""}
          
          <div> {this.state.loggedIn ? <div style={{color : "green", display:"flex"}}> <div style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100px"}}> {this.state.address } </div> Connected </div> : <div style={{color : "red"}}> Not Connected </div>} </div>
          {/* <div> Character count : {this.state.tokenCount} </div> */}
        </nav>
        {/* <button onClick={() => this.findEvent(this.state.tokenContract)}> Find </button>
        <button onClick={() => this.callAPI("fsfs", "fs", "d")}> Call </button> */}



        <Switch> 
        
          <Route path="/" exact>
            <Home signInWithWallet={this.signInWithWallet} loggedIn={this.state.loggedIn}/>
          </Route>

          <Route path="/createnft">
            <CreateNFT mintNFT={this.mintNFT} setTokenURI={this.setTokenURI}/>
          </Route>
  
          <Route path="/mynfts"> 
              <MyNFTs getMyNFTs={this.getMyNFTs} characters={this.state.charactersOwnedByAddress} tokenCount={this.state.tokenCount}/>
          </Route>

          <Route path="/page"> 
            <Page characters={this.state.charactersOwnedByAddress}/>
          </Route>
        </Switch>
      </div>
      </Router>
    );

  }

}

export default App;
