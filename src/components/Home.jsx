import React, { useState } from "react";
import { Link } from "react-router-dom";
import sampleMonsters from "./sampleMonsters";

function Home(props) {
  console.log(props.loggedIn);
  return (
    <div>
      <div class="nes-container is-centered home-container">
        <p> Mint Unique NFT’s , upgrade them, battle and earn rewards. </p>
        <p> Connect your wallet to get started! </p>
        {props.loggedIn ? (
          <Link to="/mynfts"> My NFTs </Link>
        ) : (
          <button
            type="button"
            class="nes-btn is-error"
            onClick={props.signInWithWallet}
          >
            {" "}
            Connect{" "}
          </button>
        )}
      </div>

      <div class="nes-container with-title home-container">
        <h3 className="title">Meet All Peaceful Monsters</h3>

        <div className="m-all-wrapper">
          {sampleMonsters.map((data) => {
            const attributes = data.attributes;
            const familia = attributes.find(
              (atr) => atr.trait_type === "familia"
            );
            return (
              <div className="nes-container is-rounded m-box">
                <video width="320" height="240" src={data.image}></video>
                <div className="m-details-wrapper">
                  <span className="nes-badge">
                    <span className="is-primary">{familia.value}</span>
                  </span>
                  {/* <span class="nes-badge is-icon">
              <span class="is-warning">
                <i class="nes-icon star is-small"></i>
              </span>
              <span class="is-primary">Grass Type</span>
            </span> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div class="nes-container with-title home-container">
        <h3 className="title">How are my Monster NFTs Created ?</h3>
        <p>
          The core of all the NFTs is the DNA, it's a 77 digits long string,
          this is generated from Chainlink VRF.
        </p>
        <p>The DNA is processed in the following order :</p>
        <div class="lists">
          <ul class="nes-list is-disc">
            <li>Monster Type : index 0 - 1</li>
            <li>Colors : 3 Colors : index 2 - 4</li>
            <li>Element : Total 5 types : index 5</li>
            <li>Ratity : Total 5 types : index 6</li>
            <li>Luck : 99 max : index : 7 - 8</li>
            <li>Element 2 and 3: index : 9 - 10</li>
            <li>Attacks 1 to 5 : index : 11 - 15</li>
            <li>HP potion : index : 16</li>
          </ul>
        </div>
      </div>
      <div class="nes-container with-title home-container">
        <h3 className="title">Ok So Who Made THIS ?</h3>
        <section className="coreteam">
          <h3 className="topic-title">
            <i className="nes-icon star" />
            Core Team Members
          </h3>{" "}
          <p>Here is core team members developing DeFi-Battles.</p>{" "}
          <div className="coreteam-members">
            <section className="nes-container is-dark member-card">
              <div className="avatar">
                <img
                  data-src="https://github.com/shreykeny.png?size=80"
                  alt="Core Member B.C.Rikko"
                  className
                  src="https://github.com/shreykeny.png?size=80"
                />
              </div>{" "}
              <div className="profile">
                <h4 className="name">Shrey Keny</h4> 
                <p>Building DeFi-Battles</p>{" "}
                <div>
                  <a
                    href="https://github.com/shreykeny"
                    target="_blank"
                    aria-label="github"
                    rel="noreferrer"
                  >
                    <i className="nes-icon github" />
                  </a>{" "}
                  <a
                    href="https://twitter.com/shreykeny"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="twitter"
                  >
                    <i className="nes-icon twitter" />
                  </a>
                </div>
              </div>
            </section>
            <section className="nes-container is-dark member-card">
              <div className="avatar">
                <img
                  data-src="https://github.com/Akshay090.png?size=80"
                  alt="Core Member Igor Guastalla"
                  className
                  src="https://github.com/Akshay090.png?size=80"
                />
              </div>{" "}
              <div className="profile">
                <h4 className="name">Akshay Ashok</h4>{" "}
                <p>Building DeFi-Battles</p>{" "}
                <div>
                  <a
                    href="https://github.com/Akshay090"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="github"
                  >
                    <i className="nes-icon github" />
                  </a>{" "}
                  <a
                    href="https://twitter.com/aks2899"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="twitter"
                  >
                    <i className="nes-icon twitter" />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>

      <div class="nes-container with-title home-container">
        <h3 className="title">How to Contribute ?</h3>
        <p>DeFi-Battles is Completely opensource, Check it out at GitHub.</p>
        <a
          href="https://github.com/DeFi-Battles"
          target="_blank"
          rel="noreferrer"
          aria-label="twitter"
        >
          <i class="nes-icon github is-large"></i>
        </a>
      </div>
    </div>
  );
}

export default Home;
