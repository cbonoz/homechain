import React from "react";

import { Steps, Divider, Button } from "antd";

import { APP_DESC } from "../constants";
import logo from "../assets/logo.png";

const { Step } = Steps;

function Home({ login }) {
  return (
    <div>
      <div className="logo-section">
        <img src={logo} className="home-logo" />
        <p>{APP_DESC}</p>
      </div>
      <Steps progressDot current={2}>
        <Step
          title="Login with Metamask."
          // description="Connect your Ethereum-enabled wallet to use Uniramp."
        />
        <Step
          title="Find, share, and create NFT's around your owned real estate."
          // description="Uniramp helps you discover the most advantageous liquidity pools."
        />
        <Step
          title="Fundraise or create limited collectibles."
          // description="Uniramp has a suite of free information to onboard you to core Uniswap concepts."
        />
      </Steps>

      <div className="home-button-section">
        <Button type="primary" size="large" onClick={login}>
          Get started
        </Button>
      </div>
    </div>
  );
}

export default Home;
