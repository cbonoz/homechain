<p align='center'>
    <img src="./img/logo.png" width=400/>
</p>

## HomeChain

Represent ownership of your home by a NFT on filecoin.

<p><b>Note this app is a prototype and would need additional work to be production ready.</b></p>

### Requirements

HomeChain has the following environment requirements:

<pre>
NFT_PORT_KEY=XXX          # your nftport.xyz api key.
REACT_APP_STORAGE_KEY=XXX # your web3.storage api key.
</pre>

<!--
Tap into the equity of your home.
-->

<!--

https://www.forbes.com/sites/nataliakarayaneva/2021/04/08/nfts-work-for-digital-art-they-also-work-perfectly-for-real-estate/?sh=775f435e43f3

Sponsors:
Ceramic: Distributed mutable data storage for the marketplace metadata. Search support.
IPFS / Filecoin: Store associated files, signature, and proof of ownership (ex: deed/title).
NFTPort: NFT issuance for the issued real estate backed NFT (minting).
Unlock protocol: NFT purchase / paywall. Once an NFT is uploaded, unlock protocol regulates access (via payments).

---
Chainlink
Moralis
Filecoin

Demo flow:
* Stat/web news about home/housing market
* NFT platforms for real estate exist, but a problem is governance.
* Create form flow having person upload proof of ownership of home
* Create terms to allow others to deposit to it
* Use react signature canvas to collect the user signature (checking against the deed) and uploading as an image file to the IPFS folder for the property.
* Generate NFT after form completion
- The technology here could be leveraged for other esignature purpsoes as well (beyond real estate), where you want to esign a document and have the signature tied to the document in a filecoin directory.
- This actually serves that purpose but with a self-signed title document.
* API call from chainlink to get house price estimate.
* Login (powered by moralis).
* Search listings (backed by moralis).

Create a limited partnership (LP), issue a token on whatever blockchain you want. Make the bylaws of the LP state that ownership and voting rights for LP is dictated by ownership of said token. Transfer ownership of one or more pieces of real estate to the LP. Whether a single home or bundle. Now you have this LP which owns one or more assets, and you can transfer around ownership of the LP itself by just sending tokens around.

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
