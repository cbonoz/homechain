<p align='center'>
    <img src="./img/logo.png"/>
</p>

## HomeChain

Represent ownership of your home by a NFT on filecoin.

<!--
Tap into the equity of your home using chainlink

Built for the Chainlink Fall 2021 devpost hackathon.
-->

<!--
Sponsors:
Chainlink
Moralis
Filecoin

Demo flow:
* Stat/web news about home/housing market
* Create form flow having person upload proof of ownership of home
* Create terms to allow others to deposit to it
* Use react signature canvas to collect the user signature (checking against the deed) and uploading as an image file to the IPFS folder for the property.
* Generate NFT after form completion
* API call from chainlink to get house price estimate.
* Login (powered by moralis).
* Search listings (backed by moralis).


-->

<!--
Screenshots

Future work

### Useful links
* https://chainlink-fall-hackathon-2021.devpost.com/ --
* https://showcase.ethglobal.com/web3jam/prizes
-->

### Dev Notes

# 🏄‍♂️ Quick Start

Prerequisites: [Node](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork 🏗 scaffold-eth:

```bash
git clone https://github.com/austintgriffith/scaffold-eth.git
```

> install and start your 👷‍ Hardhat chain:

```bash
cd scaffold-eth
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd scaffold-eth
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd scaffold-eth
yarn deploy
```

🔏 Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

💼 Edit your deployment scripts in `packages/hardhat/deploy`

📱 Open http://localhost:3000 to see the app
